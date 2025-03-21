import { Component, effect } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
isLoggedIn = this.authService.isAuthenticated();

  constructor(private authService: AuthService,private router: Router) {
    effect(() => {
      console.log('User authentication changed:', this.isLoggedIn());
      if(!this.isLoggedIn()){
        this.router.navigate(['/']);
      }
    });
  }
}
