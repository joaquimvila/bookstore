import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Book} from "./book"

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public static booksUrl = "api/books";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) { }

  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(BooksService.booksUrl);
  }

  saveBook(book: Book): Observable<any> {
    return book.id == null ? this.addBook(book) : this.updateBook(book);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(BooksService.booksUrl, book, this.httpOptions);
  }

  getBook(id: number): Observable<Book> {
    const url = `${BooksService.booksUrl}/${id}`;
    return this.http.get<Book>(url);
  }

  updateBook(book: Book): Observable<any> {
    return this.http.put<Book>(BooksService.booksUrl, book, this.httpOptions);
  }

  deleteBook(id: number): Observable<any> {
    const url = `${BooksService.booksUrl}/${id}`;
    return this.http.delete<Book>(url, this.httpOptions);
  }

  private handleError(error: any) {
    console.log("ERROR: " + error);
    return throwError(error);
  }

}
