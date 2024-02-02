// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

 // ...

 login(username: string, password: string): Observable<User | null> {
  const loginUrl = `${this.apiUrl}?username=${username}&password=${password}`;

  return this.http.get<User[]>(loginUrl).pipe(
    map((users) => (users.length > 0 ? users[0] : null)),
    catchError(() => of(null)),
    tap((user) => {
      if (user) {
        this.setCurrentUser(user);
      }
    })
  );
}

  register(user: User): Observable<void> {
    return this.http.post<void>(this.apiUrl, user);
  }

  getCurrentUser(): User | null {
    // Retrieve the current user from localStorage
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  setCurrentUser(user: User): void {
    // Store the current user details in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearCurrentUser(): void {
    // Remove the current user details from localStorage
    localStorage.removeItem('currentUser');
  }
}
