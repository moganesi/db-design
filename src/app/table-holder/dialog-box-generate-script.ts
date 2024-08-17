import { Component, inject, Inject, model } from '@angular/core';
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
import { DialogData } from '../../DataModel/DialogData';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'cdk-dialog',
  templateUrl: 'dialog-script.html',
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
export class DialogBoxGeneratScript {
  constructor(private clipboard: Clipboard) {}
  readonly dialogRef = inject(MatDialogRef<DialogBoxGeneratScript>);
  // this comes from interface DialogData in models folder
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.animal);

  onCopy(): void {
    this.clipboard.copy(this.data.script);
    this.dialogRef.close();
  }
}
