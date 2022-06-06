import {Book} from "../book";

export interface AppState {
  bookStore: BookStore;
}

export interface BookStore {
  books: ReadonlyArray<Book>;
  selectedBook?: Book;
  showDetail: boolean;
}

