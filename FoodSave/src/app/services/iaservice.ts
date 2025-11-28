import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Iaservice {
  private apiUrl = 'https://api.deepseek.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  generarRespuesta(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer sk-1d2c838a085c4508b2cd921187e62177`
    });

    const body = {
      model: 'deepseek-chat',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 200,
      temperature: 0.7,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
