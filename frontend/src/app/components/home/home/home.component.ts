import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { Chart } from 'chart.js';
import { HomeService } from '../home.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: Observable<User>;
  user: Observable<User>;
  userId: any;
  @Output() uId = this.userId
  constructor(
    private api: HomeService,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.userId = queryParams['id']
      },
      error => {
        console.log(`Aconteceu um erro: ${error}`)
      }
    )
    this.getUser();
  }
  getAllUsers = () => {
    this.api.getAllUsers().subscribe(
      data => {
        this.users = data
        console.log(this.users)
      },
      error => {
        console.log(`Aconteceu um erro: ${error}`)
      }
    )
  };
  getUser = () => {
    this.api.getUser(this.userId).subscribe(
      data => {
        this.user = data
        console.log(data)
      },
      error => {
        console.log(`Aconteceu um erro: ${error}`)
      }
    )
  }
}
