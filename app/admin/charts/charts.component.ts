import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  formType: string[] = ['Course Review', 'Teacher Evaluation']
  show
  constructor() { }
  ngOnInit() {
  }

  onSelect(changeForm) {
    this.show = changeForm
    console.log(changeForm)

  }
}
