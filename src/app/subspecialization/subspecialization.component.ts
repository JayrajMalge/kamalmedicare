import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute } from '@angular/router';
import { DoctorBoxComponent } from '../doctor-box/doctor-box.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-subspecialization',
  standalone: true,
  imports: [HeaderComponent,DoctorBoxComponent,FooterComponent],
  templateUrl: './subspecialization.component.html',
  styleUrl: './subspecialization.component.css'
})
export class SubspecializationComponent implements OnInit{
   constructor(private route : ActivatedRoute){}
   ngOnInit(): void {
     const courseid = this.route.snapshot.paramMap.get("speacializationid")
   }
}
