import {createReducer, on} from "@ngrx/store";
import {BookStoreActions} from "./books.actions";
import {BookStore} from "./books.state";

export const initialState: BookStore = { books: [], selectedBook: undefined, showDetail: false};

export const booksReducer = createReducer(
  initialState,
  on(BookStoreActions.booksLoaded, (state, {books}) => ({...state, books: books})),
  on(BookStoreActions.showBook, (state, {book}) => ({...state, selectedBook: book, showDetail: true})),
  on(BookStoreActions.newBook, (state) => ({...state, selectedBook: undefined, showDetail: true})),
  on(BookStoreActions.bookSaved, (state, {book}) => ({...state, selectedBook: undefined, showDetail: false})),
  on(BookStoreActions.bookDeleted, (state, {book}) => ({...state, selectedBook: undefined, showDetail: false})),
  on(BookStoreActions.dismissPopup, (state => ({...state, selectedBook: undefined, showDetail: false})))
);
