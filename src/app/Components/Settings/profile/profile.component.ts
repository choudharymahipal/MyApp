import { Component, effect, OnInit } from '@angular/core';
import { AuthService } from '../../../Shared/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
