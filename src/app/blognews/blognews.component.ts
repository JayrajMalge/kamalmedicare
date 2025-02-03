import { Component ,Input} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { News } from '../enities';
import { NewsImage } from '../enities';
import { filehandle } from '../enities';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blognews',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './blognews.component.html',
  styleUrl: './blognews.component.css'
})
export class BlognewsComponent {
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private route : ActivatedRoute){}
  news : News = new News()
  newsimages : NewsImage[] = []
  filehandles : filehandle[] = []
  ngOnInit(): void {
    const newsid : number = Number(this.route.snapshot.paramMap.get("newsid"))
    this.userservice.getnewsbynewsid("getnewsbynewsid/"+newsid).subscribe(
      (response)=>{
         this.news = response
      },(error)=>{}
    )
    this.userservice.getnewsimages("getnewsimagesbynewsid/"+newsid).subscribe(
     (response)=>{
         this.newsimages = response
         this.newsimages.map((news)=>{
          this.filehandles.push(this.imageservice.bytetoimage(news.image,news.imagetype,news.imagename));
         })
     },(error)=>{}
    )
  }
}
