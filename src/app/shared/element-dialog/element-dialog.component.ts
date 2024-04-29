import { Component, OnInit, Inject } from '@angular/core';
import { PeriodicElement } from '../../models/PeriodicElement';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrl: './element-dialog.component.scss'
})
export class ElementDialogComponent implements OnInit{
  element!: PeriodicElement;
  isChange!: boolean;

  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
  ) {}
  ngOnInit(): void {
    if (this.data.codigo != null){
      this.isChange = true;
    } else {
      this.isChange = false;
    }

  }

  onCancel(): void {
    this.dialogRef.close();
  }
}



