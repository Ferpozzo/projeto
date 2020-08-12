import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private api: LoginService,
    private router: Router
  ) { }
  form: FormGroup;
  user = [];
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  onSubmit(form) {
    console.log(form)
    if (form.valid == true) {
      this.api.login(form.value).subscribe(
        data => {
          this.router.navigate(['/home'],
            { queryParams: { 'id': data.user._id } })
        },
        error => {
          console.log(error.error)
        }
      )
    } else {
      console.log('Preencha os campos para fazer o login')
    }
  }
}

