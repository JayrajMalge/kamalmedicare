import { Component, OnInit } from '@angular/core';
import { FacilitatesComponent } from '../facilitates/facilitates.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FacilityBoxComponent } from '../facility-box/facility-box.component';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { Facility, Section } from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-facility',
  standalone: true,
  imports: [FacilitatesComponent,HeaderComponent,FooterComponent,FacilityBoxComponent,FormsModule,CommonModule],
  templateUrl: './facility.component.html',
  styleUrl: './facility.component.css'
})
export class FacilityComponent implements OnInit{
    constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private cookies : CookieService){}
    facilites : Facility[] = []
    loginstatus : boolean = false
    ngOnInit() {
      const email  = this.cookies.get("kamal_medicare")
      this.userservice.getuserbyemail("getbyemail",email).subscribe(
        (response)=>{
            this.loginstatus = response.role=='Admin'
        },(error)=>{

        }
      )
      this.userservice.getfacilites("getfacilites").subscribe(
        (response)=>{
              this.facilites = response
        },(error)=>{}
      )
      this.userservice.getsectionbysectionid("getsectionbysectionid",22).subscribe(
        (response)=>{
            this.facilitysection = response
        },(error)=>{}
      )
    }
      facilitysection : Section = new Section()
      onheadingchange(event : any){
        const data = event.target.innerHTML
        const s  = {
          sectionid : 22,
          heading : data,
          content : this.facilitysection.content
        }
        this.userservice.savesection("updatesection",s).subscribe(
        (response)=>{
          
        },(error)=>{}
        )
      }
      oncontentchange(event : any){
        const data = event.target.innerHTML
        const s  = {
        sectionid : 22,
        heading : this.facilitysection.heading,
        content : data
        }
        this.userservice.savesection("updatesection",s).subscribe(
        (response)=>{
          
        },(error)=>{}
        )
      }
}



