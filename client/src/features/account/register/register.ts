import { Component, inject, input, output } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  // usersFromHome = input.required<User[]>();
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  private accountService = inject(AccountService);

  register() {
    this.accountService.register(this.creds).subscribe({
      next: (user: User) => {
        console.log('Registration successful:', user);
        this.cancel();
  },
      error: (error) => {
        console.error('Registration failed:', error);
      }
    });
  }

  cancel() {
    console.log('Registration cancelled');
    this.cancelRegister.emit(false);
  }

}
