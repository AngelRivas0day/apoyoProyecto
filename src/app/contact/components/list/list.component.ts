import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { EmployeeData } from '../../../core/models/employee.model';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  @Input() title: string;
  @Input() data: EmployeeData[] = [];
  @Output() add = new EventEmitter<string>();
  label: string;

  constructor() { }

  ngOnInit(): void {
  }

  addItem(){
    // this.data.push({
    //   label: this.label,
    //   num: 30
    // });
    // con esto lo que hacemos es enviar la data al componente padre que es el que se encarga
    // de hacer las peticiones de datos
    this.add.emit(this.label);
    this.label = '';
  }

}
