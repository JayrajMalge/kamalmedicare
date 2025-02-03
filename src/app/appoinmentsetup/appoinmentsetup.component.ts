import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Section, filehandle } from '../enities';
import { CommonModule } from '@angular/common';
import { ImageServiceService } from '../image-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AppoinmentformComponent } from '../appoinmentform/appoinmentform.component';

@Component({
  selector: 'app-appoinmentsetup',
  standalone: true,
  imports: [CommonModule,AppoinmentformComponent],
  templateUrl: './appoinmentsetup.component.html',
  styleUrl: './appoinmentsetup.component.css'
})
export class AppoinmentsetupComponent {

  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private cookies : CookieService,private route : Router){}
  loginstatus : boolean = false
  section : Section = new Section()
  filehandle : filehandle = new filehandle()

  heading : Section = new Section()
  content : Section = new Section()

  ngOnInit(): void {
    const email  = this.cookies.get("kamal_medicare")
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{

      }
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",6).subscribe(
     (response)=>{
         this.heading = response
         console.log(response)
         this.filehandle =this.imageservice.bytetoimage(this.heading.imgvid,this.heading.imagetype,this.heading.imagename)
     },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",9).subscribe(
      (response)=>{
        this.content = response
      },(error)=>{}
    )
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

  onheadingchange(event : any)
  {
    const data = event.target.innerHTML
    const s  = {
      sectionid : 6,
       heading : 'section2heading',
       content : data,
       imagename : this.heading.imagename,
         imagetype : this.heading.imagetype,
         imgvid : this.heading.imgvid
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  onchange(event : any){
    const file = event.target.files[0];
    this.heading.imagename = file.name
    this.heading.imagetype = file.type
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer; 
      const byteArray = new Uint8Array(arrayBuffer);
      this.heading.imgvid = Array.from(byteArray)
      const s  = {
        sectionid : 6,
         heading : 'section2content',
         content : this.heading.content,
         imagename : this.heading.imagename,
         imagetype : this.heading.imagetype,
         imgvid : this.heading.imgvid
      }
      this.userservice.savesection("updatesection",s).subscribe(
        (response)=>{
        },(error)=>{}
      )
    };
    /*if (file) {
      reader.readAsDataURL(file); // Read the file as a Base64 string
    }*/
  }
  oncontentchange(event : any)
  {
    const data = event.target.innerHTML
    const s  = {
      sectionid : 9,
       heading : 'section2content',
       content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }

}
