import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/model/author';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  author = new Author();
  submitted = false;
  msgError = '';

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
  }

  existsPK (val:string): void {
    this.authorService.get(val)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveAuthor(): void {
    const data = {
      id: this.author.id,
      name: this.author.name,
      nationality: this.author.nationality
    };

    this.authorService.create(data)
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

  newAuthor() {
    this.submitted = false;
    this.author.id = null;
    this.author.name = null;
    this.author.nationality = null;
  }

}