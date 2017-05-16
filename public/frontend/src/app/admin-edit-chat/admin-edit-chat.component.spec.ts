import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditChatComponent } from './admin-edit-chat.component';

describe('AdminEditChatComponent', () => {
  let component: AdminEditChatComponent;
  let fixture: ComponentFixture<AdminEditChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
