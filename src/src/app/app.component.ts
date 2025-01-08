import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './core/services/user.service';
import { BaseFeature } from './features/base.feature';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent extends BaseFeature implements OnInit {
  private readonly userService = inject(UserService);

  public get isAuthenticated() {
    return this.userService.isAuthenticated;
  }

  public ngOnInit(): void {
    if (!this.userService.tryLoad()) {
      this.navigateToAuth();
    } else {
      this.navigateToProfile();
    }
  }

  public logout(): void {
    this.userService.logout();
    this.navigateToAuth();
  }
}
