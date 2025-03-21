import { Component, effect, OnInit } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
