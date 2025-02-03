import { Component ,Input, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Facility, FacilityImage, disease, diseaseimages, filehandle } from '../enities';
import { ImageServiceService } from '../image-service.service';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-update-disease',
  standalone: true,
  imports: [FormsModule,CommonModule,ImageComponent],
  templateUrl: './update-disease.component.html',
  styleUrl: './update-disease.component.css'
})
export class UpdateDiseaseComponent {
  constructor(private userservice : UserServiceService,private router: Router,private imageservice : ImageServiceService){}
    
  diseasearray : disease[] = []
  facilitesimagesarray : diseaseimages[] = []
  filehandles : filehandle[] = []
  urls : any[] = []
  ngOnInit(): void {
    this.userservice.getalldisease("getalldiseases").subscribe(
      (resposnes)=>{
          this.diseasearray = resposnes
      },(error)=>{}
    )
  }
  spinner : boolean = true;
  diseaseimages : any[] = []
  @Input() operation : string = '';

  dis : disease = new disease()
  faciltiesimagesinput(event: any): void {
    const files = event.target.files;
    if (files && files.length > 1) {
      this.diseaseimages = Array.from(files)
    }
  }
  facilitysubmitform(operation : string){
    if(operation=='Add Disease'){
      const newdis = {
        name : this.dis.name,
        description : this.dis.description,
      }
      console.log(newdis)
      this.userservice.savedisease("setnewdisease",newdis).subscribe(
        (response)=>{
            const storeddis = response
            this.diseaseimages.map((img)=>{
              const image = new FormData()
              image.append("disid",storeddis.diseaseid)
              image.append("images",img)
              this.userservice.savediseaseimages("setnewdiseaseimages",image).subscribe(
                (response)=>{
                  alert("Disease Created Sucessfully")
                  operation = 'Add Disease'
                },(error)=>{
                }
              )
            })
        },(error)=>{
            console.log(error)
        }
      )
    } else {
      this.userservice.savedisease("setnewdisease",this.dis).subscribe(
        (response)=>{
          console.log(this.diseaseimages)
          if(this.diseaseimages.length > 0){
            const storeddis = response
            this.diseaseimages.map((img)=>{
            const image = new FormData()
            image.append("disid",storeddis.diseaseid)
            image.append("images",img)
            this.userservice.savediseaseimages("updatediseaseimages",image).subscribe(
              (response)=>{
              },(error)=>{
              }
            )
          })
          alert("Disease Created Sucessfully")
          this.operation='Update Disease'
          }
        },(error)=>{
            console.log(error)
        }
      )
    }
  }

  updatevalue : number = 0
  editmode : boolean = false;
  turneditmode(){
       this.editmode = true
       const disarray = this.diseasearray.filter((dis)=>{
        return dis.diseaseid == this.updatevalue
       })
       this.dis = disarray[0]
       this.userservice.getdiseaseimagesbydisease("getalldiseasesimages",this.dis.diseaseid).subscribe(
        (response)=>{
            this.diseaseimages = response
            for(let i=0;i<this.diseaseimages.length;i++){
              const filehan = this.imageservice.bytetoimage(this.diseaseimages[i].image,this.diseaseimages[i].imagetype,this.diseaseimages[i].imagename)
              this.filehandles.push(filehan)
              this.urls.push(filehan.url)
            }
        },(error)=>{}
       )
  }



  deletefacilites(){
    this.operation='Confirm Deletion';
    const disease = this.diseasearray.filter((dis)=>{
      return dis.diseaseid == this.updatevalue
     })
     this.dis = disease[0]
     this.userservice.getdiseaseimagesbydisease("getalldiseasesimages",this.dis.diseaseid).subscribe(
      (response)=>{
          this.diseaseimages = response
          for(let i=0;i<this.diseaseimages.length;i++){
            const filehan = this.imageservice.bytetoimage(this.diseaseimages[i].image,this.diseaseimages[i].imagetype,this.diseaseimages[i].imagename)
            this.filehandles.push(filehan)
            this.urls.push(filehan.url)
          }
      },(error)=>{}
     )
  }

  deletefacility(){
    this.userservice.deletedisease("deletedisease/"+this.dis.diseaseid).subscribe(
      (response)=>{alert("Disease Deleted Successfully");this.operation='Delete Disease'},(error)=>{}
    )
  }


  isDialogOpen: boolean = false;

  openDialog() {
    this.isDialogOpen = true;
  }

  handleConfirm() {
    console.log('Confirmed!');
    this.isDialogOpen = false;
  }

  handleClose() {
    console.log('Dialog closed');
    this.isDialogOpen = false;
  }
}
