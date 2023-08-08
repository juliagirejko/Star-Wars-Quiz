import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StarWarsService } from 'src/app/star-wars.service';

@Component({
  selector: 'app-final-score',
  templateUrl: './final-score.component.html',
  styleUrls: ['./final-score.component.css']
})
export class FinalScoreComponent {

  score: number = 0
  private totalSubscription: Subscription;

  constructor(private readonly StarWarsService: StarWarsService){
    this.totalSubscription = this.StarWarsService.score$.subscribe((score) => {
      this.score = score;})
  }

  ngOnDestroy() {
    this.totalSubscription.unsubscribe();
  }
}
