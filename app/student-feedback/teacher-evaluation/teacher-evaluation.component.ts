import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '../../shared/server.service'
import { Response } from '@angular/http'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-teacher-evaluation',
  templateUrl: './teacher-evaluation.component.html',
  styleUrls: ['./teacher-evaluation.component.css']
})
export class TeacherEvaluationComponent implements OnInit {
  objectKeys = Object.keys;
  questionnaire: string[] = [];
  currentQuestionsValue: string[] = [];
  @Input() basicInfoData: string[];
  constructor(private serverData: ServerService) { }

  ngOnInit() {
    this.onGetForm();
  }
  
  onGetForm() {
    this.serverData.getData('questionnaire/Teacher Evalutaion')
      .subscribe(
        (response: Response) => {
          this.questionnaire = response.json();
          let key = Object.keys(this.questionnaire);
          for (let i = 0; i < key.length; i++) {
            this.currentQuestionsValue.push(this.questionnaire[key[i]])
          }
          console.log('keys', key);
          console.log('Fetched Form', this.questionnaire);
          console.log('current Questions Value', this.currentQuestionsValue);
        },
        (error) => console.log('Form Error', error)
      )
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.serverData.storeData('Analysis/Teacher Evalutaion', form.value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
    form.reset();
  }
}