import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Book} from "./book"

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private booksUrl = "api/books";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) { }

  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.booksUrl);
  }

  saveBook(book: Book): Observable<any> {
    return book.id == null ? this.addBook(book) : this.updateBook(book);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions);
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url);
  }

  updateBook(book: Book): Observable<any> {
    return this.http.put<Book>(this.booksUrl, book, this.httpOptions);
  }

  deleteBook(id: number): Observable<any> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.delete<Book>(url, this.httpOptions);
  }

  private static handleError(error: any) {
    console.log("ERROR: " + error);
    return throwError(error);
  }

}
