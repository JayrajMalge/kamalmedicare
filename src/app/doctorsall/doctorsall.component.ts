import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DoctorBoxComponent } from '../doctor-box/doctor-box.component';
import { UserServiceService } from '../user-service.service';
import { Doctor } from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctorsall',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,DoctorBoxComponent,FormsModule,CommonModule],
  templateUrl: './doctorsall.component.html',
  styleUrl: './doctorsall.component.css'
})
export class DoctorsallComponent {
  constructor(private userservice : UserServiceService){}
  doctorarray : Doctor[] =  []
  ngOnInit(): void {
    this.userservice.getdoctors("getdoctors").subscribe(
      (response)=>{
         this.doctorarray = response
      },(error)=>{}
    )
  }
}
