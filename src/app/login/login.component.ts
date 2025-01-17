import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private usersevice : UserServiceService,private route : Router,private cookies : CookieService){}
  email : string = '';
  optstatus : boolean = true;
  sendingotp : boolean = true;
  otp : number = 0
  optbuttontext : string = 'Get OTP';
  logingoogle(){
    window.location.href = 'http://localhost:5000/oauth2/authorization/google';
    this.usersevice.loginwithgoogle("getuser").subscribe(
      (response)=>{
        console.log(response)
      },(error)=>{
        console.log(error)
      }
    )
  }
  sendOtp(){
    if(this.optbuttontext == "Get OTP"){
        this.sendingotp=false;
        this.usersevice.sendOTP("sendOTPtoemail",this.email).subscribe(
          (response)=>{
            this.optstatus = false
            this.optbuttontext = 'Verfiy'
            this.sendingotp=true
            console.log(response)
          } ,(error)=>{
           console.log(error)
          }
        )
    }
    else if(this.optbuttontext == "Verfiy"){
      const onetime : string =""+this.otp;
      const otpdeatail = {
        email : this.email,
        otp : this.otp
      }
      console.log(otpdeatail)
      this.usersevice.verfiyotp("emailverfication",this.email,onetime).subscribe(
        (response)=>{
          this.cookies.set("kamal_medicare",this.email)
          this.route.navigate(['/main'])
        } ,(error)=>{
         console.log(error)
        }
      )
    }
  }

  //logingoogle(){}
}
