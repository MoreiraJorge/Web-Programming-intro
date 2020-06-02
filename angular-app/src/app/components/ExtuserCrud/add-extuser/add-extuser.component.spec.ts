import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtuserComponent } from './add-extuser.component';

describe('AddExtuserComponent', () => {
  let component: AddExtuserComponent;
  let fixture: ComponentFixture<AddExtuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExtuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExtuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
