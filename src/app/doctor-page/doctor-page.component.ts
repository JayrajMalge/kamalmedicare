import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './doctor-page.component.html',
  styleUrl: './doctor-page.component.css'
})
export class DoctorPageComponent {
  tabs = [
    { label: 'Experenice', content : ''},
    { label: 'Education', content: '' },
    { label: 'Treatment', content: '' },
  ];

  activeTab = 0;

  selectTab(index: number): void {
    this.activeTab = index;
  }
}
