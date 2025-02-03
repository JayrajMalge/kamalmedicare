import { Component, OnInit ,EventEmitter,Input,Output} from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Appointment, Doctor,User ,Section} from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appoinmentform',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './appoinmentform.component.html',
  styleUrl: './appoinmentform.component.css'
})
export class AppoinmentformComponent implements OnInit{
  constructor(private cookies : CookieService,private userservice : UserServiceService,private  router : Router){}
  doctorarray : Doctor[] =  []
  selecteddoctorid : number = 0
  email : string = ''
  user : User = new User()
  appointment : any = new Appointment()

  
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<string>();

  ngOnInit(): void {
    this.userservice.getdoctors("getdoctors").subscribe(
      (response)=>{
         this.doctorarray = response
      },(error)=>{}
    )
    this.email = this.cookies.get("kamal_medicare")
    const length = this.email.length;
    if(this.email!=null && length > 0){
      this.userservice.getuserbyemail("getbyemail",this.email).subscribe(
        (response)=>{
            this.user = response
        },(error)=>{}
      )
    }
    this.userservice.getsectionbysectionid("getsectionbysectionid",89).subscribe(
      (response)=>{
          this.appointmentsection = response
      },(error)=>{}
    )
  }


  closeDialog(){
    this.isOpen = false;
    this.close.emit();
  }

  spinner : boolean = false

  appointmentdate : string = ''
  submitapppointment(){
    console.log(this.selecteddoctorid)
    this.appointment.doctor = this.selecteddoctorid
    this.appointment.user = this.user.userid
    this.appointment.status = 'Scheduled'
    console.log(this.appointment)
    this.userservice.createnewappointment("saveappointment",this.appointment).subscribe(
      (response)=>{alert("Appointment Registered");this.closeDialog()},(error)=>{}
    )
  }
  appointmentsection : Section = new Section()

  oncontentchange(event : any){
      const data = event.target.innerHTML
      const s  = {
        sectionid : 89,
        heading : this.appointmentsection.heading,
        content : data
      }
      this.userservice.savesection("updatesection",s).subscribe(
        (response)=>{
          
        },(error)=>{}
      )
  }

  onheadingchange(event : any){
    const data = event.target.innerHTML
    const s  = {
      sectionid : 89,
      heading : data,
      content : this.appointmentsection.content
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
         
      },(error)=>{}
    )
}
}




