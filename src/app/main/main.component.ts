import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppoinmentsetupComponent } from '../appoinmentsetup/appoinmentsetup.component';
import { SpecializationboxComponent } from '../specializationbox/specializationbox.component';
import { WelcomeboxComponent } from '../welcomebox/welcomebox.component';
import { DoctorsboxComponent } from '../doctorsbox/doctorsbox.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { BlogsNewsComponent } from '../blogs-news/blogs-news.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, AppoinmentsetupComponent, SpecializationboxComponent, WelcomeboxComponent, DoctorsboxComponent, ReviewsComponent,BlogsNewsComponent,FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
   loginstatus : boolean = false
   constructor(private cookies : CookieService){}
   ngOnInit(): void {
     const email = this.cookies.get("kamal_medicare")
     if(email!=null || email!=''){
       this.loginstatus = true
     }
   }
}
