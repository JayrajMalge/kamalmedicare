import { Component, Input, OnInit } from '@angular/core';
import { Specialization, SubSpecialization, filehandle } from '../enities';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';

@Component({
  selector: 'app-specialization',
  standalone: true,
  imports: [],
  templateUrl: './specialization.component.html',
  styleUrl: './specialization.component.css'
})
export class SpecializationComponent implements OnInit{
  @Input() Specialization : Specialization = new Specialization()
  filehandleinput : filehandle = new filehandle()
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService){}
  specializationarray : Specialization[] = []
  subspecializationarray : SubSpecialization[] = []
  ngOnInit(): void {
    this.userservice.getallsubspecialization("getallsubspeacialization").subscribe(
      (response)=>{
        this.subspecializationarray = response
        this.userservice.getsubspeacializationimagesvideobyid("getsubspeacializationimagesvideobyid/"+this.subspecializationarray[0].subspeacializationid).subscribe(
            (response)=>{
              if(response.length>0){
                this.filehandleinput = this.imageservice.bytetoimage(response[0].imagevideo,response[0].imagetype,response[0].imagename)
              }
            },(error)=>{}
        )
      },(error)=>{}
    )
  }
}
