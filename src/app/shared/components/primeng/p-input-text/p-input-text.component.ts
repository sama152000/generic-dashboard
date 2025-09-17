import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-p-input-text',
  templateUrl: './p-input-text.component.html',
  styleUrls: ['./p-input-text.component.css']
})
export class PInputTextComponent implements OnInit {
  @Input() label: string = '';

  constructor() { }

  ngOnInit() {
  }

}
