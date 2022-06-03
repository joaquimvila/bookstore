import {Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BooksService} from "../books.service";
import {Book} from "../book";

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

  @Input() book?: Book | null;
  @Output() save = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<number>();

  constructor(private fb: FormBuilder, private bookService: BooksService) { }

  saveClicked(){
    this.save.emit(this.itemForm.value);
    this.itemForm.reset();
  }

  deleteClicked(){
    this.delete.emit(this.book?.id);
    this.itemForm.reset();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.itemForm.setValue(changes['book'].currentValue ?? this.newBook );
  }

}
