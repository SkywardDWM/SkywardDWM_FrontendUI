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
export class TaskService {
    get() {
        throw new Error('Method not implemented.');
    }
    toggleActivate(id: number, isActive: boolean) {
        throw new Error('Method not implemented.');
    }

    constructor(private http: HttpClient,
        private _baseService: BaseService) { }

        getTasksById(id: number, pageIndex: number, pageSize: number) {
          return this.http.get(`${APIConstant.taskList}/Byactivity/${id}/paged?pageIndex=${pageIndex}&pageSize=${pageSize}`);
      }
      
      downloadFile(taskId: number, fileName: string): void {
        this.http.get(`${APIConstant.taskAttachmentDownload}/${taskId}/${fileName}`, {
          responseType: 'blob'
        }).subscribe(
          (response) => {
            const blob = new Blob([response], { type: 'application/octet-stream' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
          },
          (error) => {
            console.error('Download error', error);
          }
        );
      }
          // updateHoliday(payload: any) {
    //     return this.http.post(`${APIConstant.holidayEdit}`, payload);
    // }
    // addHoliday(payload: any) {
    //     return this.http.post(`${APIConstant.holidayAdd}`, payload);
    // }
    // getHolidayById(id: number) {
    //     return this.http.get(`${APIConstant.holidayGetById}?id=${id}`);
    // }
    // deleteHoliday(id: number) {
    //     return this.http.delete(`${APIConstant.holidayDelete}?id=${id}`);
    // }
    // getPlantsList() {
    //     // return this.http.get(this.BaseUrl + "/Plant/GetAllPlants");
    //     return this.http.get(`${APIConstant.plantList}`);
    // }

    getTaskData(pageNumber: number, size: number) {
        return this.http.get(`${APIConstant.taskList}`, {
            params: {
                page: pageNumber.toString(),
                size: size.toString()
            }
        });
    }
}