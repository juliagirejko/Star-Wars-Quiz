import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firestore: AngularFirestore) {}

  logQuizActivity(userId: string, score: number, answers: string[]) {
    return this.firestore.collection('quizActivities').add({
      userId,
      score,
      answers,
      timestamp: new Date()
    });
  }
}
