import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechuserComponent } from './add-techuser.component';

describe('AddTechuserComponent', () => {
  let component: AddTechuserComponent;
  let fixture: ComponentFixture<AddTechuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTechuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTechuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
