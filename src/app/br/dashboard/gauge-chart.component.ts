import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit {

  @Input() data: any[] = [];

  constructor() { }

  ngOnInit() { }

}
