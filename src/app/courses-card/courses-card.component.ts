import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-card',
  templateUrl: './courses-card.component.html',
  styleUrls: ['./courses-card.component.scss'],
})


export class CoursesCardComponent implements OnInit {

  @Input() course!: any;
  @Input() base!: string;

  constructor() { }

  ngOnInit(): void {
    this.course = JSON.parse(this.course);
  }

  growCounter():number{
    var value = this.course.Value - this.course.Previous
    return parseFloat(value.toFixed(6));
  }

  valueRound():number{
    return parseFloat(this.course.Value.toFixed(6));
  }

}
