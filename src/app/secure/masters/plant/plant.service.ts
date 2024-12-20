import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstant, BaseService } from '@app-core';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/model/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http : HttpClient,
    private _baseService : BaseService
  ) { }

  getPlantList():Observable<Plant[]>{
    return this.http.get<Plant[]>(`${APIConstant.plantList}`);
  }

  getPlantById(id: number): Observable<any> {
    return this.http.get(`${APIConstant.plantGetById}?id=${id}`);
  }

  // Create a new Tank
  plantAdd(payload: any): Observable<any> {
    return this.http.post(`${APIConstant.plantAdd}`, payload);
  }

  // Update an existing Tank
  plantEdit(data: any): Observable<any> {
    return this.http.post(`${APIConstant.plantEdit}`, data);
  }

  // Delete a Tank
  plantDelete(id: number) {
    return this.http.get(`${APIConstant.plantDelete}` + "?id=" + id);
  }

}
