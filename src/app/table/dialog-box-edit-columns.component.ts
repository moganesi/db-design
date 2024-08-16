import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Column } from '../../DataModel/Column';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'cdk-dialog',
  templateUrl: 'dialog.html',
  // style: 'cdk-dialog-overview-example-dialog.css',
  standalone: true,
  imports: [FormsModule],
})
export class DialogBoxAddColumns {
  removeColumn(col: Column) {
    const index = this.columns.indexOf(col);
    this.columns.splice(index, 1);
  }
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
    });
    console.log(this.columns);
  }
  saveTable(): void {
    this.dialogRef.close();
  }
  cancelChanges() {
    this.dialogRef.close('cancelled');
  }
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: Array<Column>
  ) {
    this.columns = data;
  }
}
