import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomicSquareComponent } from './atomic-square.component';

describe('AtomicSquareComponent', () => {
  let component: AtomicSquareComponent;
  let fixture: ComponentFixture<AtomicSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtomicSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomicSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
