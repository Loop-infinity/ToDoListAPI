import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Login } from './Login.model';
import { Register } from './Register.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerForm: Register = new Register();
  loginForm: Login = new Login();

  constructor(private fb: FormBuilder,private http: HttpClient) { }

  baseUrl: string = "http://localhost:36680/api/User";

  // formModel = this.fb.group({
  //   UserName: [''],
  //   FirstName: [''],
  //   LastName: [''],
  //   Email: [''],
  //   Passwords: this.fb.group({
  //     Password: ['', [Validators.required, Validators.minLength(4)]],
  //     ConfirmPassword: ['', Validators.required]
  //   })

  // });

  postUser(){
    return this.http.post<Register>(this.baseUrl+'/Register',this.registerForm);
  }

  loginUser(){
    return this.http.post<Login>(this.baseUrl+'/Login',this.loginForm);
  }

}
