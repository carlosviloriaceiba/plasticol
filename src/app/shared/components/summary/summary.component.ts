import { Component, OnInit } from '@angular/core';
import { Summary } from '@shared/model/summary';
import { SummaryService } from '@shared/service/summary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: []
})
export class SummaryComponent implements OnInit {
  public summarys: Observable<Summary[]>;

  constructor(private summaryService: SummaryService) { }

  ngOnInit(): void {
    this.summarys = this.summaryService.consultarSummary();
  }

}
