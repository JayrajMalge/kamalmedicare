import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-blognews',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './blognews.component.html',
  styleUrl: './blognews.component.css'
})
export class BlognewsComponent {

}
