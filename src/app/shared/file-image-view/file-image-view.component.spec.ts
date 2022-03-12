import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileImageViewComponent } from './file-image-view.component';

describe('FileImageViewComponent', () => {
  let component: FileImageViewComponent;
  let fixture: ComponentFixture<FileImageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileImageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
