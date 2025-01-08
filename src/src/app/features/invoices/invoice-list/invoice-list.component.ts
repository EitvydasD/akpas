import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TitleTextComponent } from '../../../core/components/title-text/title-text.component';
import { INVOICES } from '../../../core/data/invoice.data';
import { FakeRepositoryService } from '../../../core/services/repository.service';
import { UserService } from '../../../core/services/user.service';
import { Invoice } from '../../../core/types/invoice.types';
import { User } from '../../../core/types/user.types';

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  standalone: true,
  imports: [TitleTextComponent, DatePipe, DecimalPipe],
})
export class InvoiceListComponent implements OnInit {
  private readonly invoiceService =
    new FakeRepositoryService<Invoice>().initialize('invoices', INVOICES);

  private readonly userService = inject(UserService);

  public selectedInvoice?: Invoice;
  public show: 'paid' | 'unpaid' | 'invoice' = 'paid';

  public account?: User;

  public paidInvoices: Invoice[] = this.invoiceService
    .getAll()
    .filter((invoice) => invoice.status === 'Sumokėta');
  public unpaidInvoices: Invoice[] = this.invoiceService
    .getAll()
    .filter((invoice) => invoice.status === 'Nesumokėta')
    .filter((invoice) => this.getAmountLastMonth(invoice) > 0);

  public ngOnInit(): void {
    this.userService.current.subscribe((account) => {
      this.account = account;
    });
  }

  public getAmount(invoice: Invoice): number {
    return invoice.operations
      .map((operation) => operation.amount)
      .reduce((a, b) => a + b, 0);
  }

  public getAmountLastMonth(invoice?: Invoice): number {
    if (!invoice) {
      return 0;
    }
    return this.getAmount(invoice) / invoice?.supplier.rate;
  }

  public selectInvoice(invoice: Invoice): void {
    this.show = 'invoice';
    this.selectedInvoice = invoice;
  }

  public refresh(): void {
    this.paidInvoices = this.invoiceService
      .getAll()
      .filter((invoice) => invoice.status === 'Sumokėta');

    this.unpaidInvoices = this.invoiceService
      .getAll()
      .filter((invoice) => invoice.status === 'Nesumokėta')
      .filter((invoice) => this.getAmountLastMonth(invoice) > 0);
  }

  public payInvoice(invoice: Invoice): void {
    invoice.status = 'Sumokėta';
    this.invoiceService.update(invoice.id, invoice);
    this.refresh();
  }
}
