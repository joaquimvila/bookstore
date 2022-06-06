import { Component } from '@angular/core';
import {Book} from "./book";
import {BooksService} from "./books.service";
import {Store} from "@ngrx/store";
import {BookStoreActions} from "./state/books.actions";
import {selectBooks, selectSelected} from "./state/books.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bookstore';
  books$: ReadonlyArray<Book> = [];
  popUpClass = 'popupHidden';
  blackScreenClass = 'off';
  selectedBook?: Book | null;
  message?: string;

  ngOnInit(): void{
    this.loadBooks();
    this.store.select(selectBooks).subscribe(books => this.books$ = books);
    this.store.select(selectSelected).subscribe(book => this.selectedBook = book);
  }

  loadBooks(): void {
    this.store.dispatch(BookStoreActions.loadBooks());
  }

  addBook(): void {
    this.store.dispatch(BookStoreActions.newBook())
    this.showPopup();
  }

  saveBook(book: Book): void {
    this.store.dispatch(BookStoreActions.saveBook({book}));
    this.dismissPopup();
  }

  deleteBook(bookId: number): void {
    this.store.dispatch(BookStoreActions.deleteBook({id: bookId}));
    this.dismissPopup();
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
    this.store.dispatch(BookStoreActions.showBook({book}))
    this.showPopup();
  }

  constructor(private booksService: BooksService, private store: Store) {
  }
}
