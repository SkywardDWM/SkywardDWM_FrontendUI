import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstant, BaseService } from '@app-core';  // Importing constants and base service
import { Observable } from 'rxjs';
import { UnitOfMeasure } from 'src/app/model/unitOfMeasure';
//import { UnitOfMeasure } from 'src/app/model/unit-of-measure';  // Assuming you have a model for UnitOfMeasure

@Injectable({
  providedIn: 'root'
})
export class UnitOfMeasureService {

  constructor(
    private http: HttpClient,
    private _baseService: BaseService
  ) { }

  // Get a list of UnitOfMeasure
  getUnitOfMeasureList(): Observable<UnitOfMeasure[]> {
    return this.http.get<UnitOfMeasure[]>(`${APIConstant.unitOfMeasureList}`);
  }

  // Get UnitOfMeasure by ID
  getUnitOfMeasureById(id: number): Observable<any> {
    return this.http.get(`${APIConstant.unitOfMeasureGetById}?id=${id}`);
  }

  // Create a new UnitOfMeasure
  unitOfMeasureAdd(payload: any): Observable<any> {
    return this.http.post(`${APIConstant.unitOfMeasureAdd}`, payload);
  }

  // Update an existing UnitOfMeasure
  unitOfMeasureEdit(data: any): Observable<any> {
    return this.http.post(`${APIConstant.unitOfMeasureEdit}`, data);
  }

  // Delete a UnitOfMeasure
  unitOfMeasureDelete(id: number): Observable<any> {
    return this.http.get(`${APIConstant.unitOfMeasureDelete}?id=${id}`);
  }
}
