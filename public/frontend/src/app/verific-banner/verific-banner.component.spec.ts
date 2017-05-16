import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificBannerComponent } from './verific-banner.component';

describe('VerificBannerComponent', () => {
  let component: VerificBannerComponent;
  let fixture: ComponentFixture<VerificBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
