import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Courses } from '../interface/courses';
import { Valutes } from '../interface/valutes';

interface courseRub {
  RUB: Valutes
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {

  constructor(private http: HttpClient) {}

  base:string = 'RUB'
  coursesObj:any;

  getCourses(){
    this.http.get<Courses[]>(`https://www.cbr-xml-daily.ru/daily_json.js`)
    .subscribe((res)=>{
      this.coursesObj = res;
      this.coursesObj = this.coursesObj.Valute;
      var ruble:courseRub = {
        RUB:{
          CharCode: "RUB",
          ID: '',
          Name: "Российский рубль",
          Nominal: 1,
          NumCode: "643",
          Previous: 1,
          Value: 1
        }
      };
      this.coursesObj = Object.assign({}, ruble, this.coursesObj);
      this.courseCalculator(this.coursesObj, this.base);
    });
  }

  courseCalculator(currencies:any, baseCurr:string){
    this.nominalDivision(baseCurr, currencies);
      Object.keys(currencies).forEach(key =>{
        if(currencies[key] != currencies[baseCurr]){
          if(currencies[key].Nominal>1){
            this.nominalDivision(key, currencies);
          }
          this.valueDivision(key, baseCurr, currencies);
        }  
      })
      this.valueDivision(baseCurr, baseCurr, currencies);
  }

  valueDivision(key:string, baseCurr:string, currencies:any){
    currencies[key].Value /= currencies[baseCurr].Value;
    currencies[key].Previous /= currencies[baseCurr].Previous;
  }

  nominalDivision(key:string, currencies:any){
    currencies[key].Value /= currencies[key].Nominal;
    currencies[key].Previous /= currencies[key].Nominal;
  }

  ngOnInit(): void {
    this.getCourses();
    console.log(this.coursesObj);
  }

}
