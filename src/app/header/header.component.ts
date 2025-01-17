import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { response } from 'express';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  loginstatus : boolean = false
  email : string = '';
  role : string = '';
  user : any 
  constructor(private cookies : CookieService,private route : Router,private userservices : UserServiceService){}
  ngOnInit(): void {
    this.email = this.cookies.get("kamal_medicare")
    const length = this.email.length;
    if(this.email!=null && length > 0){
      this.loginstatus = true
      this.role = 'Admin'
      /*this.userservices.getuserbyemail("getbyemail",this.email).subscribe(
        (response)=>{
            this.user = response
            this.role = this.user.role
            console.log(this.role)
        },(error)=>{

        }
      )*/
    }
  }
  logout(){
    this.cookies.delete("kamal_medicare")
    this.route.navigate(['/'])
  }
}
