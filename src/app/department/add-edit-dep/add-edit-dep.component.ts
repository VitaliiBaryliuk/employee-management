import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {
  @Input() dep: any;
  @Output() closeClick = new EventEmitter();

  departmentId: string;
  departmentName: string;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.departmentId = this.dep.departmentId;
    this.departmentName = this.dep.departmentName;
  }

  addDepartment() {
    this.service.addNewDepartment(this.departmentName).subscribe(res => {
      //@ts-ignore
      this.closeClick.emit();
    });
  }

  updateDepartment() {
    this.service.updateDepartment({
      departmentId: this.departmentId,
      departmentName: this.departmentName
    }).subscribe();
  }
}
