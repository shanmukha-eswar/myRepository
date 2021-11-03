import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SuperUserComponent } from './super-user/super-user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'superuser', component: SuperUserComponent},
  { path:'user', component: UserHomeComponent},
  { path:'admin', component: AdminHomeComponent},
  { path:'userRegistration', component: UserRegistrationComponent},
  { path:'adminRegistration', component: AdminRegistrationComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
