import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    imports: [],
    templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
 @Input() loadingText: string = 'Loading Faculty Data...';
  @Input() height: number = 200;
  @Input() width: number = 300;
}
