import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {
  public  thNumber: number [] = [];
  public rowNumber: number [] = [];
  public  reserveGroup: FormGroup;
  public theRow: number;
  public theSeat: number;
  public clickedId: string = '';

  constructor(
    private  snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<HallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // here you can pass data to the dialog
      }

  ngOnInit() {
    this.thNumber.length = 5;
    this.rowNumber.length = 10;
    this.reserveGroup = new FormGroup({
      row: new FormControl('55'),
      seat: new FormControl('77')
    });
  }
  save(message) {
    this.matDialogRef.close(this.reserveGroup.value);
    this.snackBar.open(message, null, {duration: 3000});
  }

  close() {
    this.matDialogRef.close();
  }

  detectSeat(a, b, e) {
    console.log(this.theRow = a + 1, this.theSeat = b + 1);
    this.clickedId = e.path[0].id;
    document.getElementById(this.clickedId).style.background = 'red';
  }

}
