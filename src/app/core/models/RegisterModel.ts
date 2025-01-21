
export class RegisterModel {
    public Username?: string = '';
    public Email?: string = '';
    public Password?: string = '';
    public UserType: number = 0;
    public ConfirmPassword?: string = '';

}

export class ResetPasswordModel{
    public Email?: string = '';
    public Password?: string = '';
    public ConfirmPassword?: string = '';

}
