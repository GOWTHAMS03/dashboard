import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';
import { AdminComponent } from './auth/admin/admin.component';
import { UserComponent } from './auth/user/user.component';
import { AuthGuard } from './auth/_auth/auth.guard';
import { AuthInterceptor } from './auth/_auth/auth.interceptor';
import { UserService } from './auth/_services/user.service';
import { ButtonComponent } from './common/button/button.component';
import { InputComponent } from './common/input/input.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { UserlistComponent } from './dashboard/userlist/userlist.component';
import { EditComponent } from './dashboard/edit/edit.component';
import { DialogpermissionComponent } from './dashboard/dialogpermission/dialogpermission.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    ForbiddenComponent,
    AdminComponent,
    UserComponent,
    ButtonComponent,
    InputComponent,
    UserlistComponent,
    EditComponent,
    DialogpermissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
