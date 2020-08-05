import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise06Component } from './exercise06.component';

describe('Exercise06Component', () => {
  let component: Exercise06Component;
  let fixture: ComponentFixture<Exercise06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
