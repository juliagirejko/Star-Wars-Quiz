import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './quiz/start-page/start-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionQuizComponent } from './quiz/question-quiz/question-quiz.component';
import { FinalScoreComponent } from './quiz/final-score/final-score.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    QuestionQuizComponent,
    FinalScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
