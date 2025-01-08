import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
    const invoice = this.invoiceService.firstOrDefault(
      (x) => x.accountId === this.account?.id && x.id === 'depositInvoice'
    );

    this.balanceOperations = invoice?.operations ?? [];

    this.balanceOperations = this.balanceOperations.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    console.log(this.balanceOperations);
  }

  public addToBalance(balance: string): void {
    if (!this.account) {
      return;
    }

    const value = parseFloat(balance);

    this.userService.updateBalance(this.account, value, 'Deposit');

    this.show = 'balance';
    this.refresh();
  }
}
