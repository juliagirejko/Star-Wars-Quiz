import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
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
  isGuest: boolean = false
  private totalSubscription: Subscription | undefined;

  constructor(private readonly StartWarsService: StarWarsService,
    private authService: AuthService,
    private router: Router){
      this.totalSubscription = this.authService.isGuest$.subscribe((guest) => {
        this.isGuest = guest
      });
  }

  setQuestion() {
    if(this.selectedSize !== undefined && this.selectedType !== undefined)
      this.StartWarsService.setQuestionsTable(
          this.questionSize[this.selectedSize],
          this.questionType[this.selectedType]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
