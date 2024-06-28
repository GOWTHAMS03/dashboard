import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogpermission',
  templateUrl: './dialogpermission.component.html',
  styleUrl: './dialogpermission.component.css'
})
export class DialogpermissionComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogpermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}