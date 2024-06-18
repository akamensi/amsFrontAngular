import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  token:any = sessionStorage.getItem('jwtToken');
  urlArticles = environment.baseUrl+'articles';
  article: any;

  constructor(private Http: HttpClient) { }

  listArticles() {
    //const headers = new HttpHeaders({ Authorization: this.token});
   // return this.Http.get(this.urlArticles, {headers});
    return this.Http.get(this.urlArticles);
  }

  createArticle(myform: any) {
    this.article = {
      'label': myform.value.label,
      'price': myform.value.price,
      'picture': myform.value.picture
    }
    return this.Http.post(this.urlArticles+"/"+myform.value.providerId, this.article);
  }
}
