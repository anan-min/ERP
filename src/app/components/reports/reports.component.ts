import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Report } from '../../modules/data';
import { ReportService } from '../../services/report/report.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Reports List</h2>
      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Report Name</th>
            <th>Report Data</th>
            <th>User ID</th>
            <th>Updated At</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let report of reports">
            <td>{{ report.report_id }}</td>
            <td>{{ report.report_name }}</td>
            <td>{{ report.report_data }}</td>
            <td>{{ report.user_id }}</td>
            <td>{{ this.formatDate(report.updated_at) }}</td>
            <td>{{ this.formatDate(report.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './reports.component.css',
})
export class ReportsComponent {
  reports: Report[] = [];
  reportService = inject(ReportService);

  constructor() {}
  ngOnInit(): void {
    this.loadReport();
    this.reports.sort((a, b) => a.report_id - b.report_id);
  }

  private loadReport(): void {
    this.reportService.getAllReports().then((reports) => {
      this.reports = reports;
    });
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Return date in yyyy-mm-dd format
  }
}
