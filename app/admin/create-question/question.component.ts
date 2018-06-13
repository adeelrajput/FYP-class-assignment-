import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms"
import { Response } from '@angular/http'
import { ServerService } from "../../shared/server.service"


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],

})
export class QuestionComponent implements OnInit {
  questionnaire: FormGroup;
  items;
  formType;
  show:boolean=false
  constructor(private formBuilder: FormBuilder, private postDataIntoDB: ServerService) { }

  ngOnInit() {
   this.defaultForm();
  }

  defaultForm(){
    this.questionnaire = this.formBuilder.group({
      'formType': ['', Validators.required],
      items: this.formBuilder.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      sno: ['', Validators.required],
      question: ['', Validators.required],
      options: this.formBuilder.group({
        option1: ['', Validators.required],
        option2: ['', Validators.required],
        option3: ['', Validators.required],
        option4: ['', Validators.required],
        option5: ['', Validators.required]
      })

    });
  }

  addItem(): void {
    this.items = this.questionnaire.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  formChange(formSelected){
    this.formType= formSelected;
    this.show=true
    if(formSelected==='Choice...'){
      this.show=false
    }
    // console.log(formSelected);

  }

  onSubmit() {
    this.postDataIntoDB.storeData('questionnaire/'+this.formType,this.questionnaire.value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
      this.questionnaire.reset();
      this.defaultForm();
    console.log(this.questionnaire.value)
  }
}