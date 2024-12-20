import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureOfWorkComponent } from './nature-of-work.component';

describe('NatureOfWorkComponent', () => {
  let component: NatureOfWorkComponent;
  let fixture: ComponentFixture<NatureOfWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NatureOfWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NatureOfWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
