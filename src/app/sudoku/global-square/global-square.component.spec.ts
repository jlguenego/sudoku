import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSquareComponent } from './global-square.component';

describe('GlobalSquareComponent', () => {
  let component: GlobalSquareComponent;
  let fixture: ComponentFixture<GlobalSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
