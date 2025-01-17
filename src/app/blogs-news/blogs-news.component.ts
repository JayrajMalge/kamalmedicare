import { Component } from '@angular/core';
import { BlogNewsBoxComponent } from '../blog-news-box/blog-news-box.component';

@Component({
  selector: 'app-blogs-news',
  standalone: true,
  imports: [BlogNewsBoxComponent],
  templateUrl: './blogs-news.component.html',
  styleUrl: './blogs-news.component.css'
})
export class BlogsNewsComponent {

}
