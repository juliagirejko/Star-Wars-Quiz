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
  id: number = 0
  type: string | null = String(this.route.snapshot.paramMap.get('type'));
  questionsTable: string[] = []
  questionsTableLength: number = this.questionsTable.length
  isQuizFinished: boolean = false
  private totalSubscription: Subscription | undefined;

  constructor(
    private readonly StarWarsService: StarWarsService,
    private route: ActivatedRoute){}

  async ngOnInit() {
    this.totalSubscription = this.StarWarsService.questionsTable$.subscribe((questionsTable) => {
      this.questionsTable = questionsTable;
      this.questionsTableLength = this.questionsTable.length;
      this.loadQuestion();
    });
    console.log("question table ", this.questionsTable)
  }

  async loadQuestion() {
    if(this.type)
      this.question = await this.StarWarsService.getAnswers(this.questionsTable[this.id], this.type);
  }

  submitAnswer() {
    if(this.question && this.selectedAnswerIndex !== undefined){
      this.StarWarsService.checkAnswer(this.question, this.selectedAnswerIndex)
    }
    if(this.id < this.questionsTableLength - 1){
      ++this.id
      this.loadQuestion()
    } else this.isQuizFinished = true
  }

  ngOnDestroy(): void {
    if(this.totalSubscription){
      this.totalSubscription.unsubscribe();
    }
  }

}
