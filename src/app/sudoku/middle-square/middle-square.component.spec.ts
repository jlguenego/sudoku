import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleSquareComponent } from './middle-square.component';

describe('MiddleSquareComponent', () => {
  let component: MiddleSquareComponent;
  let fixture: ComponentFixture<MiddleSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
