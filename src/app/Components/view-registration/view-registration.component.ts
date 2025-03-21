import { Component } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrl: './view-registration.component.scss'
})
export class ViewRegistrationComponent {
  data:any;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.getAllRegistrations();
  }

  getAllRegistrations(){
    // Call the service to get all registrations
    this.authService.getAllRegistrations().subscribe((data)=>{
      this.data = data;
    });
  }
}
