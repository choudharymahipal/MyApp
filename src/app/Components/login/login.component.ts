import { Component, effect, OnInit } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';
import { Router } from '@angular/router';
import { IloginRequest } from '../../Shared/Interfaces/ilogin';
import { ToasterService } from '../../Shared/Services/toaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = this.authService.isAuthenticated();
  loginForm!: FormGroup;
  loading = false;
  isInvalidCredentials= false;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToasterService,
    private fb: FormBuilder
  ) {
    // Check if user is already logged in
    effect(() => {
      // Redirect to dashboard if user is already logged in
      if (this.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.submitted = true;
    this.isInvalidCredentials = false;
    if (this.loginForm.invalid) {
      //this.toaster.error('Email and password are required', 'Login Failed');
      console.error('Email and password are required');
      return;
    }
    this.loading = true;
    // Prepare login credentials
    let credentials: IloginRequest = {
      email: this.f['email'].value,
      password: this.f['password'].value,
    };

    // Call login service
    this.authService
      .login(credentials)
      .pipe(first())
      .subscribe(
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
          this.loading = false;
          this.isInvalidCredentials = true;
          console.error('Login failed', error);
        }
      );
  }
}
