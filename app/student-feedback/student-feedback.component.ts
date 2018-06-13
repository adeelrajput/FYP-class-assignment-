import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ServerService } from '../shared/server.service'
import { error } from 'protractor';
import { Response } from '@angular/http'
import { FormGroup, FormControl, Form, NgForm, Validators, } from '@angular/forms';

@Component({
  selector: 'app-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrls: ['./student-feedback.component.css']
})
export class StudentFeedbackComponent implements OnInit {
  batches: string[] = []; // tis array use for to store batchs which is retrive for fire base database
  semesters: string[] = []; // tis array use for to store semesters which is retrive for fire base database
  subjects: string[] = []; // tis array use for to store subjects which is retrive for fire base database
  // basicInfo: FormGroup; 
  // form: FormGroup;
  objectKeys = Object.keys;
  questionnaire: string[] = [];
  currentQuestionsValue: string[] = [];
  storeFormTpye = ''//this var store value which is user select form form type 
  formShow = ''; // this var use for change form type
  basicinforFormHide: boolean = true//this boolean hide and show 
  btnShow:boolean=false;// this boolean enable back button
  basicInfoData: string[] = [];
  enableBatcSelection: boolean = true;// Enable Select box of Batchs
  enableSemesterSelection:boolean=true; //enable select box of Semesters

  constructor(private serverData: ServerService, ) { }

  ngOnInit() {
    this.onGetBatchs();
    this.onGetSemster();
  }

  onGetBatchs() {
    this.serverData.getData('Batches')
      .subscribe(
        (response: Response) => {
          this.batches = response.json();
          console.log("getBatchs function works", this.batches)
        },
        (error) => console.log('onGetBatch Error', error)
      )
  }

  onGetSemster() {
    this.serverData.getData('Semesters')
      .subscribe(
        (response: Response) => {
          this.semesters = response.json();
          console.log("Fatched Semsters", this.semesters)
        },
        (error) => console.log('onGetSemester Error', error)
      )
  }

  onchangebatch(changeBatch) {
    this.basicInfoData[1] = changeBatch
    this.enableSemesterSelection=false
  }

  onChangeSemester(changeSemester) {
    this.serverData.getData('Subjects/' + changeSemester)
      .subscribe(
        (response: Response) => {
          this.subjects = response.json()
          console.log('Fatched Subjects', this.subjects)
        },
        (error) => console.log('onGetSubject Error', error)
      )
    this.basicInfoData[2] = changeSemester
    console.log('subject/' + changeSemester)

  }

  onChangeSubject(changeSub) {
    this.basicInfoData[3] = changeSub

  }


  onChangeFormType(changeFormType) {
    this.storeFormTpye = changeFormType;
    this.basicInfoData[0] = changeFormType;
    if (changeFormType !== "choice") {
      this.enableBatcSelection = false
    }
  }

  attempt(subjectName) {
    this.formShow = this.storeFormTpye
    this.basicInfoData[3] = subjectName
    this.basicinforFormHide = false
    this.btnShow=true;
    console.log('show', this.formShow)
  }

  showBasicInfoFrom(){
    this.btnShow=false;
    this.formShow=''
    this.basicinforFormHide=true
  }
}
