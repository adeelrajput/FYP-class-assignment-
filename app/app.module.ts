import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module'
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/shared/header/header.component';
import { QuestionComponent } from '../app/admin/create-question/question.component';
import { StudentFeedbackComponent } from '../app/student-feedback/student-feedback.component';
// import { FacultyComponent } from './feedback/faculty/faculty.component';
import { ServerService } from '../app/shared/server.service';
import { CourseReviewFormComponent } from '../app/student-feedback/course-review-form/course-review-form.component';
import { TeacherEvaluationComponent } from '../app/student-feedback/teacher-evaluation/teacher-evaluation.component';
import { ChartsComponent } from '../app/admin/charts/charts.component';
import { HomeComponent } from '../app/home/home.component';
import { AdminComponent } from '../app/admin/admin.component';
// import { CreateSubjectComponent } from './feedback/admin/create-subject/create-subject.component';
import { LoginComponent } from '../app/shared/anth/login/login.component';
import {SignUpComponent } from '../app/shared/anth/sign-up/sign-up.component';
// import { FeedbackComponent } from '../app/';
import { CourseReviewAnalysisComponent } from '../app/admin/charts/course-review-analysis/course-review-analysis.component';
import { TeacherEvaluationAnalysisComponent } from '../app/admin//charts/teacher-evaluation-analysis/teacher-evaluation-analysis.component'
import { AuthService } from '../app/shared/anth/auth.service'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuestionComponent,
    StudentFeedbackComponent,
    // FacultyComponent,
    CourseReviewFormComponent,
    TeacherEvaluationComponent,
    ChartsComponent,
    HomeComponent,
    AdminComponent,
    // CreateSubjectComponent,
    LoginComponent,
    // FeedbackComponent,
    SignUpComponent,
    CourseReviewAnalysisComponent,
    TeacherEvaluationAnalysisComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule,
    NgbModule.forRoot(),

  ],
  providers: [ServerService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
