import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute } from '@angular/router';
import { DoctorBoxComponent } from '../doctor-box/doctor-box.component';
import { FooterComponent } from '../footer/footer.component';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { Doctor, SubSpecialization, filehandle } from '../enities';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorsboxComponent } from "../doctorsbox/doctorsbox.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-subspecialization',
  standalone: true,
  imports: [HeaderComponent, DoctorBoxComponent, FooterComponent, CommonModule, FormsModule, DoctorsboxComponent],
  templateUrl: './subspecialization.component.html',
  styleUrl: './subspecialization.component.css'
})
export class SubspecializationComponent implements OnInit{
   constructor(private route : ActivatedRoute,private userservice : UserServiceService,private imageservice : ImageServiceService,private cookies : CookieService){}
   subspecializations : SubSpecialization = new SubSpecialization()
   filehandles : filehandle[] = []
   Doctors : Doctor[] = []

   loginstatus : boolean = false
   ngOnInit(): void {
    const email  = this.cookies.get("kamal_medicare")
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{

      }
    )
     const speid = Number(this.route.snapshot.paramMap.get("subspeacializationid"))
     this.userservice.getanyspeacialization("getsubspecializationbysubspecializationid/"+speid).subscribe(
      (response)=>{this.subspecializations = response;console.log(this.subspecializations)},(error)=>{}
     )
     this.userservice.getsubspeacializationimagesvideobyid("getsubspeacializationimagesvideobyid/"+this.subspecializations.subspeacializationid).subscribe(
      (response)=>{
        response.map((res)=>{
          this.filehandles.push(this.imageservice.bytetoimage(res.imagevideo,res.imagetype,res.imagename))
        })
      },(error)=>{}
     )
     this.userservice.getdocspeacializations("getdoctorspecializationbysubspecializationid",this.subspecializations.speacialization.speacializationid).subscribe(
      (response)=>{
        response.map((res)=>{
          this.Doctors.push(res.doctor)
        })
      },(error)=>{}
     )
   }
}
