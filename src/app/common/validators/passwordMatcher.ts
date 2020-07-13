import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export function PasswordMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
        const control = group.controls[controlName];
        const matchingControl = group.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
        return;
    };
}
