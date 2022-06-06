import * as fromReducer from './books.reducer';
import {Action} from "@ngrx/store";
import {BookStoreActions} from "./books.actions";

describe('Books Reducer', () => {
  it('should return initial state if the action is unknown', () => {
    const {initialState, booksReducer} = fromReducer;
    const action: Action = { type: 'Unknown' };
    const state = booksReducer(initialState, action);
    expect(state).toBe(initialState);
  });

  it('should have 1 book after a new book is added', () => {
    const {initialState, booksReducer} = fromReducer;
    const book = {id: 1, title: 'Title', author: 'Author', description: 'Description'}
    const action = BookStoreActions.booksLoaded({books: [book]});
    const state = booksReducer(initialState, action);
    expect(state.books.length).toEqual(1);
  });
});
