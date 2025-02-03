import { Component, Input, OnInit } from '@angular/core';
import { Doctor, filehandle } from '../enities';
import { ImageServiceService } from '../image-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-box',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './doctor-box.component.html',
  styleUrl: './doctor-box.component.css'
})
export class DoctorBoxComponent implements OnInit{

  @Input() doc : Doctor = new Doctor()

  constructor(private imageservice : ImageServiceService){}
  filehandle : filehandle = new filehandle()
  ngOnInit() {
   this.filehandle = this.imageservice.bytetoimage(this.doc.profilephotot,this.doc.imagetype,this.doc.imagename)
  }
}
