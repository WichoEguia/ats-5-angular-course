import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
  @Input() tab: any;

  @Output() tabEvent = new EventEmitter<string>();

  public tabChangeEvent(tabId: string) {
    this.tabEvent.emit(tabId);
  }
}
