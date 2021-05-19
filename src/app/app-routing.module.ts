import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuthorComponent } from './components/add-author/add-author.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ListBookComponent } from './components/list-book/list-book.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'listBook', component: ListBookComponent },
  { path: 'addAuthor', component: AddAuthorComponent },
  { path: 'addBook', component: AddBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
