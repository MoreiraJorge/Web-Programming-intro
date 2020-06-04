import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCovtestComponent } from './add-covtest.component';

describe('AddCovtestComponent', () => {
  let component: AddCovtestComponent;
  let fixture: ComponentFixture<AddCovtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCovtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCovtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
