import { Component } from '@angular/core';
import { StarWarsService } from 'src/app/star-wars.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  questionSize = [5, 10, 15]
  questionType= ["character", "movie", "mix"]
  selectedSize: number | undefined
  selectedType: number | undefined

  constructor(private readonly StartWarsService: StarWarsService){
  }

  setQuestion() {
    if(this.selectedSize !== undefined && this.selectedType !== undefined)
      this.StartWarsService.setQuestionsTable(
          this.questionSize[this.selectedSize],
          this.questionType[this.selectedType]);
  }
}
