import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgDefaultComponent } from './msg-default.component';

describe('MsgDefaultComponent', () => {
  let component: MsgDefaultComponent;
  let fixture: ComponentFixture<MsgDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
