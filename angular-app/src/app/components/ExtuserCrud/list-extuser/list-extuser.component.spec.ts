import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExtuserComponent } from './list-extuser.component';

describe('ListExtuserComponent', () => {
  let component: ListExtuserComponent;
  let fixture: ComponentFixture<ListExtuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExtuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExtuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
