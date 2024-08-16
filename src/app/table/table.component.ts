import {
  CdkDragDrop,
  DragDropModule,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  AfterViewChecked,
  Component,
  ComponentRef,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { Column } from '../../DataModel/Column';
import { DialogBoxAddColumns } from './dialog-box-edit-columns.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DragDropModule, FormsModule, DialogModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewChecked {
  drop($event: CdkDragDrop<any, any, any>) {
    transferArrayItem(
      $event.previousContainer.data,
      $event.container.data,
      $event.previousIndex,
      $event.currentIndex
    );
    console.log($event.previousContainer.data);
    console.log($event.container.data);
    console.log($event.previousIndex);
    console.log($event.currentIndex);
    console.log(this.columns);
  }
  @ViewChild('table') table: ElementRef | undefined;

  ngAfterViewChecked() {
    let datas = this.table!.nativeElement.getBoundingClientRect();
    //console.log('datas = ', datas);
  }
  deleteTable() {
    if (this.table) {
      this.table!.nativeElement.remove();
    }
  }

  originalCopyOfColumns!: Array<Column>;

  constructor(public dialog: Dialog) {
    // this.originalCopyOfColumns = [...this.columns];
  }
  editColumns(): void {
    this.originalCopyOfColumns = structuredClone(this.columns);

    const dialogRef = this.dialog.open<string>(DialogBoxAddColumns, {
      width: '250px',
      data: this.columns,
    });

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result == 'cancelled') {
        this.columns = [...this.originalCopyOfColumns];
      }
    });
  }
  tableName: string = 'Test Table';
  columns: Array<Column> = [
    {
      columnId: 1,
      columnName: 'Test Column',
      columnType: 'test',
      columnLength: 1,
    },
    {
      columnId: 2,
      columnName: 'Test Column2',
      columnType: 'test2',
      columnLength: 5,
    },
  ];
}
