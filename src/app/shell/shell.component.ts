import {Component, OnInit} from '@angular/core';
import {slideInAnimation} from '../shared/route-animation';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [slideInAnimation]
})
export class ShellComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
