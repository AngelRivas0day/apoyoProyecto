import { Component, OnInit } from '@angular/core';
import { GeneratorService } from 'src/app/core/services/generator.service';
import { EmployeeData } from 'src/app/core/models/employee.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  salesList: EmployeeData[] = [];
  bList: EmployeeData[] = [];

  constructor(
    private generatorService: GeneratorService
  ) { }

  ngOnInit() {
    this.salesList = this.generatorService.generate(['Angel','Alexandra','Layla','Xoch'],[10,20], 10);
    this.bList = this.generatorService.generate(['Alberto','Alexandra','Axel','Fernanda'],[15,25], 10);
  }

  addItem(list: EmployeeData[], label: string){
    list.unshift({
      label,
      num: this.generatorService.generateNumber([10,20])
    })
  }

}
