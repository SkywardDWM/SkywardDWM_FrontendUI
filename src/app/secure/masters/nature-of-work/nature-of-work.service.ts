import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstant, BaseService } from '@app-core';
import { Observable } from 'rxjs';
import { NatureOfWork } from 'src/app/model/nature-of-work';

@Injectable({
  providedIn: 'root'
})
export class NatureOfWorkService {

  constructor(
    private http: HttpClient,
    private _baseService: BaseService
  ) { }

  // Get the list of Nature Of Work
  getNatureOfWorkList(): Observable<NatureOfWork[]> {
    return this.http.get<NatureOfWork[]>(`${APIConstant.natureOfWorkList}`);
  }

  // Get a Nature Of Work by ID
  getNatureOfWorkById(id: number): Observable<any> {
    return this.http.get(`${APIConstant.natureOfWorkGetById}?id=${id}`);
  }

  // Add a new Nature Of Work
  addNatureOfWork(payload: any): Observable<any> {
    return this.http.post(`${APIConstant.natureOfWorkAdd}`, payload);
  }

  // Edit an existing Nature Of Work
  updateNatureOfWork(data: any): Observable<any> {
    return this.http.post(`${APIConstant.natureOfWorkEdit}`, data);
  }

  // Delete a Nature Of Work
  deleteNatureOfWork(id: number): Observable<any> {
    return this.http.get(`${APIConstant.natureOfWorkDelete}?id=${id}`);
  }
}
