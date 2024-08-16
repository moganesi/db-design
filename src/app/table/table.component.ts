// import { foreignKey } from './../../DataModel/ForeignKey';
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
  EventEmitter,
  Inject,
  Output,
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
import { foreignKey } from '../../DataModel/ForeignKey';
import { DialogBoxAddColumns } from './dialog-box-edit-columns.component';
import { ObjectToPassToDialogBoxEditCol } from '../../DataModel/ObjectToPassToDialogBoxEditCol';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DragDropModule, FormsModule, DialogModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewChecked {
  removeForeignKey(fkey: foreignKey) {
    const index = this.foreignKeys.indexOf(fkey);
    this.foreignKeys.splice(index, 1);
  }
  @Output() removeTable = new EventEmitter<ComponentRef<TableComponent>>();
  refTable!: ComponentRef<TableComponent>;
  originalCopyOfColumns!: Array<Column>;
  tableName: string = 'New Table';
  foreignKeys: Array<foreignKey> = [];
  hasForeignKeys: boolean = this.foreignKeys.length > 0;
  columns: Array<Column> = [
    {
      columnId: 1,
      columnName: 'ID',
      columnType: 'int',
      columnLength: -1,
      primaryKey: true,
    },
  ];
  arrayToPassToDialogBoxEditCol: ObjectToPassToDialogBoxEditCol =
    new ObjectToPassToDialogBoxEditCol();

  emitEvent() {
    this.removeTable.emit(this.refTable);
  }

  generateScript(): string {
    let script: string = ` DROP TABLE ${this.tableName}; CREATE TABLE ${this.tableName} (`;
    let cols = this.columns.map((c) => {
      return c.columnLength == -1
        ? c.primaryKey == true
          ? `${c.columnName}  ${c.columnType} NOT NULL`
          : `${c.columnName} ${c.columnType}`
        : c.primaryKey == true
        ? `${c.columnName}  ${c.columnType} NOT NULL (${c.columnLength})`
        : `${c.columnName} ${c.columnType} (${c.columnLength})`;
    });
    let primKey = this.columns
      .filter((c) => c.primaryKey == true)
      .map((c) => {
        return c.columnName;
      });

    let frKeys = this.foreignKeys.reduce((result: any, currentValue: any) => {
      (result[currentValue['referencedTableName']] =
        result[currentValue['referencedTableName']] || []).push(
        currentValue.foreignKeyColumnName
      );
      return result;
    }, {});
    let frKeysStatememt = Object.keys(frKeys).map((key) => {
      return `CONSTRAINT FK_${key}_${this.tableName} FOREIGN KEY (  ${frKeys[
        key
      ].toString()}
        ) REFERENCES ${key}(${frKeys[key].toString()})`;
    });

    script =
      script +
      ` ${cols.toString()},CONSTRAINT PK_${
        this.tableName
      } PRIMARY KEY ( ${primKey.toString()} ),${frKeysStatememt});`;
    console.log(script);
    return script;
  }

  dragOver($event: Event) {
    $event.preventDefault();
    // console.log('dragOver', event);
  }

  drag(event: DragEvent) {
    // Add your drag logic here
    const primKey: Array<foreignKey> = this.columns
      .filter((c) => c.primaryKey == true)
      .map((c, index) => {
        return {
          foreignKeyId: index,
          foreignKeyColumnName: c.columnName,
          referencedTableName: this.tableName,
        };
      });
    console.log('Dragging started:', primKey);
    const col = JSON.stringify(primKey); //JSON.stringify(this.columns[0]);
    event.dataTransfer!.setData('key', col);
    // console.log('Dragging started:', event);
  }
  drop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('key');
    if (data) {
      //this.foreignKeys = [...JSON.parse(data)];
      //console.log('Drop', JSON.parse(data));
      this.foreignKeys = this.foreignKeys.concat(JSON.parse(data));
      console.log('Drop', this.foreignKeys);
    }
  }
  @ViewChild('table') table: ElementRef | undefined;

  ngAfterViewChecked() {
    let datas = this.table!.nativeElement.getBoundingClientRect();
    //console.log('datas = ', datas);
  }
  deleteTable() {
    if (this.table) {
      this.table!.nativeElement.remove();
      // this.refTable.destroy();
      this.emitEvent();
    }
  }

  constructor(public dialog: Dialog) {
    // this.originalCopyOfColumns = [...this.columns];
  }
  editTable(): void {
    this.originalCopyOfColumns = structuredClone(this.columns);
    this.arrayToPassToDialogBoxEditCol.tableName = this.tableName;
    this.arrayToPassToDialogBoxEditCol.columns = this.columns;
    console.log('editTable', this.arrayToPassToDialogBoxEditCol);

    const dialogRef = this.dialog.open<string>(DialogBoxAddColumns, {
      width: '250px',
      data: this.arrayToPassToDialogBoxEditCol,
    });

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result == 'cancelled') {
        this.columns = [...this.originalCopyOfColumns];
      } else if (result) {
        this.tableName = result;
      }
    });
  }
}
