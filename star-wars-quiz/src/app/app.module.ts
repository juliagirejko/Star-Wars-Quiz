import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './quiz/start-page/start-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionQuizComponent } from './quiz/question-quiz/question-quiz.component';
import { FinalScoreComponent } from './quiz/final-score/final-score.component';
import { LoginComponent } from './login/login.component';
import { authConfig } from './auth.config';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    QuestionQuizComponent,
    FinalScoreComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: authConfig.domain,
      clientId: authConfig.clientId
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
