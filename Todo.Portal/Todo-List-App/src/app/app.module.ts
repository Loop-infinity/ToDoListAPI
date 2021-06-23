import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

//PrimeNg Imports
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CheckboxModule} from 'primeng/checkbox';
import {SelectButtonModule} from 'primeng/selectbutton';
import {AccordionModule} from 'primeng/accordion';
import {DialogModule} from 'primeng/dialog';

import { TodosComponent } from './todos/todos.component';
import { CalComponent } from './todos/cal/cal.component';
import { TopComponent } from './todos/top/top.component';

@NgModule({
  declarations: [			
    AppComponent,
      TodosComponent,
        CalComponent,
        TopComponent

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
    DialogModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
