import { Component, OnInit } from '@angular/core';
import { Trm } from '@shared/model/trm';

import { TrmService } from '@shared/service/trm.service';

@Component({
  selector: 'app-trm',
  templateUrl: './trm.component.html',
  styleUrls: ['./trm.component.scss']
})
export class TrmComponent implements OnInit {
  currentTrm: Trm;

  constructor(private trmService: TrmService) {
    this.currentTrm = this.trmService.currenTrmValue;
  }

  ngOnInit(): void {
    console.log('trm works', this.currentTrm);
  }

}
