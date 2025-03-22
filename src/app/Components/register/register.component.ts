import { Component, effect, OnInit } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLoggedIn = this.authService.isAuthenticated();
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
isSuccess = false;
  constructor(
    private authService: AuthService,
    private router: Router,
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
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  registerUser() {
    this.isSuccess = false;
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.error('Email and password are required');
      return;
    }
    this.loading = true;
    this.authService
      .createNewAccount(this.registerForm.value)
      .subscribe((response) => {
        console.log(response);
        this.loading = false;
        this.isSuccess = true;
        this.registerForm.reset();
      });
  }
}
