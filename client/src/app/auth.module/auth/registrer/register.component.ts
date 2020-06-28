import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../common/auth.service';
import { LoginValidator } from '../common/loginValidator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'register-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public authSub: Subscription;
  constructor(
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public snack: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required, LoginValidator.restrictedNames]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), LoginValidator.restrictedNames]),
    });
  }

  onSubmit() {
    this.form.disable();
    const user = {
      login: this.form.value.login,
      password: this.form.value.password
    };

    this.authSub = this.auth.register(user).subscribe(
      () => { 
        this.router.navigate(['/login'], {
        queryParams: {
          registered: true
        }
      });
      this.snack.open('Пользователь создан', 'Регистрация', {
        duration: 2000,
      });
    },
      (error) => {
        this.form.enable();
        this.snack.open('Не удалось создать пользователя', 'Регистрация', {
          duration: 2000,
        });
      }
      
    );
  }

  ngOnDestroy() {
    if (this.authSub) {
    this.authSub.unsubscribe();
    }
  }

}
