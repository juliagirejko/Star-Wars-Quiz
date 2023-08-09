import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { questionListChar, questionListMovie } from './quiz/question-list';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  constructor(private readonly http: HttpClient) {
    this.getRandomCharacterResults(); // Fetch the list of characters
    this.getRandomFilmsResults(); // Fetch the list of films
  }

  characterList: any[] = [];
  filmsList: any[] = [];
  score: number = 0
  questionsTable: string[] = []
  questionList: { q: string; a: string; }[] = questionListChar

  private totalScore = new BehaviorSubject<number>(this.score)
  score$ = this.totalScore.asObservable()

  private questionsForQuiz = new BehaviorSubject<string[]>(this.questionsTable)
  questionsTable$ = this.questionsForQuiz.asObservable()

  get getQuestionsTable(){
    return this.questionsTable
  }

  async getAnswers(q: string, type: string): Promise<Quiz> {
    try {
      console.log('Start getAnswers:', new Date().toISOString());

      const questionFromList = this.getQ(q); // get the question

      if (!questionFromList) {
        throw new Error('No question found for the given table.');
      }

      const correctAnswer = questionFromList.a;
      const answerOptions = [correctAnswer];

      let randomOptions: string[] = [];
      if (type === 'character') {
        console.log('Start getRandomCharacterOptions:', new Date().toISOString());
        randomOptions = await this.getRandomCharacterOptions(4, correctAnswer);
        console.log('End getRandomCharacterOptions:', new Date().toISOString());
      } else if (type === 'movie') {
        console.log('Start getRandomMovieOptions:', new Date().toISOString());
        randomOptions = await this.getRandomMovieOptions(4, correctAnswer);
        console.log('End getRandomMovieOptions:', new Date().toISOString());
      } else if (type === 'mix') {
        console.log('Start getRandomCharacterOptions:', new Date().toISOString());
        randomOptions = await this.getRandomCharacterOptions(2, correctAnswer);
        console.log('End getRandomCharacterOptions:', new Date().toISOString());

        console.log('Start getRandomMovieOptions:', new Date().toISOString());
        randomOptions.push(...(await this.getRandomMovieOptions(2, correctAnswer)));
        console.log('End getRandomMovieOptions:', new Date().toISOString());
      }

      console.log('Start sort answerOptions:', new Date().toISOString());
      answerOptions.push(...randomOptions);
      answerOptions.sort(() => Math.random() - 0.5);
      console.log('End sort answerOptions:', new Date().toISOString());

      const correctAnswerIndex = answerOptions.indexOf(correctAnswer);

      console.log('End getAnswers:', new Date().toISOString());

      return {
        question: questionFromList.q,
        answerOptions,
        correctAnswerIndex
      };
    } catch (error) {
      throw new Error('An error occurred while fetching answers.');
    }
  }


  async getRandomCharacterResults(): Promise<void> {
    try {
      const result = await firstValueFrom(this.http.get<any>(`${environment.apiUrlCharacters}`));
      this.characterList = result.results;
    } catch (error) {
      throw new Error('An error occurred while fetching characters.');
    }
  }

  async getRandomCharacterOptions(count: number, correctAnswer: string): Promise<string[]> {
    const randomOptions: string[] = [];

    try {
      for (const randomCharacter of this.characterList) {
        const randomName = randomCharacter.name;
        if (randomOptions.length < count && randomName !== correctAnswer && !randomOptions.includes(randomName)) {
          randomOptions.push(randomName);
        }
      }

      return randomOptions;
    } catch (error) {
      throw new Error('An error occurred while fetching random character options.');
    }
  }

  async getRandomFilmsResults(): Promise<void> {
    try {
      const result = await firstValueFrom(this.http.get<any>(`${environment.apiUrlFilms}`));
      this.filmsList = result.results;
    } catch (error) {
      throw new Error('An error occurred while fetching films.');
    }
  }

  async getRandomMovieOptions(count: number, correctAnswer: string): Promise<string[]> {
    const randomOptions: string[] = [];

    try {
      for (const randomFilm of this.filmsList) {
        const randomTitle = randomFilm.title;
        if (randomOptions.length < count && randomTitle !== correctAnswer && !randomOptions.includes(randomTitle)) {
          randomOptions.push(randomTitle);
        }
      }

      return randomOptions;
    } catch (error) {
      throw new Error('An error occurred while fetching random movie options.');
    }
  }

  getRandomQ() {
      const randomIndex = Math.floor(Math.random() * 20)
      return this.questionList[randomIndex] //return random question and answer
  }

  setQuestionList(type: string): void {
    switch (type) {
      case 'character':
        this.questionList = questionListChar;
        break;
      case 'movie':
        this.questionList = questionListMovie;
        break;
      case 'mix':
        this.questionList = [...questionListChar, ...questionListMovie];
        break;
    }
  }

  getQ(q: string) {
    return this.questionList.find(questionObj => questionObj.q === q);
  }

  checkAnswer(question: Quiz, selectedAnswerIndex: number) {
      if (selectedAnswerIndex === question.correctAnswerIndex) {
        this.score += 1
        console.log('Correct !!!')
      } else {
        console.log('Incorrect. The correct answer is: ' +
          question.answerOptions[question.correctAnswerIndex])
      }
      this.totalScore.next(this.score)
  }

  setQuestionsTable(size: number, type: string): void{
    console.log("size", size, "type", type)
    this.setQuestionList(type)
    this.questionsTable = []
    while (this.questionsTable.length < size) {
      let questionList = this.getRandomQ()
      if(questionList){
        const randomQ = questionList.q;
        if (!this.questionsTable.includes(randomQ)) {
          this.questionsTable.push(randomQ);
        }
      }
    }
    this.questionsForQuiz.next(this.questionsTable)
  }

}

export interface Quiz {
  question: string,
  answerOptions: string[],
  correctAnswerIndex: number
}
