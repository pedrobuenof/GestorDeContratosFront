import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Contrato } from "../models/contrato.model";

@Injectable( { providedIn: 'root' } )
export class ContratosService {
  private apiUrl = 'http://localhost:8080/api' // Pegar através de uma Variável de Ambiente diretamento do .env

  constructor(private http: HttpClient){
    console.log("home criada");
  }
  
  private handleError(error: any): Observable<never> {
    console.error("Ocorreu um erro: ", error);
    return throwError(() => new Error("Erro ao processar a requisição."))
  }

  getAll(): Observable<Contrato[]> {
    console.log("Requisição de pegar todos os contratos");
    
    return this.http.get<Contrato[]>(`${this.apiUrl}/buscar`).pipe(catchError(this.handleError));
  }

  getById(id: string): Observable<Contrato> {
    console.log(`Buscando contrato específico ID = ${id}`);
    console.log(typeof id);
    
    
    return this.http.get<Contrato>(`${this.apiUrl}/buscar/${id}`).pipe(catchError(this.handleError));
  }

  create(contrato: Contrato): Observable<Contrato> {
    return this.http.post<Contrato>(`${this.apiUrl}/criarContratos`, contrato).pipe(catchError(this.handleError));
  }

  update(id: number, contrato: Contrato): Observable<Contrato> {
    return this.http.put<Contrato>(`${this.apiUrl}/editarContrato/${id}`, contrato).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletarContrato/${id}`).pipe(catchError(this.handleError));
  }
}
