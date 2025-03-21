import { Component, effect } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  isLoggedIn = this.authService.isAuthenticated();
  formGroup!: FormGroup;
  currentUserEmail: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    effect(() => {
      console.log('User authentication changed:', this.isLoggedIn());
      if (!this.isLoggedIn()) {
        this.router.navigate(['/']);
      }
    });

    this.formGroup = this.fb.group({
      death_date: [null, [Validators.required]],
      deceased_name: [null, [Validators.required, Validators.maxLength(255)]],
      father_or_spouse_name: [
        null,
        [Validators.required, Validators.maxLength(255)],
      ],
      gender: [null, [Validators.required]],
      age: [null, [Validators.required, Validators.min(0)]],
      place_of_death: [null, [Validators.required, Validators.maxLength(255)]],
      cause_of_death: [null],
      medical_facility_received: [null],
      death_during_treatment: [null, [Validators.required]],
      death_certified: [null, [Validators.required]],
      disease_name: [null, [Validators.maxLength(255)]],
      current_residence: [null, [Validators.maxLength(255)]],
      permanent_residence: [null, [Validators.maxLength(255)]],
      caste: [null, [Validators.maxLength(255)]],
      nationality: [null, [Validators.maxLength(255)]],
      occupation: [null, [Validators.maxLength(255)]],
      female_death_condition: [null],
      substance_type: [null, [Validators.maxLength(255)]],
      substance_usage_duration: [null, [Validators.maxLength(255)]],
      funeral_date_time: [null],
      cremation_date_time: [null],
      cremator_name: [null, [Validators.maxLength(255)]],
      cremator_relation: [null, [Validators.maxLength(255)]],
      informant_name: [null, [Validators.maxLength(255)]],
      informant_relation: [null, [Validators.maxLength(255)]],
      created_by: [null],
    });
  }

  ngOnInit(): void {
    let userData = this.authService.getCurrentUser();
    if(userData){
      this.currentUserEmail = userData.email;
    }
  }

  onSubmit() {
    this.formGroup.controls['created_by'].setValue(this.currentUserEmail);
    console.log(this.formGroup.value);
    if(this.formGroup.valid){
      this.authService.saveRegistration(this.formGroup.value).subscribe((data) => {
        console.log(data);
        alert('Data saved successfully');
      });
    }else{
      alert('Please fill all the required fields');
    }
  }
}
