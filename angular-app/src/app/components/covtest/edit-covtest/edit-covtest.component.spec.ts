import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCovtestComponent } from './edit-covtest.component';

describe('EditCovtestComponent', () => {
  let component: EditCovtestComponent;
  let fixture: ComponentFixture<EditCovtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCovtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCovtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
