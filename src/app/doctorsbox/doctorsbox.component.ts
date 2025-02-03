import { Component, OnInit } from '@angular/core';
import { DoctorBoxComponent } from '../doctor-box/doctor-box.component';
import { UserServiceService } from '../user-service.service';
import { Doctor, Section } from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageServiceService } from '../image-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-doctorsbox',
  standalone: true,
  imports: [DoctorBoxComponent,FormsModule,CommonModule],
  templateUrl: './doctorsbox.component.html',
  styleUrl: './doctorsbox.component.css'
})
export class DoctorsboxComponent implements OnInit{
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private cookies : CookieService){}
  doctorarray : Doctor[] =  []
  loginstatus : boolean = false
  ngOnInit(): void {
    const email  = this.cookies.get("kamal_medicare")
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{

      }
    )
    this.userservice.getdoctors("getdoctors").subscribe(
      (response)=>{
         this.doctorarray = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",3).subscribe(
      (response)=>{
          this.heading = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",12).subscribe(
      (response)=>{
          this.content = response
      },(error)=>{}
    )
  }
heading : Section = new Section()
content : Section = new Section()
onheadingchange(event : any){
  const data = event.target.innerHTML
  const s  = {
    sectionid : 3,
    heading : 'section4heading',
    content : data
  }
  this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
  )
}
oncontentchange(event : any){
  const data = event.target.innerHTML
  const s  = {
    sectionid : 12,
    heading : 'section4content',
    content : data
  }
  this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
  )
  } 

  currentImageIndex : number = 0
  selecteddoctor : Doctor = this.doctorarray[this.currentImageIndex]
  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.doctorarray.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.doctorarray.length) %
      this.doctorarray.length;
  }
}




