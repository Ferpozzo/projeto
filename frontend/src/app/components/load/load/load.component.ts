import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {
  count2$: Observable<number>
  constructor(
    private store: Store<{ count: number }>
  ) { }

  ngOnInit(): void {
    this.count2$ = this.store.pipe(select('count'))
  }

}
