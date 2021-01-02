import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://localhost:5000';
  readonly PhotoUrl = 'http://localhost:5000/images';

  constructor(private http: HttpClient) { }

  getDepList():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/departments').pipe(map(data => {
      let depList = data.result;
      
      return depList.map(depItem => ({ 
        departmentId: depItem.department_id,
        departmentName: depItem.department_name
      }))
    }));
  }

  addNewDepartment(departmentName:string) {
    const body = new HttpParams()
    .set('department_name', departmentName);

    return this.http.post(this.APIUrl + '/departments', body);
  }

  updateDepartment(data:any) {
    const body = new HttpParams()
    .set('department_id', data.departmentId.toString())
    .set('department_name', data.departmentName.toString());

    return this.http.put(this.APIUrl + '/departments', body);
  } 

  deleteDepartment(departmentId:any) {
    const params = new HttpParams()
    .set('department_id', departmentId.toString());

    const httpOptions = {
      params
    };

    return this.http.delete(this.APIUrl + '/departments', httpOptions);
  }

  getEmpList():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/employees').pipe(map(data => {
      const employeeList = data.result;

      return employeeList.map(employeeItem => ({
        employeeId: employeeItem.employee_id,
        employeeName: employeeItem.employee_name,
        department: employeeItem.department,
        dateOfJoining: employeeItem.date_of_joining,
        photoFileName: employeeItem.photo_file
      }))
    }));
  }

  addNewEmployee(val:any) {
    return this.http.post(this.APIUrl + '/employees', val);
  }

  updateEmployee(val:any) {
    return this.http.put(this.APIUrl + '/employees', val);
  } 

  deleteEmployee(val:any) {
    return this.http.delete(this.APIUrl + '/employees', val);
  }

  uploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/employees/upload-image', val)
  }

  getAllDepartmentNames():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + 'employees/department-names');
  }
}
