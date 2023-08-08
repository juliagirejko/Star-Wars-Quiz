import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  constructor(private readonly http: HttpClient) { }

  async getFilms(){
    const response = await firstValueFrom(this.http.get<any>(`${environment.apiUrlFilms}`))
    console.log('getting list of episodes', response.results)
  }

  async getCharacters(){
    const response = await firstValueFrom(this.http.get<any>(`${environment.apiUrlCharacters}`))
  }

  async getRandomCharacter(): Promise<any> {
    const randomId = Math.floor(Math.random() * 82) + 1; // SWAPI has 82 characters
    const character = await firstValueFrom(this.http.get(`${environment.apiUrlCharacters}/${randomId}`))
    return character;
  }

  async getRandomQuestionCharacter(): Promise<Quiz> {
    const randomIndex = Math.floor(Math.random() * questionList.length)
    const questionFromList = questionList[randomIndex] //get random question
    const question = questionFromList.q //get question
    const correctAnswer = questionFromList.a //get answer
    const answerOptions = [correctAnswer]
    while (answerOptions.length < 4) {
      const randomCharacter = await this.getRandomCharacter()
      const randomName = randomCharacter.name
      if (!answerOptions.includes(randomName)) {
        answerOptions.push(randomName) //add 3 random answers
      }
    }

    answerOptions.sort(() => Math.random() - 0.5) // shuffle the options

    const correctAnswerIndex = answerOptions.indexOf(correctAnswer); // get corret index

    return {
      question,
      answerOptions,
      correctAnswerIndex
    };
  }

}


export const questionList = [
  {
    q: "Who rescue Luke from Darth Vader?",
    a: "Han Solo"
  },
  {
    q: "Who destroys Alderaan in 'A New Hope'?",
    a: "Grand Moff Tarkin"
  },
  // more questions here
];

export interface Quiz {
  question: string,
  answerOptions: string[],
  correctAnswerIndex: number
}
