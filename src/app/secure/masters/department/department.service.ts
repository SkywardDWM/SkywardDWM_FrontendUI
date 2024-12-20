import { Injectable } from "@angular/core";
import { CRUDService, BaseService } from "@app-core";
import { Role } from "@app-models";
import { APIConstant } from '@app-core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Department } from "src/app/model/department";
@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    get() {
        throw new Error('Method not implemented.');
    }
    toggleActivate(id: number, isActive: boolean) {
        throw new Error('Method not implemented.');
    }

    constructor(private http: HttpClient,
        private _baseService: BaseService) { }

    getDepartment() {
        return this.http.get(`${APIConstant.departmentList}`);
    }
    updateDepartment(payload: any) {
        return this.http.post(`${APIConstant.departmentEdit}`, payload);
    }
    addDepartment(payload: any) {
        return this.http.post(`${APIConstant.departmentAdd}`, payload);
    }
    getDepartmentById(id: number) {
        return this.http.get(`${APIConstant.departmentGetById}?id=${id}`);
    }
    deleteDepartment(id: number) {
        debugger
        return this.http.delete(`${APIConstant.departmentDelete}?id=${id}`);
    }
    getPlantsList() {
        // return this.http.get(this.BaseUrl + "/Plant/GetAllPlants");
        return this.http.get(`${APIConstant.plantList}`);
    }
    getUserList() {
        // return this.http.get(this.BaseUrl + "/Plant/GetAllPlants");
        return this.http.get(`${APIConstant.UserList}`);
    }
}