import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Category} from "./category";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {Link} from "./link";
import {CategorySimple} from "./category-simple";
import {MessageService} from "./message.service";

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
};

@Injectable()
export class LinkService {
  private categoryUrl = "http://localhost:8000/api/category/";
  private categoriesUrl = "http://localhost:8000/api/categories/";
  private linkUrl = "http://localhost:8000/api/link/";
  private linksUrl = "http://localhost:8000/api/links/";


  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        catchError(this.handleError('getCategories', []))
      );
  }

  getCategory(id: number): Observable<CategorySimple> {
    return this.http.get<CategorySimple>(this.categoryUrl + id)
      .pipe(
        catchError(this.handleError<CategorySimple>('getCategory'))
      )
  }

  updateCategory(category: CategorySimple): Observable<any> {
    let catUrl = this.categoryUrl + category.id;
    return this.http.put(catUrl, category, httpOptions).pipe(
      tap(cats => this.log(`Category updated`)),
      catchError(this.handleError('updateCategory', []))
    );
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, httpOptions).pipe(
      tap(cat => this.log(`Category added`)),
      catchError(this.handleError<Category>('addCategory'))
    )
  }

  updateLink(link: Link): Observable<any> {
    let linkUrl = this.linkUrl + link.id;
    return this.http.put(linkUrl, link, httpOptions).pipe(
      tap(link => this.log(`Link updated`)),
      catchError(this.handleError('updateLink', []))
    )
  }

  addLink (link: Link): Observable<Link> {
    return this.http.post<Link>(this.linksUrl, link, httpOptions).pipe(
      tap(link => this.log(`Link added`)),
      catchError(this.handleError<Link>('addLink'))
    );
  }

  removeLink (link: Link | number): Observable<Link> {
    const id = typeof link === 'number' ? link : link.id;
    const url = `${this.linkUrl}${id}`;

    return this.http.delete<Link>(url, httpOptions).pipe(
      tap(link => this.log(`Link removed`)),
      catchError(this.handleError<Link>('removeLink'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add('LinkService: ' + message)
  }
}
