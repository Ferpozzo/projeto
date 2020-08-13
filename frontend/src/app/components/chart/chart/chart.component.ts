import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js'
import { ChartService } from '../chart.service';
import { ChartModel } from 'src/app/models/chart';
import { increment, decrement } from 'src/app/actions/chart.actions';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { counterReducer } from '../../../reducers/chart.reducer'
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild("chart", { static: true }) element: ElementRef
  @Input() uCharts: ChartModel[]
  chart: any;
  chartType = 'bar'
  count2$: Observable<number>
  constructor(
    private api: ChartService,
    private store: Store<{ count: number }>
  ) {

  }

  ngOnInit(): void {
    //this.createChart()
    this.count2$ = this.store.pipe(select('count'));
    console.log(this.count2$)
  }
  /* createChart() {
    console.log(this.uCharts.length)
    for (let i = 0; i <= this.uCharts.length; i++) {
      this.chart = new Chart(this.element.nativeElement, {
        type: this.uCharts[i].Objects.type,
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    } 

  }
  changeChart() {
    this.chart.destroy();
    this.chart = new Chart(this.element.nativeElement, {
      type: this.chartType,
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }*/
}