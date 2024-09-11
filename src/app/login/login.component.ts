import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usernameControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public passwordControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public loginForm = this.formBuilder.group({
    username: this.usernameControl,
    password: this.passwordControl
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    console.log('test');
  }

  onSubmit() {
    const username = this.usernameControl.value!;
    const password = this.passwordControl.value!;
    this.authService.login(username, password)
      .pipe(take(1))
      .subscribe(value => {
        if (!!value.token) {
          this.router.navigate(['/search']);
        }
      });
  }
}
