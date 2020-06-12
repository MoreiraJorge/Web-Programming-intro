import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUploadFailComponent } from './popup-upload-fail.component';

describe('PopupUploadFailComponent', () => {
  let component: PopupUploadFailComponent;
  let fixture: ComponentFixture<PopupUploadFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupUploadFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUploadFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
