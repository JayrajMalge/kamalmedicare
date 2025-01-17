import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule ,FormControl,FormGroup, Validators, FormArray} from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Doctor, Experience } from '../enities';
import { response } from 'express';

@Component({
  selector: 'app-update-page',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './update-page.component.html',
  styleUrl: './update-page.component.css'
})
export class UpdatePageComponent {
  isSidebarOpen = false;
  operation : string = 'Add Doctor'



  doctor : FormGroup;
  specialization : FormGroup;
  constructor(private formBuilder : FormBuilder,private userservice : UserServiceService){
    this.doctor = formBuilder.group({
      "doc_name":['',Validators.required],
      "doc_email":['',Validators.required],
      "doc_phone":['',Validators.required],
      "doc_schedulefrom":['',Validators.required],
      "doc_scheduleto":['',Validators.required],
      "doc_profile":[null,Validators.required],
      "doc_education":formBuilder.array([]),
      "doc_experience":formBuilder.array([])
    })
    this.specialization = formBuilder.group({
      "name": ['',Validators.required],
      "description":['',Validators.required],
      "subspecializationarray":formBuilder.array([])
    })
  }
  menuItems = [
    {
      name: 'Add',
      subItems: [
        { name: 'Add Doctor', },
        { name: 'Add Specialization' },
        { name: 'Add Facilites' },
        { name: 'Add Treatments' },
        { name: 'Add News' },
        { name: 'Add Blog' },

      ],
      isOpen: false
    },
    {
      name: 'Update',
      subItems: [
        { name: 'Update Doctor' },
        { name: 'Update Specialization' },
        { name: 'Update Facilites' },
      ],
      isOpen: false
    },
    {
      name: 'Delete',
      subItems: [
        { name: 'Delete Doctor' },
        { name: 'Delete Specialization' },
        { name: 'Delete Facilites' },
      ],
      isOpen: false
    },
    {
      name : "Page and section",
      subItems: [
        { name: 'Update section' },
      ],
      isOpen: false
    }
  ];
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleDropdown(item: any) {
    item.isOpen = !item.isOpen;
  }
  openform(operation : string){
    this.operation=operation
    this.updatevalue = ''
    this.isSpecializationEditMode = false
    this.isdoctorEditMode = false
    this.isFacilitesEditModel = false
    console.log(operation)
  }
  //end of menu 






  subSpecializationimages : any[] = [];
  bytearrayimages : any[] = []
  get specaili_zation(){
    return this.specialization.get("subspecializationarray") as FormArray
  }

  addspeacilization(){
    const singlespecialization = this.formBuilder.group({
      "subspecializationname":['',Validators.required],
      "subspecializationabout":['',Validators.required],
      "subspeacializationimgvideotype" : [0,Validators.required],
      "subspecializationimages":[null]
    })
    this.specaili_zation.push(singlespecialization)
  }
  addspeacilizationwithparams(name : string,about : string,images : []){
    const singlespecialization = this.formBuilder.group({
      "subspecializationname":[name,Validators.required],
      "subspecializationabout":[about,Validators.required],
      "subspeacializationimgvideotype" : [0,Validators.required],
      "subspecializationimages":images
    })
    this.specaili_zation.push(singlespecialization)
  }
  onFileChange(event: any, index: number): void {
    const files = event.target.files;
    for(let i=0;i<files.length;i++){
      console.log(files[i])
    }
    if (files && files.length > 0) {
      this.specaili_zation.at(index).patchValue({
        'subspecializationimages': files,
      });
    }
    this.subSpecializationimages=files;
  }

  removeSubSpecialization(index: number): void {
    this.specaili_zation.removeAt(index);
  }

  specializationsubmit(operation : string){
    if(operation=='Add Specialization'){
       const values =  this.specialization.value
       const specialization : any = {
           fieldname : values.name,
           description : values.description
       }
       this.userservice.createspecialization("savespeacialization",specialization).subscribe(
        (response)=>{
           const storedspe = response;
           let subspecializations : any[] = values.subspecializationarray
           subspecializations.map((subspe)=>{
              const subsp = {
                name : subspe.subspecializationname,
                description : subspe.subspecializationabout,
                speacialization : storedspe.speacializationid
              }
              this.userservice.createsubspecialization("savesubspeacialization",subsp).subscribe(
                (response)=>{
                   const storedsubspe = response
                   this.subSpecializationimages.map((image)=>{
                      let array = this.imagetobyte(image)
                      const singlesubspeimgvid = {
                        subspeacialization : storedsubspe.subspeacializationid,
                        imagevideo : array,
                        type : storedsubspe.type
                      }
                      this.userservice.createsubspecializationimgvid("savesubspeacializationimgvid",singlesubspeimgvid).subscribe(
                        (response)=>{
                            console.log(response)
                        },(error)=>{
                        }
                      )
                   })
                },(error)=>{
                  console.log(error)
                }
              )
           })
        },(error)=>{
          console.log(error)
        }
       )
       
    } else if(operation=='Update Specialization'){

    } else {

    }
  }
  imagetobyte(file : any){
     const reader = new FileReader()
     reader.onload = ()=>{
         const arraybuffer = reader.result as ArrayBuffer 
         const bytearray = new Uint8Array(arraybuffer)
         return bytearray
     }
  }







  get doctor_education(){
    return this.doctor.get("doc_education") as FormArray
  }

  adddoctoreducation(){
    const education = this.formBuilder.group({
      "degree":['',Validators.required],
      "university_name":['',Validators.required],
      "from_date":[Date,Validators.required],
      "to_date":[Date,Validators.required]
    })
    this.doctor_education.push(education)
  }

  addeducationparams(degree : string,university_name : string,from_date : Date,to_date : Date){
    const education = this.formBuilder.group({
      "degree":[degree,Validators.required],
      "university_name":[university_name,Validators.required],
      "from_date":[from_date,Validators.required],
      "to_date":[to_date,Validators.required]
    })
    this.doctor_education.push(education)
  }

  removeeducation(index : number){
    this.doctor_education.removeAt(index)
  }

  get doctor_experience(){
    return this.doctor.get("doc_experience") as FormArray
  }

  addexperience(){
    const experience = this.formBuilder.group({
      "field":['',Validators.required],
      "hospital_name":['',Validators.required],
      "years":[0,Validators.required],
      "from_date":[Date,Validators.required],
      "to_date":[Date,Validators.required]
    })
    this.doctor_experience.push(experience)
  }

  addexperiencewithparams(field : string,hospital_name : string,years : number,from_date : Date,to_date : Date){
    const experience = this.formBuilder.group({
      "field":[field,Validators.required],
      "hospital_name":[hospital_name,Validators.required],
      "years":[years,Validators.required],
      "from_date":[from_date,Validators.required],
      "to_date":[to_date,Validators.required]
    })
    this.doctor_experience.push(experience)
  }

  removeexperience(index : number){
    this.doctor_experience.removeAt(index)
  }
  
  profileimage : any  = null 
  profilephoto(event : any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer; 
      const byteArray = new Uint8Array(arrayBuffer);
      console.log(byteArray)
      this.profileimage = byteArray
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as a Base64 string
    }
  }
  doctorsubmit(operations : string){
    if(operations=='Add Doctor'){
      const values = this.doctor.value;
      const doctor: any = {
        name: values.doc_name,
        about: values.doc_about,
        email: values.doc_email,
        phone: values.doc_phone,
        schedulefrom: String(values.doc_schedulefrom),
        scheduleto: String(values.doc_scheduleto),
        joindate: new Date(),
        profilephotot : Array.from(this.profileimage),
        resigndate: null
      };
      console.log(doctor)
      this.userservice.createdoctor("savedoctor",doctor).subscribe(
        (resposnes)=>{
           const doc : Doctor = resposnes
           const experiences : any[] = values.doc_experience;
           const educations : any[] = values.doc_education;
           console.log(experiences)
           experiences.map((exp)=>{
               const singlexperence : any = {
                field : exp.field,
                hospitalname : exp.hospital_name,
                years: exp.years,
                fromdate: exp.from_date,
                todate: exp.to_date,
                doctor: doc.doctorid
               }
               console.log(singlexperence)
               this.userservice.createexperience("saveexperience",singlexperence).subscribe(
                (response)=>{
                   console.log(response)
                },(error)=>{
                    console.log(error)
                }
               )
           })
           educations.map((edu)=>{
              const singleeducation : any ={
                degree : edu.degree,
                universityname:edu.university_name,
                fromdate: edu.from_date,
                todate: edu.to_date,
                doctor: doc.doctorid
              }
              this.userservice.createeducation("saveeducation",singleeducation).subscribe(
                (resposnes)=>{
                   console.log(resposnes)
                },(error)=>{
                  console.log(error)
                }
              )
           })
  
        },(error)=>{
          console.log(error)
        }
      )
    } else if(operations=='Update Doctor'){

    } else{

    }
  }


  



  isdoctorEditMode : boolean = false
  isSpecializationEditMode : boolean = false
  isFacilitesEditModel : boolean = false
  updatevalue : string = ''
  turneditmode(field : string){
    if(field=='Doctor'){
      this.isdoctorEditMode=true
      this.doctor.patchValue({
        doc_name : "jahahah",
        doc_about : "jsjsj",
        doc_email:"kdkd",
        doc_phone:8388383,
        doc_schedule:new Date(),
        doc_profile:[null],
      })
      this.addeducationparams("hshs","jshs",new Date(),new Date())
      this.addexperiencewithparams("hshs","jshs",3,new Date(),new Date())
    } else if(field=='Facilites'){
       this.isFacilitesEditModel=true
       this.facilitname = 'hhshshhs'
       this.facilitdescription = 'oapiwueeuh'
       this.facilityimages = []
    } else if(field=='Specialization'){
      this.isSpecializationEditMode=true
      this.specialization.patchValue({
        name : 'hhddh',
        description : 'kskskskskks',
      })
      this.addspeacilizationwithparams('jsjs','jsjshs',[])
    }
  }

  facilitname : string = ''
  facilitdescription : string = ''
  facilityimages : any[] = []

  submitform(event : Event,update : string){
  }
}
