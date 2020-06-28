import { Component } from '@angular/core';

import { AuthService } from '../../../auth.module/auth/common/auth.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  public userName: string;
  constructor(public authService: AuthService) {
    this.userName = localStorage.getItem('login');
  }

  logout() {
    this.authService.logout();
  }

}
