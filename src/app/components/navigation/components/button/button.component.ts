import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'component-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input()
  buttonText: string;

  @Input()
  isActive: boolean;

  @Output()
  clickFromButtonToNavigation: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public handleButtonClick(event: MouseEvent) {
      this.clickFromButtonToNavigation.emit(event);
  }
}