import { Subscription } from 'rxjs';
import { Quiz, StarWarsService } from '../../star-wars.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-question-quiz',
  templateUrl: './question-quiz.component.html',
  styleUrls: ['./question-quiz.component.css']
})
export class StartPageComponent {

  question: Quiz | undefined;
  selectedAnswerIndex: number | undefined

  constructor(private readonly StarWarsService: StarWarsService){}

  async ngOnInit() {
    this.question = await this.StarWarsService.getRandomQuestionCharacter();
  }

  submitAnswer() {
    console.log(this.selectedAnswerIndex  + " clicked")
    if(this.question && this.selectedAnswerIndex !== undefined){
      this.StarWarsService.checkAnswer(this.question, this.selectedAnswerIndex)
    }
  }

}
