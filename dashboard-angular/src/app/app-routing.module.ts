import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';
import { AdminComponent } from './auth/admin/admin.component';
import { AuthGuard } from './auth/_auth/auth.guard';
import { UserlistComponent } from './dashboard/userlist/userlist.component';




const routes: Routes = [


  
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },

 
  {
    path:'register',
    component:SignupComponent,
     canActivate: [AuthGuard]
  },
  {
    path:'signin',
    component:SigninComponent
    , canActivate: [AuthGuard]
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path:'admin',
    component:AdminComponent
    , canActivate: [AuthGuard]
 

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
