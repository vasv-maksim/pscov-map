import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../common/auth.service';
import { LoginValidator } from '../common/loginValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public authSub: Subscription;
  constructor(
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public snack: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('guest', [Validators.required, LoginValidator.restrictedNames]),
      password: new FormControl('password', [Validators.required, Validators.minLength(6), LoginValidator.restrictedNames]),
    });

    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['registered']) {
          this.snack.open('Войдите используя данные регистрации', 'Логин', {
            duration: 2000,
          });
        } else if (params['accessDenied']) {
          
        } else if (params['sessionExpire']) {
          this.snack.open('Пожалуйста перелогиньтесь', 'Логин', {
            duration: 2000,
          });
        }
      }
    );
  }

  onSubmit() {
    this.form.disable();
    const user = {
      login: this.form.value.login,
      password: this.form.value.password
    };

    this.authSub = this.auth.login(user).subscribe(
      () => {
        this.router.navigate(['/map'])
        this.snack.open('Вход выполнен', 'Логин', {
          duration: 2000,
        });
    },
      (error) => {
        this.form.enable();
        this.snack.open('Некорректная пара логин/пароль', 'Логин', {
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
