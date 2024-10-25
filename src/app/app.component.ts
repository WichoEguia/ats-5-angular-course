import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './sections/navigation/navigation.component';
import { NavItemComponent } from './sections/nav-item/nav-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, NavItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'Travel App';
  public navigation = [
    {
      name: "Places",
      path: "/",
      isActive: true,
      isDisabled: false
    },
    {
      name: "Fictional places",
      path: "/",
      isActive: false,
      isDisabled: false
    },
    {
      name: "Lifestyle",
      path: "/",
      isActive: false,
      isDisabled: false
    },
    {
      name: "Hidden knowledge",
      path: "/",
      isActive: false,
      isDisabled: true
    },
  ]
}
