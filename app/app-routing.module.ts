import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ChartsComponent } from './admin/charts/charts.component';
import { StudentFeedbackComponent } from './student-feedback/student-feedback.component';
import { CourseReviewFormComponent } from './student-feedback/course-review-form/course-review-form.component';
import { TeacherEvaluationComponent } from './student-feedback/teacher-evaluation/teacher-evaluation.component';
import { CourseReviewAnalysisComponent } from './admin/charts/course-review-analysis/course-review-analysis.component';
import { TeacherEvaluationAnalysisComponent } from './admin/charts/teacher-evaluation-analysis/teacher-evaluation-analysis.component';
import { LoginComponent } from './shared/anth/login/login.component';
import { SignUpComponent } from './shared/anth/sign-up/sign-up.component';
import { QuestionComponent } from './admin/create-question/question.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'create-question', component: QuestionComponent },
      { path: 'analysis', component: ChartsComponent },
      { path: 'analysis/course-review-analysis', component: CourseReviewAnalysisComponent },
      { path: 'teacher-evaluation-analysis', component: TeacherEvaluationAnalysisComponent }
    ]
  },
  {
    path: 'student-feedback', component: StudentFeedbackComponent, children: [
      { path: 'course-review', component: CourseReviewFormComponent },
      { path: 'teacher-evaluation', component: TeacherEvaluationComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent }

]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
