import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '../../shared/server.service'
import { Response } from '@angular/http'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-course-review-form',
  templateUrl: './course-review-form.component.html',
  styleUrls: ['./course-review-form.component.css']
})
export class CourseReviewFormComponent implements OnInit {

  objectKeys = Object.keys;
  questionnaire: string[] = [];
  currentQuestionsValue: string[] = [];
  @Input() basicInfoData: string[];
  formValues: string[] = [];
  Submited: boolean = false;
  
  constructor(private serverData: ServerService) { }

  ngOnInit() {
    this.onGetForm();
    // this.defaultForm();s
  }


  // defaultForm() {
  //   this.form = this.formBuilder.group({
  //     items: this.formBuilder.array([this.createItem()])
  //   });
  // }

  // createItem(): FormGroup {
  //   return this.formBuilder.group({
  //     batch: ['', Validators.required],
  //     semester: ['', Validators.required],
  //     subject: ['', Validators.required],
  //     questions: this.formBuilder.group({
  //       sno: ['', Validators.required],
  //       question: ['', Validators.required],
  //       options: this.formBuilder.group({
  //         option: ['', Validators.required],
  //       })
  //     })
  //   });
  // }

  // addItem(): void {
  //   this.items = this.form.get('items') as FormArray;
  //   this.items.push(this.createItem());
  // }

  onGetForm() {
    this.serverData.getData('questionnaire/Student Course Review')
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
    this.serverData.storeData('Analysis/Student Course Review', form.value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
    this.Submited = true
  }






  // import { Component, OnInit, Input } from '@angular/core';
  // import { ServerService } from '../../shared/server.service'
  // import { Response } from '@angular/http'
  // import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

  // @Component({
  //   selector: 'app-course-review-form',
  //   templateUrl: './course-review-form.component.html',
  //   styleUrls: ['./course-review-form.component.css']
  // })
  // export class CourseReviewFormComponent implements OnInit {

  //   objectKeys = Object.keys;
  //   questionnaire: string[] = [];
  //   currentQuestionsValue: string[] = [];
  //   @Input() basicInfoData: string[];
  //   formValues: string[] = [];
  //   form: FormGroup
  //   items;
  //   constructor(private serverData: ServerService, private formBuilder: FormBuilder) { }

  //   ngOnInit() {
  //     this.onGetForm();
  //     // this.defaultForm();


  //     this.form = new FormGroup({
  //       'batch': new FormControl(),
  //       'semester': new FormControl(),
  //       'subject': new FormControl(),
  //       'questions': new FormGroup({
  //         'sno': new FormControl(),
  //         'question': new FormControl(),
  //         'options': new FormGroup({
  //           'option': new FormControl(),
  //         })
  //       })
  //     })
  //   }


  //   // defaultForm() {
  //   //   this.form = this.formBuilder.group({
  //   //     items: this.formBuilder.array([this.createItem()])
  //   //   });
  //   // }

  //   // createItem(): FormGroup {
  //   //   return this.formBuilder.group({
  //   //     batch: ['', Validators.required],
  //   //     semester: ['', Validators.required],
  //   //     subject: ['', Validators.required],
  //   //     questions: this.formBuilder.group({
  //   //       sno: ['', Validators.required],
  //   //       question: ['', Validators.required],
  //   //       options: this.formBuilder.group({
  //   //         option: ['', Validators.required],
  //   //       })
  //   //     })
  //   //   });
  //   // }

  //   // addItem(): void {
  //   //   this.items = this.form.get('items') as FormArray;
  //   //   this.items.push(this.createItem());
  //   // }

  //   onGetForm() {
  //     this.serverData.getData('questionnaire/Student Course Review')
  //       .subscribe(
  //         (response: Response) => {
  //           this.questionnaire = response.json();
  //           let key = Object.keys(this.questionnaire);
  //           for (let i = 0; i < key.length; i++) {
  //             this.currentQuestionsValue.push(this.questionnaire[key[i]])
  //           }

  //           console.log('keys', key);
  //           console.log('Fetched Form', this.questionnaire);
  //           console.log('current Questions Value', this.currentQuestionsValue);
  //         },
  //         (error) => console.log('Form Error', error)
  //       )
  //   }

  //   onSubmit() {
  //     console.log('form values', this.form.value)
  //     // this.serverData.storeData('Analysis/Student Course Review', this.form.value)
  //     //   .subscribe(
  //     //     (response) => console.log(response),
  //     //     (error) => console.log(error),
  //     // )
  //   }
}