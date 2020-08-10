import { RegisterService } from './../register.service';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private api: RegisterService,
    private formBuilder: FormBuilder
  ) { }

  form: FormGroup;
  user = [];
  allUsers = [];
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['',[Validators.required]]
    })
  }
  onSubmit(form) {
    if (form.valid == true) {
      this.api.registerUser(form.value).subscribe(
        data => {
          this.user = data
        },
        error => {
          console.log(error.error)
        }
      )
    } else {
      console.log('Invalido')
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
