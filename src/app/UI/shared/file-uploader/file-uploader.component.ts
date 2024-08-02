import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css'
})
export class FileUploaderComponent {
  @Output() fileContent: EventEmitter<any> = new EventEmitter();
  /**
   * formatos aceptados, ejm_: .xlsx, .xls, .pdf, ...
   */
  @Input() accept!: string
  @Input() isNewFile!: boolean

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) {
    this.elementRef.nativeElement.addEventListener('click', () => {
      const input = this.document.createElement('input');
      input.type = 'file';
      input.accept = this.accept
      input.onchange = ev => {
        this.fileContent.next(ev);
      };
      input.click();
      input.remove();
    });
  }
}
