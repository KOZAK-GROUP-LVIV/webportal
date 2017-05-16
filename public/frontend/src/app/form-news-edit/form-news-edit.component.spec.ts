import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewsEditComponent } from './form-news-edit.component';

describe('FormNewsEditComponent', () => {
  let component: FormNewsEditComponent;
  let fixture: ComponentFixture<FormNewsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
