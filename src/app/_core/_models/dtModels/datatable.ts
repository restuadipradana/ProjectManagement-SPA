export interface SearchCriteriaDT {
  isPageLoad: boolean;
  filter: string;
}

export class ResponseDT {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
