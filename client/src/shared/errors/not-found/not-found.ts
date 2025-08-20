import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {
protected router = inject(Router);
private location = inject(Location);

  goBack() {
    this.location.back();
  }
  goHome() {
    this.router.navigateByUrl('/');
  }

}
