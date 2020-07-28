import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  description: string;
  message: string;
  cancelBtnTxt: string;
  deleteBtnTxt: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.description = data.description;
      this.message = data.message;
    }
    if (data.buttonTxt) {
      this.cancelBtnTxt = data.buttonTxt.cancel;
      this.deleteBtnTxt = data.buttonTxt.ok;
    }
  }

  ngOnInit(): void {
  }

}
