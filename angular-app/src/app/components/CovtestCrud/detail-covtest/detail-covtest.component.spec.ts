import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCovtestComponent } from './detail-covtest.component';

describe('DetailCovtestComponent', () => {
  let component: DetailCovtestComponent;
  let fixture: ComponentFixture<DetailCovtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCovtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCovtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
