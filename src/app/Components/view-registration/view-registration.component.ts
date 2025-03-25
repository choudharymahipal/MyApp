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
    const doc = new jsPDF();

    doc.text('Certificate', 20, 20);
    
    // Colorful Table
    autoTable(doc, {
      head: [['Questions', 'Answers']],
      body: [
        ['मृत्यु की दिनांक', item.date_of_death],
        ['मृतक का नाम', item.deceased_name],
        ['मृतक के पिता या पति का नाम', item.father_or_spouse_name],
        ['मृतक का लिंग', item.gender],
        ['मृतक की आयु', item.age],
        ['मृत्यु का स्थान', item.place_of_death],
        ['मृत्यु का कारण', item.cause_of_death],
        ['क्या मृत्यु के पूर्व कोई चिकित्सकीय सुविधा प्राप्त हुई थी?', item.medical_facility_received],
        ['क्या चिकित्सा के दौरान मृत्यु हुई थी?', item.death_during_treatment],
        ['यदि हाँ तो क्या चिकित्सकीय द्वारा लिखित मृत्यु प्रमाणित किया गया था?', item.death_certified],
        ['बीमारी का नाम', item.disease_name],
        ['मृतक का वर्तमान निवास', item.current_residence],
        ['मृतक का पैतृक निवास', item.permanent_residence],
        ['जाति / उपजाति', item.caste],
        ['राष्ट्रीयता / धर्म', item.nationality],
        ['मृतक का व्यवसाय', item.occupation],
        ['महिला मृत्यु की स्थिति में (क्या मृत्यु गर्भ के दौरान / प्रसूति के दौरान / गर्भावस्था की समाप्ति के 6 सप्ताह के भीतर हुई थीं)', item.female_death_condition],
        ['क्या मृतक किसी प्रकार के नशीले पदार्थ का सेवन करता था यदि हाँ तो कौन सा?', item.substance_type],
        ['कब से नशीले पदार्थ का सेवन करता था ?', item.substance_usage_duration],
        ['शवदाह की तिथि व समय', item.cremation_date_time],
        ['शवदाह करने वाले का नाम', item.cremator_name],
        ['शवदाह करने वाले का मृतक से सम्बंध?', item.cremator_relation],
        ['सूचना देने वाले का नाम', item.informant_name],
        ['सूचना देने वाले का मृतक से सम्बंध ?', item.informant_relation],
      ].slice(1),
      startY: 50,
    });

    // Save the PDF
    doc.save('certificate_'+item.id+'.pdf');
    
  }

  deleteRegistration(item: any) {
    alert('We will delete the registration with ID: ' + item.id);
  }
}
