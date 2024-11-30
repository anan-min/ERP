import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInsertComponent } from './order-insert.component';

describe('OrderInsertComponent', () => {
  let component: OrderInsertComponent;
  let fixture: ComponentFixture<OrderInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
