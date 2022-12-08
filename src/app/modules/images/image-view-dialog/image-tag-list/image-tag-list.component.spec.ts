import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTagListComponent } from './image-tag-list.component';

describe('ImageTagListComponent', () => {
  let component: ImageTagListComponent;
  let fixture: ComponentFixture<ImageTagListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTagListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
