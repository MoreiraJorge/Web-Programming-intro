import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

import { Chart } from 'chart.js'
import { AdminService } from 'src/app/services/admin.service';
import { CovtestsService } from 'src/app/services/covtests.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass']
})
export class AdminDashboardComponent implements OnInit {

  @Input()
  user: User
  users: User[]
  
  nTests: number
  nInfected: number

  myDate: Date
  dateTests: number

  errors: String

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService, private AdminService: AdminService, private CovtestService: CovtestsService) { }

  ngOnInit(): void {
    this.createChart()
    this.countTests()
    this.countInfected()
  }
  
  createChart(){
    //create bar chart for tests per day 
    this.AdminService.dayTests().subscribe(res => {
      var ctx = document.getElementById('canvas');

      let dates = res['values'].map(res => res.date)
      let values = res['values'].map(res => res.totalEvents)

      var barChartData = {
        labels: dates,
        datasets: [{
          label: 'Nº de testes',
          barPercentage: 0.5,
          data: values,
          backgroundColor:
            'rgba(255, 99, 132, 0.2)'
        }]
      }

      var mychart = new Chart(ctx, {
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

      mychart.canvas.parentNode.style.height = '200px';
      mychart.canvas.parentNode.style.width = '400px';
    })//end of barchart config
  }

  countTests(){
    this.CovtestService.countTotalTests().subscribe((nTests) => {
      this.nTests = nTests;
    }, (err) => { console.log(err) })
  }

  countTestsOnDate(){
    this.CovtestService.countDayTests(this.myDate).subscribe((dateTests)=>{
      this.dateTests = dateTests;
    }, (err) => { console.log(err) })
  }

  countInfected(){
    this.CovtestService.countTotalInfected().subscribe((nInfected)=>{
      this.nInfected = nInfected;
    }, (err) => { console.log(err) })
  }

  
  seeProfile() {
    console.log(this.user)
    this.router.navigate(['/myProfile']);
  }

  TechManagement() {
    this.router.navigate(['/usrMng']);
  }

  logout(event): void {
    event.preventDefault()
    this.errors = ''
    this.sessionService.logout()
    this.router.navigate(['/login'])
  }

}
