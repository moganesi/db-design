import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Column } from '../../DataModel/Column';

@Component({
  selector: 'app-table-relation',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './table-relation.component.html',
  styleUrl: './table-relation.component.scss',
})
export class TableRelationComponent {
  tableNameOne!: string;
  tableNameMany!: string;
  keyOfOne: Array<Column> = [];
  keyOfMany: Array<Column> = [];
}
