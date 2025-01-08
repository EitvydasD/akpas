import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ACCOUNT_SETTINGS, ACCOUNTS } from '../data/accounts.data';
import { LoginRequest, RegisterRequest } from '../types/auth.types';
import { User, UserSettings } from '../types/user.types';
import { FakeRepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userService = new FakeRepositoryService<User>().initialize(
    'accounts',
    ACCOUNTS
  );

  private readonly ACCOUNT_STORAGE = 'akpas-account';

  public current = new BehaviorSubject<User | undefined>(undefined);
  public isAuthenticated = false;

  public register(request: RegisterRequest): void {
    const account = this.userService.firstOrDefault(
      (x) => x.email === request.email
    );

    if (account) {
      return;
    }

    const user: User = {
      id: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      phone: '',
      email: request.email,
      birthDate: new Date('1990-11-12'),
      personalCode: request.personalCode,
      password: request.password,
      balance: 0,
      isActive: true,
      settings: ACCOUNT_SETTINGS,
    };

    this.userService.create(user);

    this.login(request);
  }

  public login(request: LoginRequest): void {
    const account = this.userService.firstOrDefault(
      (x) => x.email === request.email && x.password === request.password
    );

    if (account) {
      this.set(account);
    }
  }

  public logout(): void {
    localStorage.removeItem(this.ACCOUNT_STORAGE);
    this.current.next(undefined);
    this.isAuthenticated = false;
  }

  public saveSettings(settings: UserSettings): void {
    const account = this.current.value;
    if (!account) {
      return;
    }

    account.settings = settings;
    this.set(account);
    this.userService.update(account.id, account);
  }

  public getSettings(): UserSettings | undefined {
    const account = this.current.value;
    if (!account) {
      return;
    }

    const settings = account.settings;
    return settings;
  }

  public update(account: User): void {
    this.set(account);
    this.userService.update(account.id, account);
  }

  private set(account: User): void {
    localStorage.setItem(this.ACCOUNT_STORAGE, JSON.stringify(account));
    this.current.next(account);
    this.isAuthenticated = true;
  }

  public tryLoad(): User | undefined {
    const value = localStorage.getItem(this.ACCOUNT_STORAGE);
    if (!value) {
      return;
    }

    const account = JSON.parse(value) as User;
    this.current.next(account);
    this.isAuthenticated = true;

    return account;
  }
}
