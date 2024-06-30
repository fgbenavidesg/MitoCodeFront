import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, of, tap } from 'rxjs';
import { clienteResponse } from '../models/response/clienteResponse';
import { ClienteRequest } from '../models/request/clienteRequest';
import { libroResponse } from '../models/response/libroResponse';
import { LibroRequest } from '../models/request/libroRequest';
import { PedidoResponse } from '../models/response/pedidoResponse';
import { PedidoRequest } from '../models/request/pedidoRequest';

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private http = inject(HttpClient);


//pedidos
  getPedidos(dni:string){
    const api = environment.baseUrl + "/api/pedido/"+dni;
    return this.http.get<PedidoResponse>(api).pipe(
      catchError((httpErrorResponse: HttpErrorResponse)=>{
        const errorResponse: any = {
          data: '',
          success: false,
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }

  postPedido(param:PedidoRequest){
    const api = environment.baseUrl + "/api/pedido";
    return this.http.post<any>(api,param).pipe(
      catchError((httpErrorResponse: HttpErrorResponse)=>{
        console.log(httpErrorResponse);
        const errorResponse: any = {
          data: '',
          success: false,
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    )
  }
//cliente
  getCliente(){
    const api = environment.baseUrl + "/api/clientes";
    return this.http.get<clienteResponse>(api).pipe(
      catchError((httpErrorResponse: HttpErrorResponse)=>{
        const errorResponse: any = {
          data: '',
          success: false,
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }
  postCliente(param:ClienteRequest){
    const api = environment.baseUrl + "/api/clientes";
    return this.http.post<any>(api,param).pipe(
      catchError((httpErrorResponse: HttpErrorResponse)=>{
        const errorResponse: any = {
          data: '',
          success: false,
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }
  deleteCliente(id:string){
    const api = environment.baseUrl + "/api/clientes/"+id;
    return this.http.delete<any>(api).pipe(
      catchError((httpErrorResponse: HttpErrorResponse)=>{
        const errorResponse: any = {
          data: '',
          success: false,
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }
  updateCliente(id:string,param:ClienteRequest){
    const api = environment.baseUrl + "/api/clientes/"+id;
    return this.http.put<any>(api,param).pipe(
      catchError((httpErrorResponse: HttpErrorResponse)=>{
        const errorResponse: any = {
          data: '',
          success: false,
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }

// libros
  getLibros(){
    const api = environment.baseUrl + "/api/libros";
    return this.http.get<libroResponse>(api).pipe(
      catchError((httpErrorResponse: HttpErrorResponse)=>{
        const errorResponse: any = {
          data: '',
          success: false,
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }
  postLibros(param:LibroRequest){
    const api = environment.baseUrl + "/api/libros";
    return this.http.post<any>(api,param).pipe(
      catchError((httpErrorResponse: HttpErrorResponse)=>{
        const errorResponse: any = {
          data: '',
          success: false,
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }
  deleteLibros(id:string){
    const api = environment.baseUrl + "/api/libros/"+id;
    return this.http.delete<any>(api).pipe(
      catchError((httpErrorResponse: HttpErrorResponse)=>{
        const errorResponse: any = {
          data: '',
          success: false,
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }
  updateLibros(id:string,param:LibroRequest){
    const api = environment.baseUrl + "/api/libros/"+id;
    return this.http.put<any>(api,param).pipe(
      catchError((httpErrorResponse: HttpErrorResponse)=>{
        const errorResponse: any = {
          data: '',
          success: false,
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }

}
