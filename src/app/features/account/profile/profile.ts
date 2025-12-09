import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  constructor( private authService: Auth, private router: Router ) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
