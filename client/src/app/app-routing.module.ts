import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.module/auth/common/auth.guard';
import { LoginComponent } from './auth.module/auth/login/login.component';
import { RegisterComponent } from './auth.module/auth/registrer/register.component';
import { AuthComponent } from './auth.module/auth/auth.component';
import { SideComponent } from './nav-module/side/side.component';
import { OlComponent } from './openlayer-module/ol/ol.component';
import { BasemapsComponent } from './basemaps-module/basemaps/basemaps.component';
import { NotFound } from './shared-module/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  {
    path: '', component: SideComponent, canActivate: [AuthGuard], children: [
      { path: 'map', component: OlComponent },
      { path: 'basemaps', component: BasemapsComponent },
    ]
  },
  { path: 'notFound', component: NotFound },
  { path: '**', redirectTo: '/notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
