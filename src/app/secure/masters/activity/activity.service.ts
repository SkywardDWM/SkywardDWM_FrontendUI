import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIConstant, BaseService } from "@app-core";
import { forkJoin, Observable } from "rxjs";
import { Activity } from "src/app/model/activity";

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    get() {
        throw new Error('Method not implemented.');
    }
    toggleActivate(id: number, isActive: boolean) {
        throw new Error('Method not implemented.');
    }

    constructor(private http: HttpClient,
        private _baseService: BaseService) { }

        // getTasksById(id: number, ) {
        //     return this.http.get(`${APIConstant.taskList}/Byactivity/${id}/paged?pageIndex=${pageIndex}&pageSize=${pageSize}`);
        // }

    getActivityList(pageIndex: number, pageSize: number) {
        return this.http.get(`${APIConstant.activityList}/paged?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    }
    getFrequenciesList() {
        return this.http.get(`${APIConstant.frequencyList}`);
    }
    getNatureOfWorksList() {
        return this.http.get(`${APIConstant.natureOfWorkList}`);
    }
    getUnitOfMeasuresList() {
        return this.http.get(`${APIConstant.unitOfMeasureList}`);
    }
    getPlantsList() {
        // return this.http.get(this.BaseUrl + "/Plant/GetAllPlants");
        return this.http.get(`${APIConstant.plantList}`);
    }
    getdepartmentsList() {
        return this.http.get(`${APIConstant.departmentList}`);
    }
    getJobRole() {
        return this.http.get(`${APIConstant.jobRoleList}`);
    }
    addActivity(activityData: Activity) {
        return this.http.post(`${APIConstant.activityAdd}`, activityData);
    }
    getActivityById(id: number) {
        return this.http.get(`${APIConstant.activityGetById}?id=${id}`);
    }
      
    // uploadFile(formData: FormData): Observable<{ filePath: string; fileName: string }> {
    //     const url = `${APIConstant.baseUrl}/task/attachments/upload`; // Use APIConstant for base URL
    //     return this.http.post<{ filePath: string; fileName: string }>(url, formData);
    // }
    // uploadFiles(files: File[]): Observable<{ filePath: string; fileName: string }[]> {
    //     const uploadRequests = files.map((file) => {
    //       const formData = new FormData();
    //       formData.append('file', file);
    //       return this.uploadFile(formData); // Correct method call
    //     });
    
    //     return forkJoin(uploadRequests); // Execute all requests in parallel
    //   }
    updateActivity(activityData: Activity) {
        return this.http.post(`${APIConstant.activityEdit}`, activityData);
    }
    DeleteActivity(id: number) {
        return this.http.delete(`${APIConstant.activityDelete}?id=${id}`);
    }
    downloadFile(activityId: number, fileName: string): void {
        debugger
        this.http.get(`${APIConstant.activityAttachmentDownload}/${activityId}/${fileName}`, {
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
}