import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BookStore} from "./books.state";

export const selectBookStore = createFeatureSelector<BookStore>('bookStore');

export const selectBooks = createSelector( selectBookStore, (bookStoreState => bookStoreState.books));

export const selectSelected = createSelector(selectBookStore, (bookStoreState => bookStoreState.selectedBook));
