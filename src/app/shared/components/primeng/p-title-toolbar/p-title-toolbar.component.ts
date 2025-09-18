import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-p-title-toolbar',
  templateUrl: './p-title-toolbar.component.html',
  styleUrls: ['./p-title-toolbar.component.css']
})
export class PTitleToolbarComponent implements OnInit {

  @Input() pageTitle: string = '';

  constructor() { }

  ngOnInit() {
  }

}
