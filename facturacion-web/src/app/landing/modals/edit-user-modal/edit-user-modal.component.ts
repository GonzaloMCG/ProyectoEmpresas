import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from '../../../message-handler/message.service';
import { CustomValidators } from '../../../validators/custom-validators';


@Component({
  selector: 'app-edit-user-modal',
  templateUrl: 'edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})

export class UserEditModalComponent {

  public editUserForm = this.formBuilder.group({
    username: [{ value: '', disabled: true }, Validators.required],
    roles: ['', Validators.required],
    password: ['', Validators.compose([
      Validators.required,
      // check whether the entered password has a number
      CustomValidators.patternValidator(/\d/, {
        hasNumber: true
      }),
      // check whether the entered password has upper case letter
      CustomValidators.patternValidator(/[A-Z]/, {
        hasCapitalCase: true
      }),
      // check whether the entered password has a lower case letter
      CustomValidators.patternValidator(/[a-z]/, {
        hasSmallCase: true
      }),
      // check whether the entered password has a special character
      /*CustomValidators.patternValidator(
        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        {
          hasSpecialCharacters: true
        }
      ),*/
      Validators.minLength(8)
    ])],
    repeatPassword: ['', Validators.compose([Validators.required])],
  }, {
    validators: [CustomValidators.passwordMatchValidator]
  });

  constructor(public dialogRef: MatDialogRef<UserEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.editUserForm.controls.username.setValue(this.data.user.username);
    //this.editUserForm.controls.roles.setValue(this.data.user.roles);
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    const formData = {
      ...this.editUserForm.value
    }
    var usuario = {
      password: formData.password,
      roles: (formData.roles == 'Admin') ? ['Admin', 'User'] : ['User']
    }
    this.userService.manageRoles({ username: this.data.user.username, roles: usuario.roles }).subscribe(
      response => {
        if (usuario.password) {
          this.userService.resetPassword({ username: this.data.user.username, password: usuario.password }).subscribe(
            response => {
              this.messageService.showSuccess(response.message, 3000);
              this.dialogRef.close(true);
            },
            error => {
              this.messageService.showError(error, 3000);
            }
          );
        }
        else {
          this.messageService.showSuccess(response.message, 3000);
          this.dialogRef.close(true);
        }
      },
      error => {
        this.messageService.showError(error, 3000);
      }
    );
  }

  get username() { return this.editUserForm.get('username'); }
  get password() { return this.editUserForm.get('password'); }
  get repeatPassword() { return this.editUserForm.get('repeatPassword'); }
}
