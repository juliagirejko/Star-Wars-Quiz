import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isGuest: boolean = false

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private AuthService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
      let username = this.loginForm.controls.username.value;
      let password = this.loginForm.controls.password.value;
      console.log("username", username, "password", password)
      if(username && password)
        this.AuthService.login(username, password).subscribe(() => this.router.navigateByUrl("/home"));
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  logAsGuest(): void {
    this.AuthService.setAsGuest()
    this.router.navigateByUrl("/home");
  }
}
