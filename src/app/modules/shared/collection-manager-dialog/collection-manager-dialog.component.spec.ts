import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionManagerDialogComponent } from './collection-manager-dialog.component';

describe('CollectionManagerDialogComponent', () => {
  let component: CollectionManagerDialogComponent;
  let fixture: ComponentFixture<CollectionManagerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionManagerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
