import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibroEditPage } from './libro-edit.page';

describe('LibroEditPage', () => {
  let component: LibroEditPage;
  let fixture: ComponentFixture<LibroEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
