import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BookStore} from "./books.state";

const bookStore = createFeatureSelector<BookStore>('bookStore');

const books = createSelector( bookStore, (bookStoreState => bookStoreState.books));

const selectedBook = createSelector(bookStore, (bookStoreState => bookStoreState.selectedBook));

const showDetail = createSelector(bookStore, (bookStoreState => bookStoreState.showDetail));

const booksCount = createSelector(bookStore, (bookStoreState => bookStoreState.books.length));

const booksTitles = createSelector(bookStore, (bookStoreState => bookStoreState.books.map(b => b.title)));

export const Selector = {
  bookStore, books, selectedBook, showDetail, booksCount, booksTitles
}
