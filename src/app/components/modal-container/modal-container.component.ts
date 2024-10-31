import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

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
  @Output() submitEvent = new EventEmitter<void>();

  public triggerModalClose(reason: string) {
    this.closeModalEvent.emit(reason);
  }

  public triggerSubmit() {
    this.submitEvent.emit();
    this.triggerModalClose("Submit button");
  }
}
