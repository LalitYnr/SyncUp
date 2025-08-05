import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = 'Dating App';
  protected users = signal<any>([]);

  ngOnInit(): void {
    this.getUsers().then(users => {
      this.users.set(users);
    }).catch(error => {
      console.error('Error fetching users:', error);
    });
  }

  async getUsers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5000/api/users'));
    } catch (error) {
      console.error('Error accessing users:', error);
     throw error;
    }
    
  }

  
  //constructor(private http: HttpClient) {  }
}
