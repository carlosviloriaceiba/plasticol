import { Component, OnInit } from '@angular/core';
import { Trm } from '@shared/model/trm';

import { TrmService } from '@shared/service/trm.service';

@Component({
  selector: 'app-trm',
  templateUrl: './trm.component.html',
  styleUrls: []
})
export class TrmComponent implements OnInit {
  currentTrm: Trm[];

  constructor(private trmService: TrmService) {
    this.currentTrm = this.trmService.currenTrmValue;
  }

  ngOnInit(): void {
    if (!this.currentTrm) {
      this.trmService.mostrarTrm().subscribe((trm) => {
        this.currentTrm = trm;
        this.trmService.setTrm(trm);
      });
    }
  }

}
