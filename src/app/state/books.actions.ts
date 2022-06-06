import {createAction, props} from "@ngrx/store";
import {Book} from "../book";

const loadBooks = createAction("[BookList] Load Books");

const booksLoaded = createAction("[BookList] Books Loaded", props<{ books: ReadonlyArray<Book> }>())

const showBook = createAction("[BookList] Show Book", props<{book: Book}>());

const newBook = createAction("[BookList] New Book");

const saveBook = createAction("[BookList] Save Book", props<{ book: Book}>());

const bookSaved = createAction("[BookList] Book Saved", props<{book: Book}>());

const deleteBook = createAction("[BookList] Delete Book", props<{id: number}>());

const bookDeleted = createAction("[BookList] Book Deleted", props<{ book: Book }>());

const dismissPopup = createAction("[App] Dismiss Popup");

export const BookStoreActions = {
  loadBooks, booksLoaded, showBook, newBook, saveBook, bookSaved, deleteBook, bookDeleted, dismissPopup
}
