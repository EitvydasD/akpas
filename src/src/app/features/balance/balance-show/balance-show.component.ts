import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SUPPLIER_IGNITIS } from '../../../core/data/supplier.data';
import { FakeRepositoryService } from '../../../core/services/repository.service';
import { UserService } from '../../../core/services/user.service';
import { BalanceOperation, Invoice } from '../../../core/types/invoice.types';
import { User } from '../../../core/types/user.types';

@Component({
  selector: 'balance-show',
  templateUrl: './balance-show.component.html',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
})
export class BalanceShowComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly invoiceService =
    new FakeRepositoryService<Invoice>().initialize('invoices');
  public balanceOperations: BalanceOperation[] = [];

  public account?: User;

  public show: 'balance' | 'addToBalance' = 'balance';

  public ngOnInit(): void {
    this.userService.current.subscribe({
      next: (account) => {
        this.account = account;
        this.refresh();
      },
    });
  }

  private refresh(): void {
    this.balanceOperations = [];
    const invoices = this.invoiceService.where(
      (x) =>
        (x.accountId === this.account?.id && x.status === 'Sumokėta') ||
        x.status === 'Balansas'
    );

    invoices.forEach((x) => {
      this.balanceOperations.push(...x.operations);
    });

    this.balanceOperations = this.balanceOperations.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  public addToBalance(balance: string): void {
    if (!this.account) {
      return;
    }

    const value = parseFloat(balance);

    this.account.balance += value;

    this.userService.update(this.account);

    let invoice = this.invoiceService.getById('depositInvoice');
    if (!invoice) {
      invoice = {
        id: 'depositInvoice',
        status: 'Balansas',
        payDate: new Date(),
        generationDate: new Date(),
        supplier: SUPPLIER_IGNITIS, // Doesnt matter
        operations: [],
        accountId: this.account.id,
      };

      this.invoiceService.create(invoice);
    }

    invoice.operations.push({
      id: (invoice.operations.length + 1).toString(),
      operation: 'Deposit',
      amount: value,
      date: new Date(),
    });

    this.invoiceService.update(invoice.id, invoice);

    this.refresh();
    this.show = 'balance';
  }
}
