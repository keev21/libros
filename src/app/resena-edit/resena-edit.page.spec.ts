import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResenaEditPage } from './resena-edit.page';

describe('ResenaEditPage', () => {
  let component: ResenaEditPage;
  let fixture: ComponentFixture<ResenaEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
