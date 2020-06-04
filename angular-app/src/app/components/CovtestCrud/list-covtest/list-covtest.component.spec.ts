import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCovtestComponent } from './list-covtest.component';

describe('ListCovtestComponent', () => {
  let component: ListCovtestComponent;
  let fixture: ComponentFixture<ListCovtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCovtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCovtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
