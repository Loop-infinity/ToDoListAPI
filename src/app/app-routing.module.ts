import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './authorisation/auth.guard';
import { TodosComponent } from './todos/todos.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: '', component: TodosComponent,canActivate: [AuthGuard]},
  { path: 'home', component: TodosComponent,canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent, 
    children: [
      { path: 'register', component: RegisterComponent},
      { path: 'login', component: LoginComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
