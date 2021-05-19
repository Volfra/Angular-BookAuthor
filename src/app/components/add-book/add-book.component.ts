import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/model/author';
import { Book } from 'src/app/model/book';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  authorSet: Author[];
  book = new Book();
  submitted = false;
  msgError = '';

  constructor(private bookService: BookService, private authorService: AuthorService) { 
    this.getAuthors() 
  }

  ngOnInit(): void {
  }

  existsPK (val:string): void {
    this.bookService.get(val)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveBook(): void {
    const data = {
      isbn: this.book.isbn,
      name: this.book.name,
      publishDate: this.book.publishDate,
      dataSetAuthors: this.book.dataSetAuthors
    };

    console.log(this.book.dataSetAuthors)

    this.bookService.create(data)
      .subscribe(
        data => {
          this.submitted=true;
          console.log(data);
        },
        error => {
          this.msgError  = error.message +' \n '+ error.error.message;
          console.log(error);
        });
  }

  newBook() {
    this.submitted = false;
    this.book.isbn = null;
    this.book.name = null;
    this.book.publishDate = null;
    this.book.dataSetAuthors = null;
  }

  getAuthors() {
    this.authorService.getAll()
    .subscribe(
      data => {
        this.authorSet = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}