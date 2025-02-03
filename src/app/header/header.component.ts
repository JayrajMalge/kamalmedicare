import { CommonModule } from '@angular/common';
import { Component, OnInit ,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { response } from 'express';
import { ReviewformComponent } from '../reviewform/reviewform.component';
import { Section, Specialization, disease } from '../enities';
import { AppoinmentformComponent } from "../appoinmentform/appoinmentform.component";
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReviewformComponent, AppoinmentformComponent,ProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  loginstatus : boolean = false
  email : string = '';
  role : string = '';
  user : any 

  logo : Section = new Section()
  specializationarray : Specialization[] = []
  diseasearray : disease[] = []
  constructor(private cookies : CookieService,private route : Router,private userservices : UserServiceService){}
  ngOnInit(): void {
    this.email = this.cookies.get("kamal_medicare")
    const length = this.email.length;

    if(this.email!=null && length > 0){
      this.loginstatus = true
      this.role = 'Admin'
      this.userservices.getuserbyemail("getbyemail",this.email).subscribe(
        (response)=>{
            this.user = response
            this.role = this.user.role
        },(error)=>{

        }
      )
    }
    this.userservices.getspecailizations("getspecializations").subscribe(
      (response)=>{
          this.specializationarray = response
      },(error)=>{}
    )
    this.userservices.getsectionbysectionid("getsectionbysectionid",7).subscribe(
      (response)=>{
        this.logo = response
      },(error)=>{}
    )
    this.userservices.getalldisease("getalldiseases").subscribe(
      (resposnes)=>{
          this.diseasearray = resposnes
      },(error)=>{}
    )
  }
  logout(){
    this.cookies.delete("kamal_medicare")
    this.route.navigate(['/'])
  }


  checkinput(event : any){
    const data = event.target.innerHTML
    const s  = {
      sectionid : 7,
       heading : 'logo',
       content : data
    }
    this.userservices.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }
  isDialogOpen: boolean = false;
  openDialog() {
    this.isDialogOpen = true;
  }
  handleClose() {
    this.isDialogOpen = false;
  }
  handleFormSubmit(message: string) {
    console.log('Form submitted with message:', message);
  }

  isprofile: boolean = false;
  openprofiledialog() {
    this.isprofile = true;
  }
  handleprofile() {
    this.isprofile = false;
  }

  handleprofilesubmit() {
    this.isprofile = false;
  }


  isappointmentopen: boolean = false;
  openAppointment() {
    if(this.loginstatus){
      this.isappointmentopen = true;
    }else{
      this.route.navigate(["/login"])
    }
  }
  handleAppointmentClose() {
    this.isappointmentopen = false;
  }
  handleFormAppointmentSubmit() {
  }


}
