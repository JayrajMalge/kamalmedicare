import { Component } from '@angular/core';
import { ReviewboxComponent } from "../reviewbox/reviewbox.component";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ ReviewboxComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

}
