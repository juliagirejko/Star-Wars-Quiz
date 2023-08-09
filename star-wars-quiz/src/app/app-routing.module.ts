import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './quiz/start-page/start-page.component';
import { QuestionQuizComponent } from './quiz/question-quiz/question-quiz.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: 'login',
    component: LoginComponent
  },
  { path: 'home',
    component: StartPageComponent
  },
  { path: '',
    redirectTo: '/login',
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
