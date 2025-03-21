import { Component, effect, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = this.authService.isAuthenticated();
  username:string='';

  constructor(private authService: AuthService,private router: Router) {
    effect(() => {
      console.log('User authentication changed:', this.isLoggedIn());
      this.username = this.authService.getCurrentUser().name;
    });
  }

  ngOnInit(): void {
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
