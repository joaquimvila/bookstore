import { Component } from '@angular/core';
import {Book} from "./book";
import {BooksService} from "./books.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bookstore';
  books$: Book[] = [];
  popUpClass = 'popupHidden';
  blackScreenClass = 'off';
  selectedBook?: Book | null;

  ngOnInit(): void{
    this.getBooks();
  }

  getBooks(): void {
    this.booksService.getBooks().subscribe(books => this.books$ = books);
  }

  addBook(): void {
    this.selectedBook = null;
    this.showPopup();
  }

  saveBook(book: Book): void {
    this.booksService.saveBook(book).subscribe(book => {
      if(book != null) console.log(book.id + ' saved')
    });
    this.dismissPopup();
    this.getBooks();
  }

  deleteBook(bookId: number): void {
    this.booksService.deleteBook(bookId).subscribe(book => console.log(book.id + " deleted"));
    this.dismissPopup();
    this.getBooks();
  }

  showPopup(): void {
    this.popUpClass = 'popupShown';
    this.blackScreenClass = 'on';
  }

  dismissPopup(): void {
    this.blackScreenClass = 'off';
    this.popUpClass = 'popupHidden';
  }

  showBook(book: Book): void {
    this.selectedBook = book;
    this.showPopup();
  }

  constructor(private booksService: BooksService) {
  }
}
