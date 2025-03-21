import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HeaderComponent } from './Shared/Components/header/header.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { SidebarComponent } from './Shared/Components/sidebar/sidebar.component';
import { ErrorPageComponent } from './Shared/Components/error-page/error-page.component';
import { ProfileComponent } from './Components/Settings/profile/profile.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './Shared/Services/auth.service';
import { CommonService } from './Shared/Services/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Toastr
import { ToastrModule } from 'ngx-toastr';
import { ToasterService } from './Shared/Services/toaster.service';
import { ViewRegistrationComponent } from './Components/view-registration/view-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ErrorPageComponent,
    ProfileComponent,
    RegistrationComponent,
    ViewRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Auto close after 3 seconds
      positionClass: 'toast-top-right', // Position
      preventDuplicates: true, // Prevent duplicate messages
      closeButton: true,
      progressBar: true
    }),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, CommonService,ToasterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
