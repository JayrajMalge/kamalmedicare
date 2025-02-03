import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Section ,filehandle} from '../enities';
import { CommonModule } from '@angular/common';
import { ImageServiceService } from '../image-service.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-welcomebox',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './welcomebox.component.html',
  styleUrl: './welcomebox.component.css'
})
export class WelcomeboxComponent {
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private cookies : CookieService){}
  heading : Section = new Section()
  content : Section = new Section()

  filehandle : filehandle = new filehandle()
  loginstatus : boolean = false

  ngOnInit(): void {
    const email  = this.cookies.get("kamal_medicare")
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{

      }
    )
     this.userservice.getsectionbysectionid("getsectionbysectionid",1).subscribe(
     (response)=>{
         this.heading = response
         this.filehandle = this.imageservice.bytetoimage(this.heading.imgvid,this.heading.imagetype,this.heading.imagename)
     },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",10).subscribe(
      (response)=>{
          this.content = response
      },(error)=>{}
     )
  }

  onheadingchange(event : any)
  {
    const data = event.target.innerHTML
    const s  = {
      sectionid : 1,
       heading : 'section3heading',
       content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }

  triggerFileInput() {
    const fileInput = document.getElementById('welcomefileinput') as HTMLInputElement;
    fileInput.click();
  }
  onwelcomechange(event : any){
    console.log(event)
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
        sectionid : 1,
         heading : this.heading.heading,
         content : this.heading.content,
         imagename : this.heading.imagename,
         imagetype : this.heading.imagetype,
         imgvid :  Array.from(byteArray)
      }
      this.userservice.savesection("updatesection",s).subscribe(
        (response)=>{
          console.log(response)
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
      sectionid  : 10,
       heading : 'section3content',
       content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }
}
