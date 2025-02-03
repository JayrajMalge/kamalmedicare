import { CommonModule } from '@angular/common';
import { Component, OnInit ,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { Section, Specialization } from '../enities';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-allspecializations',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './allspecializations.component.html',
  styleUrl: './allspecializations.component.css'
})
export class AllspecializationsComponent implements OnInit{
  logo : Section = new Section()
  specializationarray : Specialization[] = []
  loginstatus : boolean = true
  constructor(private cookies : CookieService,private route : Router,private userservices : UserServiceService){}
  ngOnInit(): void {
    const email = this.cookies.get("kamal_medicare")
    this.userservices.getuserbyemail("getbyemail",email).subscribe(
        (response)=>{
            this.loginstatus = response.role=='Admin'
        },(error)=>{}
    )
    this.userservices.getspecailizations("getspecializations").subscribe(
      (response)=>{
          this.specializationarray = response
      },(error)=>{}
    )
    this.userservices.getsectionbysectionid("getsectionbysectionid",97).subscribe(
      (response)=>{
        this.logo = response
      },(error)=>{}
    )
  }

  search : string = ''
  searchspe(){
    if(this.search!=''){
      this.userservices.getspecializationsbyfieldname("getspecializationbyfieldname",this.search).subscribe(
        (response)=>{
           this.specializationarray = response
        },(error)=>{}
      )
    }
    else{
      this.ngOnInit()
    }
  }
  
  onheadingchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 97,
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
    sectionid : 97,
    heading : this.logo.heading,
    content : data
    }
    this.userservices.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
    )
    }
  
}
