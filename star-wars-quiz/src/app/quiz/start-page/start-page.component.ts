import { Component } from '@angular/core';
import { StarWarsService } from 'src/app/star-wars.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  questionSize = [3, 10, 15]
  questionType= ["character", "movie", "real fan"]
  selectedSize: number | undefined
  selectedType: number = this.questionType.indexOf('character')

  constructor(private readonly StartWarsService: StarWarsService){
  }

  setSize() {
    if(this.selectedSize !== undefined)
      this.StartWarsService.setQuestionsTable(this.questionSize[this.selectedSize])
  }
}
