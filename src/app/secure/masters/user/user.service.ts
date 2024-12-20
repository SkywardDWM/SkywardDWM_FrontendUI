import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIConstant, BaseService, CRUDService } from "@app-core";
import { List, User } from "@app-models";
import { Observable } from "rxjs";
import { BulkUploadResponse } from "src/app/model/BulkUploadResponse";

@Injectable()
export class UserService extends CRUDService<User> {

    constructor(private _baseService: BaseService, private http: HttpClient,) {
        super(_baseService, "user");
    }

    getReportsToUsers(townId: number, excludeUserId: number): Observable<List[]> {
        return this._baseService.get(`${APIConstant.account}/gettownusers/${townId}/${excludeUserId}`);
    }
    // Method to get paginated user data
    getUsers(pageIndex: number, pageSize: number): Observable<any> {
        return this._baseService.get(`${APIConstant.user}/paged?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    }
    assignRole(userId: number, role: string): Observable<any> {
        return this._baseService.post(`${APIConstant.user}/${userId}/assign-role?role=${role}`, {});
    }
    removeRole(userId: number, role: string): Observable<any> {
        return this._baseService.post(`${APIConstant.user}/${userId}/remove-role?role=${role}`, {});
    }
    getRoles(userId: number): Observable<string[]> {
        return this._baseService.get(`${APIConstant.user}/${userId}/roles`);
    }
    deleteUser(id: number): Observable<any> {
        return this._baseService.delete(`${APIConstant.UserList}/${id}`);
    }
    getPlantList() {
        return this.http.get(`${APIConstant.plantList}`);
    }
    getDepartmentList() {
        return this.http.get(`${APIConstant.departmentList}`);
    }
     // Bulk upload method
    bulkUpload(users: any[]): Observable<BulkUploadResponse> {
        return this.http.post<BulkUploadResponse>(`${APIConstant.usersExcelList}`, users);
    }
}