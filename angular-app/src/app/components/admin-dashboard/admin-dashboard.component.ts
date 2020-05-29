import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

import { Chart } from 'chart.js'
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass']
})
export class AdminDashboardComponent implements OnInit {

  @Input()
  user: User

  errors: String

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService, private AdminService: AdminService) { }

  ngOnInit(): void {
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

      mychart.canvas.parentNode.style.height = '500px';
      mychart.canvas.parentNode.style.width = '400px';
      
    })
  }

  seeProfile() {
    this.router.navigate(['/profile']);
  }

  logout(event): void {
    event.preventDefault()
    this.errors = ''
    this.sessionService.logout()
    this.router.navigate(['/login'])
  }

}
