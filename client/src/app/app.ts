import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected readonly title = 'SyncUp App';
  protected users = signal<User[]>([]);

  async ngOnInit() {
    this.users.set(await this.getUsers());
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return; {
      const user = JSON.parse(userString);
      this.accountService.currentUser.set(user);
    }
  }

  async getUsers() {
    try {
      return lastValueFrom(this.http.get<User[]>('https://localhost:5000/api/users'));
    } catch (error) {
      console.error('Error accessing users:', error);
      throw error;
    }
  }
  // loadUsers() {alert('Load Users button clicked');}
  // register() {alert('Register button clicked');}
  // login() {alert('Login button clicked');}
  // authorize() {alert('Authorize button clicked');}
  // constructor(private http: HttpClient) {  }
}
