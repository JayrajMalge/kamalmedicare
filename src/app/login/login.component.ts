import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription ,interval } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit,OnDestroy{
  constructor(private usersevice : UserServiceService,private route : Router,private cookies : CookieService){}
  email : string = '';
  optstatus : boolean = true;
  sendingotp : boolean = true;
  otp : number = 0

  timervalue : number = 60
  timerstatus : boolean = true
  timersubcription : Subscription | null = null
  optbuttontext : string = 'Get OTP';

  ngOnInit(): void {
    
  }
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
            const timer = interval(1000)
            this.timerstatus = false
            this.timersubcription = timer.subscribe(()=>{
                if(this.timervalue > 0){
                  this.timervalue--;
                }else{
                  this.stoptimer
                }
            })
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

  stoptimer(){
    this.timersubcription?.unsubscribe()
    this.timerstatus = true
  }
  ngOnDestroy(): void {
    this.stoptimer()
  }

  //logingoogle(){}
}
