import { Component } from '@angular/core';

import { AuthService } from './auth.module/auth/common/auth.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'client';
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    // Сохранение сессии при перезагрузке страницы
    const token = localStorage.getItem('auth-token');
    if (token !== null) {
      this.auth.setToken(token);
    }
  }
}
