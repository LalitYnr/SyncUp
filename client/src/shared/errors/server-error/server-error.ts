import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../../../types/error';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css'
})
export class ServerError {
  private router = inject(Router);
  // protected error = signal<ApiError | null>(null);
  protected error: ApiError | null = null;
  protected showDetails = false;

  deatilsToggle() {
    this.showDetails = !this.showDetails;
  }
  constructor() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.error = navigation.extras.state['error'];
    }
  }
}
