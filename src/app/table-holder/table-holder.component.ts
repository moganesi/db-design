import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TableComponent } from '../table/table.component';
import { TableRelationComponent } from '../table-relation/table-relation.component';

@Component({
  selector: 'app-table-holder',
  standalone: true,
  imports: [TableComponent, DragDropModule, TableRelationComponent],
  templateUrl: './table-holder.component.html',
  styleUrl: './table-holder.component.scss',
})
export class TableHolderComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  vcr!: ViewContainerRef;
  refTable!: ComponentRef<TableComponent>;
  refRelation!: ComponentRef<TableRelationComponent>;
  addTable() {
    this.refTable = this.vcr.createComponent(TableComponent);
    // this.refRelation = this.vcr.createComponent(TableRelationComponent);
  }
}
