import {Book} from "../book";

export interface AppState {
  books: ReadonlyArray<Book>;
}
