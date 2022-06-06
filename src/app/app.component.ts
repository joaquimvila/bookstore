import { Component } from '@angular/core';
import {Book} from "./book";
import {Store} from "@ngrx/store";
import {BookStoreActions} from "./state/books.actions";
import {Selector} from "./state/books.selectors";

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
  selectedBook?: Book;
  message?: string;
  showDetail = false;

  ngOnInit(): void{
    this.loadBooks();
    this.store.select(Selector.books).subscribe(books => this.books$ = books);
    this.store.select(Selector.selectedBook).subscribe(book => {
      this.selectedBook = book;
    });
    this.store.select(Selector.showDetail).subscribe(showDetail => {
      this.showDetail = showDetail;
      showDetail ? this.showPopup() : this.hidePopup();
    });
  }

  loadBooks(): void {
    this.store.dispatch(BookStoreActions.loadBooks());
  }

  addBook(): void {
    this.store.dispatch(BookStoreActions.newBook())
  }

  dismissPopup(): void {
    this.store.dispatch(BookStoreActions.dismissPopup())
  }

  showPopup(): void {
    this.popUpClass = 'popupShown';
    this.blackScreenClass = 'on';
  }

  hidePopup(): void {
    this.blackScreenClass = 'off';
    this.popUpClass = 'popupHidden';
  }

  showBook(book: Book): void {
    this.store.dispatch(BookStoreActions.showBook({book}))
  }

  constructor(private store: Store) {
  }
}
