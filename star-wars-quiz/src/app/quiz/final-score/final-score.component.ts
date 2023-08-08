import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  id: number | null = Number(this.route.snapshot.paramMap.get('index'));

  constructor(private readonly StarWarsService: StarWarsService, private route: ActivatedRoute){
    this.totalSubscription = this.StarWarsService.score$.subscribe((score) => {
      this.score = score;})
  }

  ngOnDestroy() {
    this.totalSubscription.unsubscribe();
  }
}
