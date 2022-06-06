import {Component, Input, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Book} from "../book";
import {Store} from "@ngrx/store";
import {BookStoreActions} from "../state/books.actions";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  itemForm = this.fb.group({
    id: [''],
    title: ['', [Validators.required, Validators.minLength(3)]],
    author: ['', Validators.required],
    description: ['']
  });
  newBook = {id: null, title: '', author: '', description: ''};

  @Input() book?: Book | undefined;

  constructor(private fb: FormBuilder, private store: Store) { }

  saveClicked(){
    this.store.dispatch(BookStoreActions.saveBook({book: this.itemForm.value}));
    this.itemForm.reset();
  }

  deleteClicked(){
    this.book && this.store.dispatch(BookStoreActions.deleteBook({id: this.book.id}));
    this.itemForm.reset();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.itemForm.setValue(changes['book'].currentValue ?? this.newBook );
  }

}
