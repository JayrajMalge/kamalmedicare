import { Component, Input, OnInit } from '@angular/core';
import { SubSpecialization, SubSpecializationimgvideo, filehandle } from '../enities';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';

@Component({
  selector: 'app-speacializationpagefull',
  standalone: true,
  imports: [],
  templateUrl: './speacializationpagefull.component.html',
  styleUrl: './speacializationpagefull.component.css'
})
export class SpeacializationpagefullComponent implements OnInit{
   @Input() subspeacialization : SubSpecialization = new SubSpecialization()
   subspeacializationimagesvideo : SubSpecializationimgvideo[] = []
   filehandle : filehandle = new filehandle()
   constructor(private userservice : UserServiceService,private imageservice : ImageServiceService){}
   ngOnInit(): void {
      this.userservice.getsubspeacializationimagesvideobyid("getsubspeacializationimagesvideobyid/"+this.subspeacialization.subspeacializationid).subscribe(
        (response)=>{
            this.subspeacializationimagesvideo = response
            this.filehandle =this.imageservice.bytetoimage(this.subspeacializationimagesvideo[0].imagevideo,this.subspeacializationimagesvideo[0].imagetype,this.subspeacializationimagesvideo[0].imagename)
        },(error)=>{}
      )
   }
}
