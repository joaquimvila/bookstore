import {createAction, props} from "@ngrx/store";
import {Book} from "../book";

export const getBooks = createAction("[BookList] Get Books", props<{ books: ReadonlyArray<Book> }>());

export const saveBook = createAction('[BookList] Save Book', props<{ book: Book}>());

export const deleteBook = createAction("[BookList] Delete Book", props<{id: number}>());
