import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import {MessageService} from 'primeng/api';
import { AuthService } from 'src/app/authorisation/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService, private router: Router, private messageService: MessageService, private auth: AuthService) { }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(f: NgForm){
    this.userService.loginUser()
    .subscribe(
      (result: any) => {
        localStorage.setItem('token',result.token);
        console.log(result);
        this.messageService.add({key: 'tl',severity:'success', summary:'Login Succesful', detail:''});
        this.router.navigateByUrl('/home');
      },
      error => {
        this.messageService.add({key: 'tl',severity:'error', summary:'Error', detail:'Invalid Username or Password'});
      }
    )
  }
}
