import { BaseType } from '../types/base.types';

export class FakeRepositoryService<T extends BaseType> {
  private storageKey: string = 'akpas';

  public initialize(key: string, data: T[] = []): FakeRepositoryService<T> {
    this.storageKey = `akpas-${key}`;
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }

    if (data.length > 0) {
      this.initializeData(data);
    }

    return this;
  }

  private initializeData(data: T[]): void {
    const all = this.getData();
    data.forEach((item) => {
      if (!all.find((x) => x.id === item.id)) {
        all.push(item);
      }
    });

    this.saveData(all);
  }

  private getData(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveData(data: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  public getAll(): T[] {
    return this.getData();
  }

  public getById(id: string): T | undefined {
    return this.getData().find((item) => item.id === id);
  }

  public firstOrDefault(predicate: (item: T) => boolean): T | undefined {
    return this.getData().find(predicate);
  }

  public where(predicate: (item: T) => boolean): T[] {
    return this.getData().filter(predicate);
  }

  public create(item: T): T {
    const data = this.getData();
    data.push(item);
    this.saveData(data);
    return item;
  }

  public update(id: string, updatedItem: T): T | undefined {
    const data = this.getData();
    data.find((x) => x.id === id)
      ? (data[data.findIndex((x) => x.id === id)] = updatedItem)
      : null;

    this.saveData(data);
    return updatedItem;
  }

  public delete(id: string): boolean {
    const data = this.getData();
    const index = data.findIndex((x) => x.id === id);
    if (index > -1) {
      data.splice(index, 1);
      this.saveData(data);
      return true;
    }

    return false;
  }

  public clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}
