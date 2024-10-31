import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss'
})
export class ModalContainerComponent {
  @Input() modalTitle: string = "";

  @Output() closeModalEvent = new EventEmitter<string>();

  public triggerModalClose(reason: string) {
    console.log('Close Modal');
    this.closeModalEvent.emit(reason);
  }
}
