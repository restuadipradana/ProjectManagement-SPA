export interface ProjectList {
  id: string;
  requestFormId: string;
  system: string;
  desc: string;
  applicant: string;
  pIC: string;
  stageId: string;
  userExpectedDate: string;
  stageEstimateFinish:string;
  stageActualFinish: string;
  testDateEstimate: string;
  applyDate: string;
  memo: string;
  memo2: string;
  fileName: string;
  createBy: string;
  isNormal: boolean;
  isExclude: boolean;
  idWeek: string;
  createdAt: Date;
}
