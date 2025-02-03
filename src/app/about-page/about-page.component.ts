import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { UserServiceService } from '../user-service.service';
import { Section, filehandle, hospital } from '../enities';
import { ImageServiceService } from '../image-service.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent implements OnInit{
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private cookies : CookieService){}
  hospitaldata : hospital[] = []
  aboutfile : filehandle = new filehandle()
  loginstatus : boolean = false

  ngOnInit(): void {
    const email  = this.cookies.get("kamal_medicare")
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{

      }
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",15).subscribe(
      (response)=>{
          this.about = response
          console.log(response)
          this.aboutfile = this.imageservice.bytetoimage(this.about.imgvid,this.about.imagetype,this.about.imagename)
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",19).subscribe(
      (response)=>{
          this.mission = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",21).subscribe(
      (response)=>{
          this.vision = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",20).subscribe(
      (response)=>{
          this.goal = response
      },(error)=>{}
    )
  }

  about    : Section = new Section()
  mission  : Section = new Section()
  vision   : Section = new Section()
  goal     : Section = new Section()

    ongoalheadingchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.goal.sectionid,
        heading : data,
        content : this.goal.content
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
      )
    }
    onaboutheadingchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.about.sectionid,
        heading : data,
        content : this.about.content,
        imagename : this.about.imagename,
           imagetype : this.about.imagetype,
           imgvid : this.about.imgvid
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
      )
    }
    onmissionheadingchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.mission.sectionid,
        heading : data,
        content : this.mission.content
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
      )
    }
    onvisionheadingchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.vision.sectionid,
        heading : data,
        content : this.vision.content
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
      )
    }
    onmissioncontentchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.mission.sectionid,
        heading : this.mission.heading,
        content : data,
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
      )
    }
    ongoalcontentchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.goal.sectionid,
        heading : this.goal.heading,
        content : data
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{},(error)=>{}
      )
    }
    onvisioncontentchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.vision.sectionid,
        heading : this.vision.heading,
        content : data
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{},(error)=>{}
      )
    }
    onaboutcontentchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.about.sectionid,
        heading : this.about.heading,
        content : data,
        imagename : this.about.imagename,
           imagetype : this.about.imagetype,
           imgvid : this.about.imgvid
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{},(error)=>{}
      )
    }

    triggerFileInput() {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput.click();
    }
    onchange(event : any){
      const file = event.target.files[0];
      this.about.imagename = file.name
      this.about.imagetype = file.type
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer; 
        const byteArray = new Uint8Array(arrayBuffer);
        this.about.imgvid = Array.from(byteArray)
        const s  = {
          sectionid : 15,
           heading : this.about.heading,
           content : this.about.content,
           imagename : this.about.imagename,
           imagetype : this.about.imagetype,
           imgvid : this.about.imgvid
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
}

