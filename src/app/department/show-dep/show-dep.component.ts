import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})

export class ShowDepComponent implements OnInit {
  departmentList: any[] = [];
  modalTitle: string;
  activateAddEditDeoComp: boolean = false;
  dep: any;

  departmentIdFilter: string = '';
  departmentNameFilter: string = '';
  departmentListWithoultFilter: any = [];

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList() {
    this.service.getDepList().subscribe(data => {
      this.departmentList = data;
      this.departmentListWithoultFilter = data;
    })
  }

  addClick() {
    this.dep = {
      departmentId: 0,
      departmentName: ''
    };

    this.modalTitle = 'Add Department';
    this.activateAddEditDeoComp = true;
  }

  closeClick() {
    this.activateAddEditDeoComp = false;
    this.refreshDepList();
  }

  editClick(item) {
    this.dep = item;
    this.modalTitle = 'Edit Department';
    this.activateAddEditDeoComp = true;
  }

  deleteClick(item) {
    if (confirm('Are you sure?')) {
      this.service.deleteDepartment(item.departmentId).subscribe(res => {
        this.refreshDepList();
      });
    }
  }

  filterFn() {
    const departmentIdFilter = this.departmentIdFilter;
    const departmentNameFilter = this.departmentNameFilter;

    this.departmentList = this.departmentListWithoultFilter.filter(el => {
      return el.departmentId.toString().toLowerCase().includes(departmentIdFilter.toString().toLowerCase().trim())
      && el.departmentName.toString().toLowerCase().includes(departmentNameFilter.toString().toLowerCase().trim())
    });
  }
  
  sortResult(prop, asc) {
    this.departmentList = this.departmentListWithoultFilter.sort((a,b) => {
      if (asc) {
        return (a[prop]>b[prop]) ? 1 : (a[prop]<b[prop]) ? -1 : 0;
      } else {
        return (b[prop]>a[prop]) ? 1 : (b[prop]<a[prop]) ? -1 : 0;
      }
    })
  }
}
