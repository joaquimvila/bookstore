import * as fromReducer from './books.reducer';
import {Action} from "@ngrx/store";
import {BookStoreActions} from "./books.actions";

describe('Books Reducer', () => {
  const {initialState, booksReducer} = fromReducer;
  const sampleBook = {id: 1, title: 'Title', author: 'Author', description: 'Description'}

  it('should return initial state if the action is unknown', () => {
    const action: Action = { type: 'Unknown' };
    const state = booksReducer(initialState, action);
    expect(state).toBe(initialState);
  });

  describe('booksLoaded action', function () {
    it('should have 1 book in books after loading 1 book',  () => {
      const action = BookStoreActions.booksLoaded({books: [sampleBook]});
      const state = booksReducer(initialState, action);
      expect(state.books.length).toEqual(1);
      expect(state.books[0]).toBe(sampleBook);
    });
  });

  describe("showBook action", function (){
    it("should set the selected book and showDetail to true",  () => {
      const action = BookStoreActions.showBook({book: sampleBook})
      const state = booksReducer(initialState, action);
      expect(state.selectedBook).toBe(sampleBook);
      expect(state.showDetail).toBeTrue();
    })
  })

  describe("newBook action", function(){
    it("should set the selected book to undefined and showDetail to true", () => {
      const state = booksReducer(initialState, BookStoreActions.newBook())
      expect(state.selectedBook).toBeUndefined();
      expect(state.showDetail).toBeTrue();
    })
  })

});
