import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstant, BaseService } from '@app-core';
import { Observable } from 'rxjs';
import { Frequency } from 'src/app/model/frequency';

@Injectable({
  providedIn: 'root'
})
export class FrequencyService {

  constructor(
    private http: HttpClient,
    private _baseService: BaseService
  ) { }

  // Get the list of frequencies
  getFrequencyList(): Observable<Frequency[]> {
    return this.http.get<Frequency[]>(`${APIConstant.frequencyList}`);
  }

  // Get a frequency by ID
  getFrequencyById(id: number): Observable<any> {
    return this.http.get(`${APIConstant.frequencyGetById}?id=${id}`);
  }

  // Add a new frequency
  frequencyAdd(payload: any): Observable<any> {
    return this.http.post(`${APIConstant.frequencyAdd}`, payload);
  }

  // Edit an existing frequency
  frequencyEdit(data: any): Observable<any> {
    return this.http.post(`${APIConstant.frequencyEdit}`, data);
  }

  // Delete a frequency
  frequencyDelete(id: number): Observable<any> {
    return this.http.get(`${APIConstant.frequencyDelete}?id=${id}`);
  }
}
