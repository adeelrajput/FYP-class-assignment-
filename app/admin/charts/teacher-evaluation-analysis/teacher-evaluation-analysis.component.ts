import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../shared/server.service'
import { Response } from '@angular/http'

@Component({
  selector: 'app-teacher-evaluation-analysis',
  templateUrl: './teacher-evaluation-analysis.component.html',
  styleUrls: ['./teacher-evaluation-analysis.component.css']
})
export class TeacherEvaluationAnalysisComponent implements OnInit {

  show: boolean = false
  questions: string[] = [];
  currentQuestionsValue: string[] = [];
  feedbackData: string[] = [];
  currentfeedbackData: string[] = []
  stronglyAgree = 0;
  agree = 0;
  uncertain = 0;
  disagree = 0;
  stronglyDisgree = 0;

  pieChartLabels: string[] = ['Srongly Agree', 'Agree', 'Uncertain', 'Disagree', 'Strongly Disagree'];
  pieChartData: number[][] = [];
  pieChartType: string = 'pie';

  constructor(private serverData: ServerService) { }
  ngOnInit() {
    this.onGetFeedbackData();
    if (this.currentfeedbackData.length === 0) {
      setTimeout(() => {
        this.analysis();
        this.show = true;
      }, 1000);
    } else {
      console.log('else')
    }
  }

  onGetFeedbackData() {
    this.serverData.getData('Analysis/Teacher Evalutaion')
      .subscribe(
        (response: Response) => {
          this.feedbackData = response.json();
          let key = Object.keys(this.feedbackData);
          for (let i = 0; i < key.length; i++) {
            this.currentfeedbackData.push(this.feedbackData[key[i]])
            // console.log('loop', this.currentfeedbackData)
          }
          // console.log('', this.feedbackData)
          // console.log('keys', key)
          console.log('Current Values', this.currentfeedbackData)
        },
        (error) => console.log('onGetFeedbackData Error', error)
      )

    this.serverData.getData('questionnaire/Teacher Evalutaion')
      .subscribe(
        (response: Response) => {
          this.questions = response.json();
          let key = Object.keys(this.questions);
          for (let i = 0; i < key.length; i++) {
            this.currentQuestionsValue.push(this.questions[key[i]])
          }
          // console.log('keys', key);
          // console.log('Fetched Form', this.questions);
          // console.log('current Questions Value', this.currentQuestionsValue);
        },
        (error) => console.log('Form Error', error)
      )
  }


  analysis() {
    let x = this.currentfeedbackData[0].length;
    let y = this.currentfeedbackData.length;
    let ind = 0;
    for (ind = 0; ind < x; ind++) {
      console.log('ind', ind)
      for (let i = 0; i < y; i++) {
        if (this.currentfeedbackData[i][ind] == 'Strongly Agree') {
          this.stronglyAgree++
          // console.log('storngly agree', this.stronglyAgree)
        } else if (this.currentfeedbackData[i][ind] == 'Agree') {
          this.agree++
          // console.log(' agree', this.agree)
        } else if (this.currentfeedbackData[i][ind] == 'Uncertain') {
          this.uncertain++
          // console.log('uncertain', this.uncertain)
        } else if (this.currentfeedbackData[i][ind] == 'Disagree') {
          this.disagree++
          // console.log('disagree', this.disagree)
        } else if (this.currentfeedbackData[i][ind] == 'Strongly Disagree') {
          this.stronglyDisgree++
          // console.log('storngly disagree', this.stronglyDisgree)
        }
      }
      this.pieChartData[ind] = [this.stronglyAgree, this.agree, this.uncertain, this.disagree, this.stronglyDisgree];
      console.log(this.pieChartData)
      this.stronglyAgree = 0;
      this.agree = 0;
      this.uncertain = 0;
      this.disagree = 0;
      this.stronglyDisgree = 0;

    }


    // console.log('analysis is called', this.currentfeedbackData.length)

    // for (let i = 0; i < this.currentfeedbackData.length; i++) {

    //   for (let j = 0; j < this.currentfeedbackData[i].length; j++) {

    //     if (this.currentfeedbackData[i][j] == 'Strongly Agree') {
    //       this.stronglyAgree++
    //     }
    //   }
    // }


    // for (let i = 0; i < this.currentfeedbackData.length; i++) {
    //   // console.log('analysis loop')
    //   for (let j = 0; j < this.currentfeedbackData[i].length; j++) {
    //     if (this.currentfeedbackData[i][j] == 'Strongly Agree') {
    //       this.stronglyAgree++
    //       // console.log('stronglyAgree', this.stronglyAgree)
    //     }
    //   }
    // }

    // for (let i = 0; i < this.currentfeedbackData.length; i++) {

    //   for (let j = 0; j < this.currentfeedbackData[i].length; j++) {

    //     if (this.currentfeedbackData[i][j] == 'Agree') {
    //       this.agree++

    //       // console.log('Agree', this.agree)
    //     }
    //   }
    // }

    // for (let i = 0; i < this.currentfeedbackData.length; i++) {
    //   for (let j = 0; j < this.currentfeedbackData[i].length; j++) {
    //     if (this.currentfeedbackData[i][j] == 'Uncertain') {
    //       this.uncertain++

    //       // console.log('Uncertain', this.uncertain)
    //     }
    //   }
    // }

    // for (let i = 0; i < this.currentfeedbackData.length; i++) {
    //   for (let j = 0; j < this.currentfeedbackData[i].length; j++) {
    //     if (this.currentfeedbackData[i][j] == 'Disagree') {
    //       this.disagree++

    //       // console.log('Disagree', this.disagree)
    //     }
    //   }
    // }

    // for (let i = 0; i < this.currentfeedbackData.length; i++) {
    //   for (let j = 0; j < this.currentfeedbackData[i].length; j++) {
    //     if (this.currentfeedbackData[i][j] == 'Strongly Disagree') {
    //       this.stronglyDisgree++

    //       // console.log('Strongly Disagree', this.stronglyDisgree)
    //     }
    //   }
    // }


  }

  // setData(): void {
  //   let data = [
  //     this.stronglyAgree, this.agree, this.uncertain, this.disagree, this.stronglyAgree];
  //   let clone = JSON.parse(JSON.stringify(this.barChartData));
  //   clone[0].data = data;
  //   this.barChartData = clone;
  //   console.log('set data')
  // }

  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }


}
