import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHolderComponent } from './table-holder.component';

describe('TableHolderComponent', () => {
  let component: TableHolderComponent;
  let fixture: ComponentFixture<TableHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
