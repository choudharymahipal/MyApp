import { Component, effect, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
isLoggedIn = this.authService.isAuthenticated();

  constructor(private authService: AuthService,private router: Router) {
    effect(() => {
      console.log('User authentication changed:', this.isLoggedIn());
      if(!this.isLoggedIn()){
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
  }

}
