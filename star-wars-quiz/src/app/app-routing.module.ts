import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './quiz/start-page/start-page.component';
import { QuestionQuizComponent } from './quiz/question-quiz/question-quiz.component';

const routes: Routes = [
  { path: 'home',
    component: StartPageComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'question/:index/:type',
    component: QuestionQuizComponent
  },
  {
    path: 'question',
    redirectTo: '/question/0',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
