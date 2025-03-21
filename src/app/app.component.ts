import { Component,effect } from '@angular/core';
import { AuthService } from './Shared/Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = this.authService.isAuthenticated();
  constructor(private authService: AuthService){
    effect(() => {
      console.log('User authentication changed:', this.isLoggedIn());
    });
  }
}
