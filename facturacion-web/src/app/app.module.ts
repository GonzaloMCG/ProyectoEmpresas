import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingModule } from './landing/landing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductService } from './services/product.service';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';
import { MessageService } from './message/message.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatPaginatorModule,
    CommonModule
  ],
  providers: [
    UserService,
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
