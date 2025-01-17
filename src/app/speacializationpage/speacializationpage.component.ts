import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SpeacializationpagefullComponent } from '../speacializationpagefull/speacializationpagefull.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-speacializationpage',
  standalone: true,
  imports: [HeaderComponent,SpeacializationpagefullComponent,FooterComponent],
  templateUrl: './speacializationpage.component.html',
  styleUrl: './speacializationpage.component.css'
})
export class SpeacializationpageComponent {

}
