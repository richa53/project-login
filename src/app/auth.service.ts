import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { User } from "./user.model";
import { tap } from "rxjs/operators";

export interface AuthResponseData {
    kind: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    idToken: string,
    registered?: boolean

}

@Injectable ({providedIn: 'root'})
export class AuthService{
    user = new Subject<User>();
    constructor(private http: HttpClient){
    }

    signUp(email: string, password: string){
       return this.http.post<AuthResponseData>(
           'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6m43mYersOuVFwbZUdQGm6XzHRanpiQM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
            )
            .pipe(tap(resData=>
                {   const expirationDate = new Date( new Date().getTime() + +resData.expiresIn * 1000);
                    const user = new User(
                        resData.email, 
                        resData.localId, 
                        resData.idToken, 
                        expirationDate);
                        this.user.next(user);
                })
                )
}
    login(email: string, password: string){
        this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6m43mYersOuVFwbZUdQGm6XzHRanpiQM',
        {email: email,
        password: password,
        returnSecureToken: true}
        )
    }}

