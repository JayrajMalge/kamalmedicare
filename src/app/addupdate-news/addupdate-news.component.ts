import { Component ,Input, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../image/image.component';
import { News } from '../enities';

@Component({
  selector: 'app-addupdate-news',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './addupdate-news.component.html',
  styleUrl: './addupdate-news.component.css'
})
export class AddupdateNewsComponent implements OnInit{
   
  @Input() operation : string = '';
  spinner : boolean = true;

  updatevalue : number = 0
  news : News[] = []
  selectednews : News = new News()
  constructor(private userservice : UserServiceService,private router : Router){}
  ngOnInit(): void {
    this.userservice.getnews("getnews").subscribe(
      (response)=>{this.news = response;console.log(this.news)},(error)=>{}
    )
  }
  newsname : string = ''
  newsdescription : string = ''
  newsimages : any[] = []
  newsdate : Date = new Date()
  newsimagesinput(event: any): void {
    const files = event.target.files;
    if (files && files.length > 1) {
      this.newsimages = Array.from(files)
    }
  }
  newssubmitform(operation : string){
    const news : any = {
      title : this.newsname,
      description : this.newsdescription,
      newsdate : this.newsdate
    }
    this.userservice.createnews("savednews",news).subscribe(
      (response)=>{
          const storednews = response
          const image = new FormData()
          image.append("news",storednews.newsid)
          this.newsimages.map((img)=>{
            image.append("images",img);
            image.append("imagename",img.name);
            image.append("imagetype",img.type);
          })
          this.userservice.createnewsimage("savednewsimages",image).subscribe(
            (response)=>{
              alert("News Created Sucessfully")
              this.router.navigateByUrl("/update-page",{skipLocationChange : true}).then(()=>{
                this.router.navigate([this.router.url])
              })
            },(error)=>{
            }
          )
      },(error)=>{
          console.log(error)
      }
    )
  }

  selecttodelete(){
    const ne = this.news.filter((no)=>{
      return no.newsid == this.updatevalue
    })
    this.selectednews = ne[0]
    this.operation = "Confirm Deletion"
  }
  confirmselecttodelete(){  
      this.userservice.deletenews("deletenews/"+this.updatevalue).subscribe(
        (response)=>{alert("News Deleted Sucessfully")},(error)=>{}
      )
  }
}
