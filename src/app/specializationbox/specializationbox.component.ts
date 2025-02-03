import { Component, OnInit } from '@angular/core';
import { SpecializationComponent } from '../specialization/specialization.component';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { Section, Specialization, SubSpecialization, filehandle } from '../enities';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-specializationbox',
  standalone: true,
  imports: [SpecializationComponent,CommonModule,FormsModule],
  templateUrl: './specializationbox.component.html',
  styleUrl: './specializationbox.component.css'
})
export class SpecializationboxComponent implements OnInit{
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private cookies : CookieService){}
  specializationarray : Specialization[] = []
  subspecializationarray : SubSpecialization[] = []
  filehandles : filehandle[][] = [[]]
  loginstatus : boolean = false

  ngOnInit(): void {
    const email  = this.cookies.get("kamal_medicare")
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{

      }
    )
    this.userservice.getspecailizations("getspecializations").subscribe(
      (response)=>{
         this.specializationarray = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",2).subscribe(
      (response)=>{
          this.heading = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",11).subscribe(
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
      sectionid : 2,
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
      sectionid : 11,
       heading : 'section4content',
       content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }

  currentImageIndex : number = 0
  nextImage() {
    if (this.specializationarray.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.specializationarray.length;
    }
  }
  
  prevImage() {
    if (this.specializationarray.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.specializationarray.length) % this.specializationarray.length;
    }
  }
  
}
