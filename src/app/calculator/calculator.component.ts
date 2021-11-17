import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Courses } from '../interface/courses';
import { Valutes } from '../interface/valutes';

interface courseRub {
  RUB: Valutes
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  constructor(private http: HttpClient) {}

  input1: number = 1;
  base1: string = "RUB";
  base2: string = "USD";
  coursesObj:any;

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
    this.http.get<Courses[]>(`https://www.cbr-xml-daily.ru/daily_json.js`)
    .subscribe((res)=>{
      this.coursesObj = res;
      this.coursesObj = this.coursesObj.Valute;
      let ruble:courseRub = {
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
      this.convertMath();
    });
  }

  convertMath(){
    return parseFloat((this.input1 * ((this.coursesObj[this.base1].Value / this.coursesObj[this.base1].Nominal) / (this.coursesObj[this.base2].Value / this.coursesObj[this.base2].Nominal))).toFixed(6)); 
  }

  changeValute(){
    let buffer:string = this.base1;
    this.base1 = this.base2;
    this.base2 = buffer;
    this.getCourses()
  }
}
