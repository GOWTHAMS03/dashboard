import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';
import { AdminComponent } from './auth/admin/admin.component';
import { AuthGuard } from './auth/_auth/auth.guard';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'register',
    component:SignupComponent
  },
  {
    path:'signin',
    component:SigninComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'forAdmin',
    component: AdminComponent,
    canActivate: [AuthGuard], // Use the AuthGuard to protect the route
    data: { roles: ['admin'] }, // Specify the required roles for this route
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
