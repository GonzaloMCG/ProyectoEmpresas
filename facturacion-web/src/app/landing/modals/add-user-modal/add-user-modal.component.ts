import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../../message-handler/message.service';
import { CustomValidators } from '../../../validators/custom-validators';


@Component({
  selector: 'app-add-user-modal',
  templateUrl: 'add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})

export class AddUserModalComponent {

  public submitted = false;

  public addUserForm = this.formBuilder.group({
    username: ['', Validators.required],
    roles: ['User', Validators.required],
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
  private saving = false;

  constructor(public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
  }

  close() {
    this.dialogRef.close();
  }

  async submit() {
    this.submitted = true;
    if (this.addUserForm.invalid || this.saving) {
      return;
    }

    const formData = {
      ...this.addUserForm.value
    }

    var usuario = {
      username: formData.username,
      password: formData.password,
      roles: (formData.roles == 'Admin') ? ['Admin', 'User'] : ['User']
    }

    try {
      this.saving = true;
      const response = await this.userService.registerUser(usuario);
      this.messageService.showSuccess(response.message, 3000);
      this.dialogRef.close(true);
    } catch (error) {
      this.messageService.showError(error, 3000);
      if (error.status === 500) {
        this.dialogRef.close(false);
      }
    } finally {
      this.saving = false;
    }
  }

  get username() { return this.addUserForm.get('username'); }
  get password() { return this.addUserForm.get('password'); }
  get repeatPassword() { return this.addUserForm.get('repeatPassword'); }
}
