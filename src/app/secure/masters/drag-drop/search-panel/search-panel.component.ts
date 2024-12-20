import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'kanban-search-panel',
//  standalone: true,
//  imports: [],
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.scss',
  styles: [
    `
//  :host ::ng-deep .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label .search-text {
//   top: 12px !important;
// }

    .search-text {
  height: 30px; /* Align search panel height with dropdown and text */
  display: flex;
  align-items: center;
}
    `
  ]
})
export class KanbanSearchPanelComponent {
  @Output() searchChanged = new EventEmitter<{ [key: string]: any }>();
  searchData: { [key: string]: any } = {};

  // Function to update search terms dynamically
  updateSearchTerms(key: string, value: any) {
    this.searchData[key] = value;
    this.searchChanged.emit(this.searchData);  // Emit the updated search data
  }
}
