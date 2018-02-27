import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../Customer';


@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  @Input() customers: Array<Customer>;

  constructor() { }

  ngOnInit() {
    debugger;
    this.getCustomers();
  }

  getCustomers(): void{
    this.customers = new Array<Customer>();
     for(var index = 0; index < 5; index++){
       var cust = new Customer();
       cust.id = index + 1;
       cust.name = "Customer " + index;
       cust.description = "fawefa wer qwercq wr twert wrtwerewewrqwetc ertqert wertwqrtw etwerwer wetrwetertwetqrwtwqert";
       this.customers.push(cust);
     }
  }

}
