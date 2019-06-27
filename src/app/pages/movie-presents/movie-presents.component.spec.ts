import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePresentsComponent } from './movie-presents.component';

describe('MoviePresentsComponent', () => {
  let component: MoviePresentsComponent;
  let fixture: ComponentFixture<MoviePresentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviePresentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePresentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
