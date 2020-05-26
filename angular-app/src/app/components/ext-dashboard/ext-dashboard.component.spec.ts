import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtDashboardComponent } from './ext-dashboard.component';

describe('ExtDashboardComponent', () => {
  let component: ExtDashboardComponent;
  let fixture: ComponentFixture<ExtDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
