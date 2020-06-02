import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTechuserComponent } from './list-techuser.component';

describe('ListTechuserComponent', () => {
  let component: ListTechuserComponent;
  let fixture: ComponentFixture<ListTechuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTechuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTechuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
