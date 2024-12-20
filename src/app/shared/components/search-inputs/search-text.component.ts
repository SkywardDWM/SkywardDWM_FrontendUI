import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'search-text',
    template: `
    <mat-form-field appearance="outline" class="custom-search-field">
        <input matInput placeholder="{{placeHolder}}" [formControl]="searchBox">
    </mat-form-field>`,
    styles: [`
        .custom-search-field {
            height: 35px;
            width: 100%;
            display: flex;
            align-items: center;
        }

        input {
            font-size: 14px !important;
            padding: 8px !important;
        }

        /* Override focus color for the input field */
        ::ng-deep .mat-mdc-form-field.mat-focused .mat-mdc-text-field-wrapper {
            border-color: lightgrey !important;
        }

        ::ng-deep .mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
            background-color: lightgrey !important;
        }

        ::ng-deep .mat-mdc-form-field.mat-focused .mat-mdc-form-field-outline-thick {
            color: lightgrey !important;
        }

        /* Ensure the wrapper maintains height */
        ::ng-deep .mat-mdc-text-field-wrapper {
            height: 35px !important;
        }

        ::ng-deep .mat-mdc-form-field-flex {
            align-items: center !important;
            height: 100% !important;
        }
    `]
})
export class SearchTextComponent implements OnInit {
    searchBox: UntypedFormControl = new UntypedFormControl();

    @Input() placeHolder = "Search";
    @Output() textSearchEntered = new EventEmitter<string>();

    ngOnInit() {
        this.searchBox.valueChanges.pipe(debounceTime(300))
            .subscribe(value => this.textSearchEntered.emit(value));
    }
}
