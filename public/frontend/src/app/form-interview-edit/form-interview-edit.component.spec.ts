import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInterviewEditComponent } from './form-interview-edit.component';

describe('FormInterviewEditComponent', () => {
  let component: FormInterviewEditComponent;
  let fixture: ComponentFixture<FormInterviewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInterviewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInterviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
