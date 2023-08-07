import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  constructor(private readonly http: HttpClient) { }

  async getFilms() {
    const response = await firstValueFrom(this.http.get(`${environment.apiUrlFilms}`))
    console.log('getting list of groceries', response)
  }


}
