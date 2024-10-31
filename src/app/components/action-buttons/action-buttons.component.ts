import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss'
})
export class ActionButtonsComponent {
  @Input() floatButtons: boolean = false;
  @Input() postId: string = "";

  // @Output() edit = new EventEmitter<string>();
  @Output() deletePostEvent = new EventEmitter<void>();

  public triggerDeletePost() {
    this.deletePostEvent.emit();
  }
}
