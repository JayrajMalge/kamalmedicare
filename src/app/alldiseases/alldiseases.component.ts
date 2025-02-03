import { CommonModule } from '@angular/common';
import { Component, OnInit ,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { Section, Specialization, disease } from '../enities';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-alldiseases',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './alldiseases.component.html',
  styleUrl: './alldiseases.component.css'
})
export class AlldiseasesComponent {
  logo : Section = new Section()
  diseases : disease[] = []
  loginstatus : boolean = true

  search : string = ''
  constructor(private cookies : CookieService,private route : Router,private userservices : UserServiceService){}
  ngOnInit(): void {
    const email = this.cookies.get("kamal_medicare")
    this.userservices.getuserbyemail("getbyemail",email).subscribe(
        (response)=>{
            this.loginstatus = response.role=='Admin'
        },(error)=>{}
    )
    this.userservices.getalldisease("getalldiseases").subscribe(
      (response)=>{
          this.diseases = response
      },(error)=>{}
    )
    this.userservices.getsectionbysectionid("getsectionbysectionid",98).subscribe(
      (response)=>{
        this.logo = response
      },(error)=>{}
    )
  }

  searchspe(){
    if(this.search!=''){
      this.userservices.getdiseasebyfieldname("getalldiseasesbyname",this.search).subscribe(
        (response)=>{
           this.diseases = response
        },(error)=>{}
      )
    }
    else{
      this.userservices.getdiseasebyfieldname("getalldiseasesbyname",this.search).subscribe(
        (response)=>{
            this.diseases = response
        },(error)=>{}
      )
    }
  }

  onheadingchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 98,
    heading : data,
    content : this.logo.content
    }
    this.userservices.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
    )
    }
    oncontentchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 98,
    heading : this.logo.heading,
    content : data
    }
    this.userservices.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
    )
    }
}
