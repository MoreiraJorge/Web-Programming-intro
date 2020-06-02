import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExtuserComponent } from './edit-extuser.component';

describe('EditExtuserComponent', () => {
  let component: EditExtuserComponent;
  let fixture: ComponentFixture<EditExtuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExtuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExtuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
