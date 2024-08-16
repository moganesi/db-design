import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRelationComponent } from './table-relation.component';

describe('TableRelationComponent', () => {
  let component: TableRelationComponent;
  let fixture: ComponentFixture<TableRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRelationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
