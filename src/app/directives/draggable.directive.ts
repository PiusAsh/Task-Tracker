import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  exportAs: 'appDraggable',
})
export class DraggableDirective {
  @Input() dragData: any;

  constructor(private el: ElementRef) {}

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData('text/plain', JSON.stringify(this.dragData));
  }
}
