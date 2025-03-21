import { Component } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrl: './view-registration.component.scss',
})
export class ViewRegistrationComponent {
  data: any;
  selectedDataIndex: number=-1;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getAllRegistrations();
  }

  getAllRegistrations() {
    // Call the service to get all registrations
    this.authService.getAllRegistrations().subscribe((data) => {
      this.data = data;
    });
  }

  openModal(data: any) {
    // Open the modal
    this.selectedDataIndex = data.id;
    const modalElement = document.getElementById('modal-default');
    if (modalElement) {
      const myModal = new Modal(modalElement);
      myModal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  // Function to close the modal
  closeModal() {
    this.selectedDataIndex = -1;
  }

  bindDataTable() {}
}
