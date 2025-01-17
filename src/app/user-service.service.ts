import { Injectable } from '@angular/core';
import { WebClientService } from './web-client.service';
import { HttpParams } from '@angular/common/http';
import { Doctor, Education, Experience, Specialization, SubSpecialization, SubSpecializationimgvideo } from './enities';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  API_URL = "http://localhost:5000"
  constructor(private webclient:WebClientService) { }
  public loginwithgoogle(url:string){
    return this.webclient.get<any>(url);
  }

  public sendOTP(url : string,email : string){
     return this.webclient.get<any>(url+"/"+email)
  }

  public verfiyotp(url : string,otp : string,email : string){
    const loginData = new HttpParams()
      .set('email', email)
      .set('otp', otp)
    return this.webclient.post<typeof loginData,any>(url,loginData)
  }

  public getuserbyemail(url : string,email : string){
    return this.webclient.get<any>(url+"/"+email)
  }

  public createdoctor(url : string,data : any){
    return this.webclient.post<typeof Doctor,any>(url,data)
  }
  
  public createexperience(url : string,data : any){
    return this.webclient.post<typeof Experience,any>(url,data)
  }
  
  public createeducation(url : string,data : any){
    return this.webclient.post<typeof Education,any>(url,data)
  }

  public createspecialization(url : string,data : any){
    return this.webclient.post<typeof Specialization,any>(url,data)
  }

  public createsubspecialization(url : string,data : any){
    return this.webclient.post<typeof SubSpecialization,any>(url,data)
  }

  public createsubspecializationimgvid(url : string,data : any){
    return this.webclient.post<typeof SubSpecializationimgvideo,any>(url,data)
  }
}
