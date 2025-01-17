import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebClientService {
  
  TOKEN='';
  API_URL="http://localhost:5000/"
  constructor(private http:HttpClient) {}
  public get<T>(url:string)
  {
    return this.http.get<T>(this.API_URL+url,{headers:{TOKEN:this.TOKEN}});
  }

  public post<T,R>(url:string, data:T)
  {
    return this.http.post<R>(this.API_URL+url,data,{headers:{TOKEN:this.TOKEN}});
  }
}
