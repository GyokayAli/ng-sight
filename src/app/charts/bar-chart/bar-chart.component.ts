import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private _salesDataService: SalesDataService) { }

  orders: any;
  orderLabels: string[];
  orderData: number[];

  public barChartData: any[];
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  ngOnInit() {
    this._salesDataService.getOrders(1, 100)
      .subscribe(res => {

        const localChartData = this.getChartData(res);
        this.barChartLabels = localChartData.map(x => x[0]).reverse();
        this.barChartData = [{ data: localChartData.map(x => x[1]), label: 'Sales' }];
      });
  }

  getChartData(res: Response) {
    this.orders = res['page']['data'];
    const data = this.orders.map(o => o.total);

    const formattedOrders = this.orders.reduce((r, e) => {
      r.push([moment(e.placed).format('DD-MM-YYYY'), e.total]);
      return r;
    }, []);

    const temp = [];

    const chartData = formattedOrders.reduce((r, e) => {
      const key = e[0];
      if (!temp[key]) {
        temp[key] = e;
        r.push(temp[key]);
      } else {
        temp[key][1] += e[1]; // add up the order total
      }
      return r;
    }, []);

    return chartData;
  }
}
