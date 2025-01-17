import { Component } from '@angular/core';
import { SpecializationComponent } from '../specialization/specialization.component';

@Component({
  selector: 'app-specializationbox',
  standalone: true,
  imports: [SpecializationComponent],
  templateUrl: './specializationbox.component.html',
  styleUrl: './specializationbox.component.css'
})
export class SpecializationboxComponent {

}
