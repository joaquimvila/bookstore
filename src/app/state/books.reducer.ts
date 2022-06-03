import {Book} from "../book";
import {createReducer, on} from "@ngrx/store";
import {saveBook, getBooks, deleteBook} from "./books.actions";

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(getBooks, (state, {books}) => books),
  on(saveBook, (state, {book}) => {
    if(state.filter(item => item.id == book.id).length > 0){
      return state.map(item => item.id == book.id ? book : item);
    }else{
      return [...state, book];
    }
  }),
  on(deleteBook, (state, {id}) => state.filter(book => book.id !== id))
);
