import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechuserComponent } from './edit-techuser.component';

describe('EditTechuserComponent', () => {
  let component: EditTechuserComponent;
  let fixture: ComponentFixture<EditTechuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTechuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTechuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
