import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
isLoginMode = true;
isLoading = false;
error: string = null;

constructor(private authService: AuthService){}

onSwitchMode(){
  this.isLoginMode = !this.isLoginMode;
}
onSubmit(form: NgForm){
if (!form.valid){
  return;
}
const email = form.value.email;
const password = form.value.password;
this.isLoading = true;

if(this.isLoginMode){
  this.authService.signUp(email, password).subscribe(
    resData => {
      console.log(resData);
      this.isLoading = false;
    
    },
    error => {
      console.log(error);
      this.error = "Oops! An error Occured"
      this.isLoading = false;
    }
  )
}else{
  this.authService.signUp(email, password).subscribe(
    resData => {
      console.log(resData);
      this.isLoading = false;
    },
    error => {
      console.log(error);
      this.error = "Oops! An error Occured"
      this.isLoading = false;
    }
  );
}
form.reset()
}
}

