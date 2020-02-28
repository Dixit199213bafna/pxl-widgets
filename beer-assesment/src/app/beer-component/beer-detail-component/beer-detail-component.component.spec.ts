import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDetailComponentComponent } from './beer-detail-component.component';

describe('BeerDetailComponentComponent', () => {
  let component: BeerDetailComponentComponent;
  let fixture: ComponentFixture<BeerDetailComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerDetailComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
