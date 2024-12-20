import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstant, BaseService } from '@app-core';

@Injectable({
  providedIn: 'root'
})
export class DragdropService {

  constructor(
    private http: HttpClient,
    private _baseService: BaseService
  ) { }

  getActivityTaskKanbanList() {
    return this.http.get(`${APIConstant.ActivityTaskKanbanList}`);
  }
    // addWeightCheck(playload){
    //   return this.http.post(`${APIConstant.weightcheckAdd}`,playload);
    // }

    updateActivityTask(playload){
      return this.http.post(`${APIConstant.ActivityTaskKanbanEdit}`,playload);
    }

    // getByIdWeightCheck(id : number){
    //   return this.http.get(`${APIConstant.weightcheckGetById}` + "?id=" + id);
    // }

    // DeleteWeightCheck(id : number){
    //   return this.http.get(`${APIConstant.weightcheckDelete}` + "?id=" + id);
    // }
  }
