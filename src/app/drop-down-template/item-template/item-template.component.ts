import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../Customer';

@Component({
  selector: 'app-item-template',
  templateUrl: './item-template.component.html',
  styleUrls: ['./item-template.component.css']
})
export class ItemTemplateComponent implements OnInit {
  @Input() dataContext: Customer;

  constructor() { }

  ngOnInit() {
  }

}
