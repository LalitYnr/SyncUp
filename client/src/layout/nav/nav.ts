import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: any = {}
  private router = inject(Router);
  private toast = inject(ToastService); // Assuming ToastService is provided in the app module
  // protected isLoggedIn = signal(false);

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigateByUrl('/users'); // 
        this.toast.success('Login successful', 5000);
        // this.isLoggedIn.set(true);
        this.creds = {}; // Clear credentials after login
      },
      error: (error) => {
        this.toast.error('Login failed: ' + error.error, 5000);
      }
    });
  }

  logout() {
    // this.isLoggedIn.set(false);
    console.log('Logged out');
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
