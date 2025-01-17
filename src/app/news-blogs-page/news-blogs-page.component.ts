import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BlogNewsBoxComponent } from '../blog-news-box/blog-news-box.component';

@Component({
  selector: 'app-news-blogs-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,BlogNewsBoxComponent],
  templateUrl: './news-blogs-page.component.html',
  styleUrl: './news-blogs-page.component.css'
})
export class NewsBlogsPageComponent {

}
