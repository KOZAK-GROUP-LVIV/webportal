import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProfileEditComponent } from './form-profile-edit.component';

describe('FormProfileEditComponent', () => {
  let component: FormProfileEditComponent;
  let fixture: ComponentFixture<FormProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
