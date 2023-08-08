import { Subscription } from 'rxjs';
import { Quiz, StarWarsService } from '../../star-wars.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-quiz',
  templateUrl: './question-quiz.component.html',
  styleUrls: ['./question-quiz.component.css']
})
export class QuestionQuizComponent implements OnInit{

  question: Quiz | undefined;
  selectedAnswerIndex: number | undefined
  id: number | null = Number(this.route.snapshot.paramMap.get('id'))
  paramsSub: Subscription | null = null
  questionsTable: string[] = []
  questionsTableLength: number = this.questionsTable.length
  isQuizFinished: boolean = false
  private totalSubscription: Subscription | undefined;

  constructor(
    private readonly StarWarsService: StarWarsService,
    private route: ActivatedRoute){}

  async ngOnInit() {
    this.paramsSub = this.route.params.subscribe(async params => {
      this.id = params['id'];
      console.log(this.id)
    });
    this.totalSubscription = this.StarWarsService.questionsTable$.subscribe((questionsTable) => {
      this.questionsTable = questionsTable;})
    this.questionsTableLength = this.questionsTable.length
    if(this.id)
      this.question = await this.StarWarsService.getAnswersCharacter(this.questionsTable[this.id])
    console.log("question table ", this.questionsTable)
  }

  async submitAnswer() {
    console.log(this.selectedAnswerIndex  + " clicked")
    if(this.question && this.selectedAnswerIndex !== undefined){
      this.StarWarsService.checkAnswer(this.question, this.selectedAnswerIndex)
    }
    if(this.id && this.id < this.questionsTableLength - 1){
      ++this.id
      this.question = await this.StarWarsService.getAnswersCharacter(this.questionsTable[this.id])
    } else this.isQuizFinished = true
  }

  ngOnDestroy(): void {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
    if(this.totalSubscription){
      this.totalSubscription.unsubscribe();
    }
  }

}
