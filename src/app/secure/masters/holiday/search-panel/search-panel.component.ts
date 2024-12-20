import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'holiday-search-panel',
  templateUrl: './search-panel.component.html',
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
export class HolidaySearchPanelComponent {
  @Output() searchChanged = new EventEmitter();
  searchData: { [key: string]: any } = {};
  searchKey = "name";

  updateSearchTerms(key: string, value) {
      this.searchData[key] = value;
      this.searchChanged.emit(this.searchData);
  }
}
