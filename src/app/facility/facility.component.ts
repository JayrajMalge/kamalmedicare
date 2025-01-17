import { Component } from '@angular/core';
import { FacilitatesComponent } from '../facilitates/facilitates.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FacilityBoxComponent } from '../facility-box/facility-box.component';

@Component({
  selector: 'app-facility',
  standalone: true,
  imports: [FacilitatesComponent,HeaderComponent,FooterComponent,FacilityBoxComponent],
  templateUrl: './facility.component.html',
  styleUrl: './facility.component.css'
})
export class FacilityComponent {

}
