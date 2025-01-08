import { Component } from '@angular/core';
import { FakeRepositoryService } from '../../../core/services/repository.service';
import { Supplier } from '../../../core/types/supplier.types';

@Component({
  selector: 'supplier-list',
  templateUrl: './supplier-list.component.html',
  standalone: true,
})
export class SupplierListComponent {
  private readonly supplierService =
    new FakeRepositoryService<Supplier>().initialize('suppliers');

  public enabledSuppliers = this.supplierService.where((x) => x.enabled);
  public disabledSuppliers = this.supplierService.where((x) => !x.enabled);

  public addSupplier(supplier: Supplier): void {
    supplier.enabled = true;
    this.supplierService.update(supplier.id, supplier);

    this.refresh();
  }

  private refresh(): void {
    this.enabledSuppliers = this.supplierService.where((x) => x.enabled);
    this.disabledSuppliers = this.supplierService.where((x) => !x.enabled);
  }
}
