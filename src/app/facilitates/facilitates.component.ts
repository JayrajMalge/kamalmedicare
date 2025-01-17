import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-facilitates',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './facilitates.component.html',
  styleUrl: './facilitates.component.css'
})
export class FacilitatesComponent {

}
