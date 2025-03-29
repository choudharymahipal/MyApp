import { Component } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';
import { Modal } from 'bootstrap';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrl: './view-registration.component.scss',
})
export class ViewRegistrationComponent {
  data: any;
  selectedDataIndex: number = -1;

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
    console.log('Selected data:', this.selectedDataIndex);
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

  generatePDF(item: any) {
    const doc = new jsPDF('p', 'mm', 'a4');

    doc.addFileToVFS(
      'TiroDevanagariHindi-Regular.ttf',
      './assets/font/TiroDevanagariHindi-Regular.ttf'
    );
    doc.addFont(
      './assets/font/TiroDevanagariHindi-Regular.ttf',
      'Tiro Devanagari Hindi',
      'normal'
    );
    doc.setFont('Tiro Devanagari Hindi', 'normal');

    // Add an image (e.g., logo)
    const imgData = './assets/img/logo.png'; // Path to your logo image
    doc.addImage(imgData, 'PNG', 10, 10, 30, 30); // (image, format, x, y, width, height)

    // Add title
    doc.setFontSize(20);
    doc.text('नगर पंचायत बडहलगंज (गोरखपुर) उत्तर प्रदेश', 105, 20, {
      align: 'center',
    });
    doc.setFontSize(16);
    doc.text('द्वारा संचालित मुक्तिपथ अंत्येष्टि स्थल', 105, 30, {
      align: 'center',
    });
    doc.setFontSize(16);
    doc.text('दाह संस्कार प्रमाण पत्र', 105, 40, { align: 'center' });

    // Add date and certificate number
    doc.setFontSize(12);
    doc.setTextColor('red');
    doc.text(`क्रमांक: ${item.id}`, 10, 50);
    doc.text(`दिनांक: ${new Date().toLocaleDateString('hi-IN')}`, 150, 50);

    // draw a line (Yellow)
    doc.setDrawColor(255, 165, 0);
    doc.setLineWidth(1);
    doc.line(10, 55, 200, 55);

    // Add main content
    doc.setTextColor('black');
    doc.setFontSize(15);
    doc.text(
      `प्रमाणित किया जाता है कि, श्री / श्रीमती / कुमारी: ${item.deceased_name}`,
      10,
      75
    );
    doc.text(`पति / पत्नी: ${item.father_or_spouse_name}`, 10, 85);
    doc.text(`उम्र: ${item.age}`, 120, 85);
    doc.text(`पता: ${item.current_residence}`, 10, 95);
    doc.text(`मृत्यु की तिथि: ${this.formateDate(item.death_date)}`, 120, 95);
    doc.text(`का शवदाह दिनांक: ${this.formateDate(item.cremation_date_time)}`, 10, 105);
    doc.text('को मुक्तिपथ पर श्री ______________', 120, 105);
    doc.text('के द्वारा किया गया ।', 10, 115);

    // Add another image
    const anotherImg = './assets/img/shiva.png'; // Path to your image
    doc.addImage(anotherImg, 'PNG', 10, 130, 60, 60); // (image, format, x, y, width, height)

    // Add footer
    doc.setFontSize(14);
    doc.text('हस्ताक्षर जारीकर्ता', 150, 160, {
      align: 'center',
    });
    doc.text('नगर पंचायत', 150, 170, {
      align: 'center',
    });
    doc.text('बड़हलगंज, गोरखपुर', 150, 180, {
      align: 'center',
    });

    // draw a line (black)
    doc.setDrawColor('black');
    doc.setLineWidth(0.5);
    doc.line(10, 200, 200, 200);

    // Save the PDF
    doc.save('certificate_' + item.id + '.pdf');
  }

  deleteRegistration(item: any) {
    //alert('We will delete the registration with ID: ' + item.id);
    this.authService.deleteRegistration(item.id).subscribe((response) => {
      alert('Registration with ID: ' + item.id + ' has been deleted.');
      // Optionally, you can refresh the list of registrations after deletion
      this.getAllRegistrations(); // Refresh the list after deletion
    });
  }

  editData(item: any) {
    alert('We will edit the registration with ID: ' + item.id);
  }

  formateDate(newdate: string) {
    // Format the death_date
    const formattedDeathDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(newdate));
    return formattedDeathDate;
  }
}
