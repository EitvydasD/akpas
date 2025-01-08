import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.routes').then((r) => r.AUTH_ROUTES),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.routes').then(
            (r) => r.PROFILE_ROUTES
          ),
      },
      {
        path: 'numerators',
        loadChildren: () =>
          import('./features/numerator/numerator.routes').then(
            (r) => r.NUMERATOR_ROUTES
          ),
      },
      {
        path: 'invoices',
        loadChildren: () =>
          import('./features/invoices/invoices.routes').then(
            (r) => r.INVOICE_ROUTES
          ),
      },
      {
        path: 'balance',
        loadChildren: () =>
          import('./features/balance/balance.routes').then(
            (r) => r.BALANCE_ROUTES
          ),
      },
      {
        path: 'suppliers',
        loadChildren: () =>
          import('./features/supplier/supplier.routes').then(
            (r) => r.SUPPLIER_ROUTES
          ),
      },
      { path: '**', redirectTo: '/profile' },
    ],
  },
];
