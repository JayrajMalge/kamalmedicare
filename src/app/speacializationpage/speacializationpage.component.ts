import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SpeacializationpagefullComponent } from '../speacializationpagefull/speacializationpagefull.component';
import { FooterComponent } from '../footer/footer.component';
import { UserServiceService  } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { ActivatedRoute } from '@angular/router';
import { Specialization, SubSpecialization } from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-speacializationpage',
  standalone: true,
  imports: [HeaderComponent,SpeacializationpagefullComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './speacializationpage.component.html',
  styleUrl: './speacializationpage.component.css'
})
export class SpeacializationpageComponent implements OnInit{
   constructor(private route : ActivatedRoute,private userservice : UserServiceService,private imageservice : ImageServiceService){}
   specialization : Specialization = new Specialization()
   subspecialization : SubSpecialization[] = []
   ngOnInit(): void {
    const speid : number = Number(this.route.snapshot.paramMap.get("speacializationid"))
    this.userservice.getspebyid("getspecializationbyid/"+speid).subscribe(
      (response)=>{
        this.specialization = response
        this.userservice.getspeacializationbyid("getspeacializationbyid",speid).subscribe(
          (response)=>{this.subspecialization = response},(error)=>{}
        )
      },(error)=>{}
    )
   }
}
