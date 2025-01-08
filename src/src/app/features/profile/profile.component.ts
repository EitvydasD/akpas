import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CARD_DEFAULT } from '../../core/data/card.data';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/types/user.types';
import { BaseFeature } from '../base.feature';

@Component({
  standalone: true,
  selector: 'profile',
  templateUrl: './profile.component.html',
  imports: [DatePipe],
})
export class ProfileComponent extends BaseFeature implements OnInit {
  private readonly userService = inject(UserService);

  public account?: User;

  public ngOnInit(): void {
    this.userService.current.subscribe({
      next: (account) => {
        this.account = account;
      },
    });
  }

  public saveSettings(): void {
    if (!this.account) {
      return;
    }

    this.userService.saveSettings(this.account.settings);
  }

  public addCard(): void {
    this.account!.card = CARD_DEFAULT;
    this.userService.update(this.account!);
  }

  public removeCard(): void {
    this.account!.card = undefined;
    this.userService.update(this.account!);
  }

  public logout(): void {
    this.userService.logout();
    this.navigateToAuth();
  }
}
