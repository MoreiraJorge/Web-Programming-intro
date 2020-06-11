import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Chart } from 'chart.js'
import { AdminService } from 'src/app/services/admin.service';
import { CovtestsService } from 'src/app/services/covtests.service';
import { ExtUserService } from 'src/app/services/ext-user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass']
})
export class AdminDashboardComponent implements OnInit {

  @Input()
  user: User
  users: User[]
  externals: User[]

  nTests: number
  nInfected: number
  notInfected: number

  userCode: string
  nTestsUser: number

  myDate: Date
  dateTests: number

  firstDate: string
  secondDate: string

  errors: String
  mychart;
  MySecondChart;
  array;

  displayedColumns: string[] = ['ID', 'Nome'];

  constructor(private router: Router, 
    private sessionService: SessionService, 
    private AdminService: AdminService, 
    private CovtestService: CovtestsService,
    private ExternalService: ExtUserService) { }

  ngOnInit(): void {
    this.countTests()
    this.createChart()
    this.secondChart()
    this.getExternalList()
  }

  createChart() {
    //create bar chart for tests per day 
    this.AdminService.dayTests().subscribe(res => {
      this.array = res.values
      var ctx = document.getElementById('canvas');

      let dates = res['values'].map(res => {
        if(res.date != undefined){
          return res.date
        } else {
          return "Não agendados"
        }
      })
      let values = res['values'].map(res => res.totalEvents)

      var barChartData = {
        labels: dates,
        datasets: [{
          label: 'Nº de testes',
          barPercentage: 0.5,
          data: values,
          backgroundColor:
            '#0070FF'
        }]
      }

      this.mychart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          responsive: true,
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Nº de testes por dia'
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }]
          }
        }
      });

      this.mychart.canvas.parentNode.style.height = '300px';
      this.mychart.canvas.parentNode.style.width = '600px';
    })//end of barchart config
  }

  secondChart() {
    this.CovtestService.countNotInfected().subscribe(notInfected => {
      this.CovtestService.countTotalInfected().subscribe(nInfected => {
        this.nInfected = nInfected;
        this.notInfected = notInfected;

        var ctx = document.getElementById('canvas2');

        let Mylabels = []

        var horizontalBarChartData = {
          labels: Mylabels,
          datasets: [{
            label: 'Infetados',
            borderWidth: 1,
            data: [this.nInfected],
            backgroundColor:
              '#FF0000'
          }, {
            label: 'Curados',
            borderWidth: 1,
            data: [this.notInfected],
            backgroundColor:
              '#0FFF00'
          }]
        }

        this.MySecondChart = new Chart(ctx, {
          type: 'horizontalBar',
          data: horizontalBarChartData,
          options: {
            elements: {
              rectangle: {
                borderWidth: 2,
              }
            },
            responsive: true,
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Comparação Infetados - Curados'
            },
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true,
                  stepSize: 1
                }
              }]
            }
          }
        });

        this.MySecondChart.canvas.parentNode.style.height = '300px';
        this.MySecondChart.canvas.parentNode.style.width = '600px';

      }, (err) => { console.log(err) })

    })

  }

  result() {
    this.createChart()
  }

  countTests() {
    this.CovtestService.countTotalTests().subscribe((nTests) => {
      this.nTests = nTests;
    }, (err) => { console.log(err) })
  }


  seeProfile() {
    console.log(this.user)
    this.router.navigate(['/myProfile']);
  }

  TechManagement() {
    this.router.navigate(['/usrMng']);
  }

  logout(): void {
    event.preventDefault()
    this.errors = ''
    this.sessionService.logout()
    this.router.navigate(['/login'])
  }

  nTestsOfPerson(id: string) {
    this.CovtestService.nTestPerExtID(id).subscribe((result) => {
      this.nTestsUser = result
    })
  }

  chartDateFilter() {

    console.log(this.firstDate)
    console.log(this.secondDate)

    var val = this.firstDate
    if (val == undefined) {
      val = this.array[0].date
    }

    var index1 = this.array.findIndex(function (item, i) {
      return item.date === val
    });

    var val2 = this.secondDate
    if (val2 == undefined) {
      val2 = this.array[this.array.length - 1].date
    }

    var index2 = this.array.findIndex(function (item, i) {
      return item.date === val2
    });

    if (index1 == -1 || index2 == -1) {
      console.log('data inválida')
      return;
    }


    if (index1 > index2) {
      let result = this.array.slice(parseInt(index2), parseInt(index1) + 1);
      let dates = result.map(res => res.date)
      let values = result.map(res => res.totalEvents)

      var newData = {
        labels: dates,
        datasets: [{
          label: 'Nº de testes',
          barPercentage: 0.5,
          data: values,
          backgroundColor:
            '#0070FF'
        }]
      }

      this.mychart.data = newData

    } else {
      let result = this.array.slice(parseInt(index1), parseInt(index2) + 1);
      let dates = result.map(res => res.date)
      let values = result.map(res => res.totalEvents)

      var newData = {
        labels: dates,
        datasets: [{
          label: 'Nº de testes',
          barPercentage: 0.5,
          data: values,
          backgroundColor:
            '#0070FF'
        }]
      }

      this.mychart.data = newData
    }
    this.mychart.update();
  }

  getExternalList(){
    this.ExternalService.getExternals().subscribe((externals) => {
      this.externals = externals
    })
  }

  reset() {
    this.mychart.destroy();
    this.createChart()
    this.firstDate = ""
    this.secondDate = ""
  }

}
