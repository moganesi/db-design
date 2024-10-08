import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Column } from '../../DataModel/Column';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ObjectToPassToDialogBoxEditCol } from '../../DataModel/ObjectToPassToDialogBoxEditCol';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

class DatabaseDatatype {
  typeId!: string;
  typeName!: string;
}

@Component({
  selector: 'cdk-dialog',
  templateUrl: 'dialog.html',
  // style: 'cdk-dialog-overview-example-dialog.css',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogBoxAddColumns {
  databaseDatatypes = ['int', 'varchar'];

  removeColumn(col: Column) {
    const index = this.columns.indexOf(col);
    this.columns.splice(index, 1);
  }
  tableName!: string;
  columns!: Array<Column>;
  addColumns() {
    const maxColId =
      Math.max(...this.columns.map((c: Column) => c.columnId)) + 1;
    console.log(maxColId);

    this.columns.push({
      columnId: maxColId,
      columnName: '',
      columnType: '',
      columnLength: 0,
      primaryKey: false,
    });
    console.log(this.columns);
  }
  saveTable(): void {
    this.dialogRef.close(this.tableName);
  }
  cancelChanges() {
    this.dialogRef.close('cancelled');
  }
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: ObjectToPassToDialogBoxEditCol
  ) {
    this.tableName = data.tableName;
    this.columns = data.columns;
  }
}
