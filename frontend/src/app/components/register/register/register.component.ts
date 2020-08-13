import { RegisterService } from './../register.service';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Store, select } from '@ngrx/store';
import { createUserSuccess } from 'src/app/actions/user.actions';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private api: RegisterService,
    private formBuilder: FormBuilder,
    private store: Store<{ user: User }>,
    private route: Router
  ) { }

  form: FormGroup;
  user: User;
  user$: Observable<User>;
  allUsers: User;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]]
    })
  }
  onSubmit(form) {
    if (form.valid == true) {
      if (form.value.password == form.value.passwordConfirm) {
        this.api.registerUser(form.value).subscribe(
          data => {
            this.user = data
            this.store.dispatch(createUserSuccess({ user: this.user }))
            this.user$ = this.store.pipe(select('user'))
            this.route.navigate(['/home'])
          },
          error => {
            console.log(error.error)
          }
        )
      } else {
        console.log('Senhas diferentes')
      }
    } else {
      console.log('Preencha todos os campos')
    }
  }
  getUsers = () => {
    this.api.getAllUsers().subscribe(
      data => {
        this.allUsers = data;
      },
      error => {
        console.log('Aconteceu um erro! ' + error.error)
      }
    )
  }
}
