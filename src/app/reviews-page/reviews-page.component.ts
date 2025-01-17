import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ReviewboxComponent } from '../reviewbox/reviewbox.component';

@Component({
  selector: 'app-reviews-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReviewboxComponent],
  templateUrl: './reviews-page.component.html',
  styleUrl: './reviews-page.component.css'
})
export class ReviewsPageComponent {

}
