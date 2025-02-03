import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BlogNewsBoxComponent } from '../blog-news-box/blog-news-box.component';
import { UserServiceService } from '../user-service.service';
import { News ,Section} from '../enities';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-news-blogs-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,BlogNewsBoxComponent,FormsModule,CommonModule],
  templateUrl: './news-blogs-page.component.html',
  styleUrl: './news-blogs-page.component.css'
})
export class NewsBlogsPageComponent implements OnInit{

  constructor(private userservice : UserServiceService,private cookies : CookieService){}
  newsarray : News[] = []
  loginstatus : boolean = false
  ngOnInit() {
    const email  = this.cookies.get("kamal_medicare")
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{

      }
    )
    this.userservice.getnews("getnews").subscribe(
      (response)=>{
        this.newsarray = response
      },(error)=>{}
     )
     this.userservice.getsectionbysectionid("getsectionbysectionid",4).subscribe(
      (response)=>{
          this.heading = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",13).subscribe(
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
    sectionid : 4,
    heading : 'section6heading',
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
    sectionid : 13,
    heading : 'section6content',
    content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
    )
  }




  currentImageIndex : number = 0
  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.newsarray.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.newsarray.length) %
      this.newsarray.length;
  }
}


