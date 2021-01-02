import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
  employeeList: any[] = [];
  modalTitle: string;
  activateAddEditEmpComp: boolean = false;
  emp: any;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.refreshEmpList();
  }
  
  refreshEmpList() {
    this.service.getEmpList().subscribe(data => {
      this.employeeList = data;
    })
  }

  addClick() {
    this.emp = {
      employeeId: 0,
      employeeName: '',
      department: '',
      dateOfJoining: '',
      photoFileName: 'anonimus.png'
    };

    this.modalTitle = 'Add Employee';
    this.activateAddEditEmpComp = true;
  }

  closeClick() {
    this.activateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  editClick(item) {
    this.emp = item;
    this.modalTitle = 'Edit Employee';
    this.activateAddEditEmpComp = true;
  }

  deleteClick(item) {
    if (confirm('Are you sure?')) {
      this.service.deleteDepartment(item.departmentId).subscribe(res => {
        this.refreshEmpList();
      });
    }
  }
} 