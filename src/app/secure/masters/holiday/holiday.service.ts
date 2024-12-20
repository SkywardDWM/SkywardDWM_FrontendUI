import { Injectable } from "@angular/core";
import { CRUDService, BaseService } from "@app-core";
import { Role } from "@app-models";
import { APIConstant } from '@app-core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Department } from "src/app/model/department";
import { Holiday } from "src/app/model/Holiday";
@Injectable({
    providedIn: 'root'
})
export class HolidayService {
    get() {
        throw new Error('Method not implemented.');
    }
    toggleActivate(id: number, isActive: boolean) {
        throw new Error('Method not implemented.');
    }

    constructor(private http: HttpClient,
        private _baseService: BaseService) { }

    getHoliday() {
        return this.http.get(`${APIConstant.holidayList}`);
    }
    updateHoliday(payload: any) {
        return this.http.post(`${APIConstant.holidayEdit}`, payload);
    }
    addHoliday(payload: any) {
        return this.http.post(`${APIConstant.holidayAdd}`, payload);
    }
    getHolidayById(id: number) {
        return this.http.get(`${APIConstant.holidayGetById}?id=${id}`);
    }
    deleteHoliday(id: number) {
        return this.http.delete(`${APIConstant.holidayDelete}?id=${id}`);
    }
    getPlantsList() {
        // return this.http.get(this.BaseUrl + "/Plant/GetAllPlants");
        return this.http.get(`${APIConstant.plantList}`);
    }
}