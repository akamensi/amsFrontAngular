import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  //urlProviders = 'http://127.0.0.1:8080/providers';
  urlProviders = environment.baseUrl+'providers'
  //provider: any;

  constructor(private Http: HttpClient) { }
  token:any = sessionStorage.getItem('jwtToken');

  listProviders() {
    const headers = new HttpHeaders({ Authorization: 'Bearer '+this.token});
    //console.log(this.Http.get(this.urlProviders));
    return this.Http.get(this.urlProviders, {headers});
    //return this.Http.get(this.urlProviders);
  }
/*
  createProvider(myform: any) {
    this.provider = {
      'name': myform.value.providerName,
      'email': myform.value.providerEmail,
      'address': myform.value.providerAdress
    }
    return this.Http.post(this.urlProviders, this.provider);
  }*/
  createProvider(provider: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.Http.post(this.urlProviders, provider, { headers });

  }

  updateProvider(myObj: any) {
    return this.Http.put(this.urlProviders + '/' + myObj['id'], myObj);
  }

  deleteProvider(myObj: any) {
    return this.Http.delete(this.urlProviders + '/' + myObj['id'])
  }
  getProvider(id: any) {
    return this.Http.get(this.urlProviders + '/' + id)
  }


}
