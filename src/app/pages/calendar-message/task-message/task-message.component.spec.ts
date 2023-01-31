import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMenssageComponent } from './task-message.component';

describe('SendComponent', () => {
  let component: TaskMenssageComponent;
  let fixture: ComponentFixture<TaskMenssageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskMenssageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMenssageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
