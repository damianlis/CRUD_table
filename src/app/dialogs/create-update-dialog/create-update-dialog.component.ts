import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.scss']
})
export class CreateUpdateDialogComponent implements OnInit {

  readonly userRoles = ['admin', 'moderator', 'user'];
  description: string;
  cancelBtnTxt: string;
  saveBtnTxt: string;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder
  ) {
    this.createForm();
    if (data) {
      this.description = data.description;
    }
    if (data.buttonTxt) {
      this.cancelBtnTxt = data.buttonTxt.cancel;
      this.saveBtnTxt = data.buttonTxt.ok;
    }
    if (data.user) {
      this.form.patchValue(data.user);
    }
  }

  ngOnInit(): void {
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ]
      ],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      role: ['', Validators.required],
      registrationDate: [new Date(), Validators.required],
      enabled: [false]
    });
  }

}
