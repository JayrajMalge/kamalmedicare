import { Component } from '@angular/core';
import { DoctorBoxComponent } from '../doctor-box/doctor-box.component';

@Component({
  selector: 'app-doctorsbox',
  standalone: true,
  imports: [DoctorBoxComponent],
  templateUrl: './doctorsbox.component.html',
  styleUrl: './doctorsbox.component.css'
})
export class DoctorsboxComponent {

}
