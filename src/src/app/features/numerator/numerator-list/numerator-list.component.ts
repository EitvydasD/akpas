import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TitleTextComponent } from '../../../core/components/title-text/title-text.component';
import { NUMERATORS } from '../../../core/data/numerators.data';
import { SUPPLIERS } from '../../../core/data/supplier.data';
import { FakeRepositoryService } from '../../../core/services/repository.service';
import { Numerator } from '../../../core/types/numerator.types';
import { Supplier } from '../../../core/types/supplier.types';
import { BaseFeature } from '../../base.feature';

@Component({
  selector: 'numerator-list',
  templateUrl: './numerator-list.component.html',
  standalone: true,
  imports: [DatePipe, TitleTextComponent],
})
export class NumeratorListComponent extends BaseFeature implements OnInit {
  private readonly numeratorService =
    new FakeRepositoryService<Numerator>().initialize('numerators', NUMERATORS);

  private readonly supplierService =
    new FakeRepositoryService<Supplier>().initialize('suppliers', SUPPLIERS);

  public show: 'list' | 'history' | 'create' | 'createNumerator' = 'list';

  public numerators: Numerator[] = this.numeratorService.getAll();
  public suppliers: Supplier[] = this.supplierService.getAll();

  public selectedMonth = new Date();
  public selectedNumerator?: Numerator;

  public selectedType: 'Rankinis' | 'Automatinis' = 'Rankinis';
  public selectedSupplier: Supplier = this.suppliers[0];

  public ngOnInit(): void {
    console.log(this.numeratorService.getAll());
    this.suppliers = this.supplierService.getAll();

    this.refreshNumerators();
  }

  private refreshNumerators(): void {
    this.numerators.forEach((numerator) => {
      numerator.values.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
  }

  public showHistory(numerator: Numerator): void {
    this.selectedNumerator = numerator;
    this.show = 'history';
  }

  public updateOrInsert(numerator: Numerator): void {
    if (numerator.type === 'Automatinis') {
      numerator.values[0].date = new Date();
      this.numeratorService.update(numerator.id, numerator);
    } else if (numerator.type === 'Rankinis') {
      this.selectedNumerator = numerator;

      this.show = 'create';
    }
  }

  public removeNumerator(numerator: Numerator): void {
    this.numeratorService.delete(numerator.id);
    this.numerators.splice(this.numerators.indexOf(numerator), 1);
  }

  public updateSelectedMonth(increase: number): void {
    const date = new Date(this.selectedMonth);
    date.setMonth(date.getMonth() + increase);
    if (date.getTime() > new Date().getTime()) {
      return;
    }
    this.selectedMonth = date;
  }

  public saveNumeratorValue(value: string): void {
    if (!this.selectedNumerator) {
      return;
    }

    const numberValue = parseFloat(value);

    const usedValue = this.selectedNumerator.values.reduce(
      (acc, val) => acc + val.value,
      0
    );

    this.selectedNumerator.values.push({
      id: `${this.selectedNumerator.id}-${
        this.selectedNumerator.values.length + 1
      }`,
      date: new Date(),
      forDate: this.selectedMonth,
      usedValue,
      value: numberValue,
      origin: 'Manual',
    });

    this.numeratorService.update(
      this.selectedNumerator.id,
      this.selectedNumerator
    );

    this.numerators
      .find((x) => x.id === this.selectedNumerator?.id)
      ?.values.push({
        id: `${this.selectedNumerator.id}-${
          this.selectedNumerator.values.length + 1
        }`,
        date: new Date(),
        forDate: this.selectedMonth,
        value: numberValue,
        origin: 'Manual',
      });

    this.refreshNumerators();

    this.show = 'list';
  }

  public addNumerator(numeratorId: string, value: string): void {
    const existing = this.numerators.find((x) => x.id === numeratorId);
    if (existing) {
      return;
    }

    const numerator: Numerator = {
      id: numeratorId,
      type: this.selectedType,
      values: [],
      supplier: this.selectedSupplier,
    };

    numerator.values.push({
      id: `${numerator.id}-${numerator.values.length + 1}`,
      date: new Date(),
      forDate: this.selectedMonth,
      usedValue: 0,
      value: parseFloat(value),
      origin: 'Automatinis',
    });

    this.numeratorService.create(numerator);
    this.numerators.push(numerator);

    this.refreshNumerators();
    this.show = 'list';
  }
}
