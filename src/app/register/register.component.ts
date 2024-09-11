import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public usernameControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public passwordControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public registerForm = this.formBuilder.group({
    username: this.usernameControl,
    password: this.passwordControl
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const username = this.usernameControl.value!;
    const password = this.passwordControl.value!;
    this.authService.register(username, password)
      .pipe(take(1))
      .subscribe(value => {
        if (value.success) {
          this.router.navigate(['/login']);
        }
      });
  }

}
