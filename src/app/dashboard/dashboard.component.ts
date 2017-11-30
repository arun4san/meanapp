import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import * as c3 from 'c3';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	chart:any;
  selectedDataArr:any[] = [];
  xAxisData:string[] = ['x'];
  yAxisData:any[] = ['data1'];
  gameInfos:any;
   displayedColumns = ['position', 'username', 'game', 'difficultLevel', 'score'];//'startTime', 'startTime' 
  dataSource: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService:ApiService, private router:Router) { 
     this.apiService.getFilteredObject('/api/getFilteredObject',{"query": {},"collection":"games-info"}).subscribe(gameInfos => {
      this.gameInfos = gameInfos;
      this.dataSource = new MatTableDataSource(this.gameInfos);
       this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }); 
  }

  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
 
  ngOnInit() {}

  getSelecteData(selectedData:any){
    this.selectedDataArr.push(selectedData);
  }

  selectXAxis(xAxis){
    if(this.selectedDataArr.length == 0){
      alert('Please select table value')
    }

    for(var selectedData of this.selectedDataArr){
      if(xAxis == 'username'){
        this.xAxisData.push(selectedData.username);        
      }else if(xAxis == 'game'){
        this.xAxisData.push(selectedData.game);
      }else{
        this.xAxisData.push(selectedData.difficultLevel);
      }
    }
  }

  selectYAxis(yAxis){
    if(this.selectedDataArr.length == 0){
      alert('Please select table value')
    }
    for(var selectedData of this.selectedDataArr){
      this.yAxisData.push(selectedData.score);
    }
  }

  selectChart(chartType:string){
    this.chart = c3.generate({
      bindto: '#chart',
      data: {
        x : 'x',
        columns: [
          this.xAxisData,
          this.yAxisData
        ],
        type: chartType
      },
      axis: {
          x: {
              type: 'category'
          }
      }
    });
  }
  logout(){
    this.router.navigate(['']);
  }

}

