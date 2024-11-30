import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInsertComponent } from './report-insert.component';

describe('ReportInsertComponent', () => {
  let component: ReportInsertComponent;
  let fixture: ComponentFixture<ReportInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
