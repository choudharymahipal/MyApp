import { Component, effect, OnInit } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';
import { Router } from '@angular/router';
import { IloginRequest } from '../../Shared/Interfaces/ilogin';
import { ToasterService } from '../../Shared/Services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = this.authService.isAuthenticated();
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router,private toaster: ToasterService) {
    // Check if user is already logged in
    effect(() => {
      // Redirect to dashboard if user is already logged in
      if (this.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit(): void {}

  onLogin() {
    if (!this.email || !this.password) {
      //this.toaster.error('Email and password are required', 'Login Failed');
      console.error('Email and password are required');
      alert('Email and password are required');
      return;
    }
    // Prepare login credentials
    let credentials: IloginRequest = {
      email: this.email,
      password: this.password,
    };

    // Call login service
    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        //this.toaster.success('Login successful!', 'Welcome');
        // Save token in local storage
        this.authService.saveToken(response); 
        // Redirect to dashboard
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        alert(error.error.message);
      }
    );
  }

}
