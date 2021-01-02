import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {
  @Input() emp: any;
  @Output() closeClick = new EventEmitter();

  employeeId: string;
  employeeName: string;
  department: string;
  dateOfJoining: string;
  photoFileName: string;
  photoFilePath: string;

  departmentList: any[];

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.loadDepartmentList();
    
    this.employeeId = this.emp.employeeId;
    this.employeeName = this.emp.employeeName;
    this.department = this.emp.department;
    this.dateOfJoining = this.emp.dateOfJoining;
    this.photoFileName = this.emp.photoFileName;
    
    this.photoFilePath = this.service.PhotoUrl + '/' + this.photoFileName;
  }

  loadDepartmentList() {
    this.service.getDepList().subscribe(data => {
      this.departmentList = data.map(departmentItem => departmentItem.departmentName);
    })
  }

  addEmployee() {
    const data = {
      employeeName: this.employeeName,
      department: this.department,
      dateOfJoining: this.dateOfJoining,
      photoFileName: this.photoFileName
    }

    this.service.addNewEmployee(data).subscribe(res => {
      this.closeClick.emit();
    });
  }

  updateEmployee() {
    const data = {
      employeeId: this.employeeId,
      employeeName: this.employeeName,
      department: this.department,
      dateOfJoining: this.dateOfJoining,
      photoFileName: this.photoFileName
    }

    this.service.updateEmployee(data).subscribe();
  }

  uploadPhoto(event) {
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);  

    this.service.uploadPhoto(formData).subscribe((data: any) => {
      this.photoFileName = data['image'].toString();
      console.log('this.service.PhotoUrl', this.service.PhotoUrl)
      this.photoFilePath = this.service.PhotoUrl + '/' + this.photoFileName;
    })
  }
}
