import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { Chart } from 'chart.js';
import { HomeService } from '../home.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChartModel } from 'src/app/models/chart';
import { Store, select } from '@ngrx/store';
import { increment, decrement, reset } from 'src/app/actions/chart.actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  charts: ChartModel
  users: User
  user: User
  userId: any
  count$: Observable<number>
  user$: Observable<User>
  @Output() uCharts = this.charts
  constructor(
    private api: HomeService,
    private route: ActivatedRoute,
    private store: Store<{ count: number }>,
    private userStore: Store<{ user: User }>) {
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
    //this.getUser();
    //this.getUserObjects();
    this.count$ = this.store.pipe(select('count'));
    this.user$ = this.userStore.pipe(select('user'));
  }
  getUser = () => {
    this.api.getUser(this.userId).subscribe(
      data => {
        this.user = data
      },
      error => {
        console.log(`Aconteceu um erro: ${error}`)
      }
    )
  }
  getUserObjects = () => {
    this.api.getUserObjects(this.userId).subscribe(
      data => {
        this.charts = data.objects
      },
      error => {
        console.log(`Aconteceu um erro: ${error.message}`)
      }
    )
  }
  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}