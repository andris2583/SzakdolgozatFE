import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMasonryListComponent } from './image-masonry-list.component';

describe('ImageMasonryListComponent', () => {
  let component: ImageMasonryListComponent;
  let fixture: ComponentFixture<ImageMasonryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageMasonryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageMasonryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
