import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private auth: AuthService, private router: Router) {  } 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.auth.isAuthenticated()) {
            
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    (succ: any) => {

                    },
                    (err: any) => {
                        if(err.status == 400){
                            console.log("400 Auth Error");
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/user/login');

                        }
                            
                            
                    }
                )
            );
        }
        else{
            return next.handle(req.clone());
        }



        throw new Error("Method not implemented.");
    }
    
}