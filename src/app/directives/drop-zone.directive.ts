import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]',
})
export class DropZoneDirective {
  @Input() zone!: number;
  @Output() dropped = new EventEmitter<{ taskId: number; newStatus: string }>();

  constructor(private el: ElementRef) {}

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.classList.add('bg-primary');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.classList.remove('bg-primary');
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.classList.remove('bg-primary');

    const data = JSON.parse(event.dataTransfer?.getData('text/plain') || '');
    this.dropped.emit({ taskId: data.id, newStatus: this.getStatusByZone(this.zone) });
  }

  private getStatusByZone(zone: number): string {
    switch (zone) {
      case 0:
        return 'Open';
      case 1:
        return 'Pending';
      case 2:
        return 'In Progress';
      case 3:
        return 'Completed';
      default:
        return 'Open';
    }
  }
}
