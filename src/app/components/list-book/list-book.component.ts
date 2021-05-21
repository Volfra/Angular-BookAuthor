import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/services/book.service';
import { AuthorService } from 'src/app/services/author.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Author } from 'src/app/model/author';
  
@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

    bookSet: Book[];
    bookFil: Book[];
    authorSet: Author[];
    isbnBook : string;
    collectionSize: number;
    searchTerm: string;
    closeModal: string;
    selected: Author;
    msgError = '';
    currentBook = null;
    currentIndex = -1;
    
    constructor(private bookService: BookService,  
                  private authorService: AuthorService, 
                    private modalService: NgbModal) { 
                      this.getAuthors() 
                    }
  
    ngOnInit(): void {
      this.refreshList();
    }
  
    triggerModal(content:any, val:Book) {
      this.currentBook = val
      this.retrieveBook(this.currentBook.isbn)
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
        this.closeModal = `Closed with: ${res}`;
      }, (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      });
    }
    
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
  
    search(value: string): void {
      this.bookFil = this.bookSet.filter((val) => val.name.toLowerCase().includes(value));
      this.collectionSize = this.bookFil.length;
    }
  
    retrieveBooks(): void {
      this.bookService.getAll()
        .subscribe(
          data => {
            this.bookSet = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
  
    retrieveBook(val:string): void {
      this.bookService.get(val)
        .subscribe(
          data => {
            this.currentBook = data;
            console.log(data);
          },
          error => {
            this.msgError =  error.message +' \n '+ error.error.message;
            console.log(error);
          });
    }
  
    updateBook(): void {
     this.bookService.update(this.currentBook.isbn, this.currentBook)
        .subscribe(
          data => {
            this.refreshList();
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
  
    deleteBook(val1:string): void {
      this.bookService.delete(val1)
         .subscribe(
           data => {
             this.refreshList();
             console.log(data);
           },
           error => {
             console.log(error);
           });
     }
  
    setActiveBook(book : Book, index : number): void {
      this.currentBook = book;
      this.currentIndex = index
    }
  
    refreshList(): void {
      this.retrieveBooks();
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