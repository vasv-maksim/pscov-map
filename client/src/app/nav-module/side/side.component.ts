import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
})
export class SideComponent {
  public links = [
    { title: 'Карта', route: '/map', icon: 'place' },
    { title: 'Базовые карты', route: '/basemaps', icon: 'layers' },
  ]
}
