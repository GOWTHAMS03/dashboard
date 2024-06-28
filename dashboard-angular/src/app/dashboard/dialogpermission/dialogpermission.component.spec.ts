import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpermissionComponent } from './dialogpermission.component';

describe('DialogpermissionComponent', () => {
  let component: DialogpermissionComponent;
  let fixture: ComponentFixture<DialogpermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogpermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
