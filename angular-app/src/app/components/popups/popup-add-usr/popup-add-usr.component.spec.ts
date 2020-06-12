import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddUsrComponent } from './popup-add-usr.component';

describe('PopupAddUsrComponent', () => {
  let component: PopupAddUsrComponent;
  let fixture: ComponentFixture<PopupAddUsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAddUsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
