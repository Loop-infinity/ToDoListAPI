import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//PrimeNg Imports
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CheckboxModule} from 'primeng/checkbox';
import {SelectButtonModule} from 'primeng/selectbutton';
import {AccordionModule} from 'primeng/accordion';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';

import { TodosComponent } from './todos/todos.component';
import { CalComponent } from './todos/cal/cal.component';
import { TopComponent } from './todos/top/top.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { MessageService } from 'primeng/api';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './authorisation/auth.interceptor';
import { UserService } from './shared/user.service';


@NgModule({
  declarations: [					
    AppComponent,
      TodosComponent,
        CalComponent,
        TopComponent,
      UserComponent,
        RegisterComponent,
        LoginComponent
      
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    BrowserAnimationsModule,
    CheckboxModule,
    SelectButtonModule,
    AccordionModule,
    HttpClientModule,
    DialogModule,
    ReactiveFormsModule,
    ToastModule,
    
    
  ],
  providers: [DatePipe, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
