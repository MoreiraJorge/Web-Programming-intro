import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPassComponent } from './popup-pass.component';

describe('PopupPassComponent', () => {
  let component: PopupPassComponent;
  let fixture: ComponentFixture<PopupPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
