import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { StarWarsService } from 'src/app/star-wars.service';

@Component({
  selector: 'app-final-score',
  templateUrl: './final-score.component.html',
  styleUrls: ['./final-score.component.css']
})
export class FinalScoreComponent {

  score: number = 0
  show: boolean = false
  isGuest: boolean = false
  answerTable: {q: string, a: string}[] = []
  private totalSubscription: Subscription;
  id: number | null = Number(this.route.snapshot.paramMap.get('index'));

  constructor(private readonly StarWarsService: StarWarsService,
    private authService: AuthService,
    private route: ActivatedRoute){
    this.totalSubscription = this.StarWarsService.score$.subscribe((score) => {
      this.score = score
    })
    this.totalSubscription = this.StarWarsService.answerTable$.subscribe((answers) => {
      this.answerTable = answers
    })
    this.totalSubscription = this.authService.isGuest$.subscribe((guest) => {
      this.isGuest = guest
    });
  }

  showAnswers(){
    console.log("check answer cklicked")
    this.show = true
  }

  ngOnDestroy() {
    this.StarWarsService.setFinalScore()
    this.totalSubscription.unsubscribe();
  }
}
