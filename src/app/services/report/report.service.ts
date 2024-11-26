import { Injectable } from '@angular/core';
import { Report } from '../../modules/data';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  url = 'http://localhost:3000/reports';
  constructor() {}

  async getAllReports(): Promise<Report[]> {
    const response = await fetch(this.url);
    const data = (await response.json()) ?? [];
    return data.map((report: any) => this.parseReport(report)) ?? [];
  }

  async getReport(): Promise<Report> {
    const response = await fetch(this.url);
    const data = (await response.json()) ?? null;
    return this.parseReport(data) ?? null;
  }

  async deleteReport(id: Number): Promise<void> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
  }

  private parseReport(report: any): Report {
    return {
      report_id: report.report_id ?? 0,
      report_name: report.report_name ?? '-',
      report_data: report.report_data ?? '-',
      user_id: report.user_id ?? 0,
      created_at: new Date(report.created_at),
      updated_at: new Date(report.updated_at),
    };
  }
}
