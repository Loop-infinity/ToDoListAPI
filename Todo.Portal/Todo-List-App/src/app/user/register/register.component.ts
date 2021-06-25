import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authorisation/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userService: UserService, private router: Router, private auth: AuthService) { 
    
  }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(f: NgForm){
    this.userService.postUser()
    .subscribe(
      (result: any) => {
        if(result.succeeded){
          console.log("User Successfully Created");
          this.router.navigate(['/home']);
          f.reset();
        }
        else{
          console.log("Validation Error:");
          console.log(result.errors);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
