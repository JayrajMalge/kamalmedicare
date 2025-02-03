import { Component,Input,Output,EventEmitter } from '@angular/core';
import { User } from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() isOpen: boolean = false;
  @Input() user: User = new User();
  @Output() close = new EventEmitter<void>();
  currentImageIndex: number = 0;
  constructor(private cookies : CookieService,private route : Router){}

  closeDialog() {
    this.isOpen = false;
    this.close.emit();
  }

  logout(){
    this.cookies.delete("kamal_medicare")
    this.closeDialog()
    this.route.navigate(['/'])
  }
}
