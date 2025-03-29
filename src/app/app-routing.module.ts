import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ErrorPageComponent } from './Shared/Components/error-page/error-page.component';
import { ProfileComponent } from './Components/Settings/profile/profile.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { ViewRegistrationComponent } from './Components/view-registration/view-registration.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "error", component: ErrorPageComponent },
  { path: "settings/profile", component: ProfileComponent },
  { path: "view/registration", component: ViewRegistrationComponent },
  { path: "death/registration", component: RegistrationComponent },
  { path: "death/registration/:id", component: RegistrationComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "**", redirectTo: "error", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
