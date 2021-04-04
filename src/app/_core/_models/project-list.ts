export interface ProjectList {
  id: string;
  requestFormId: string;
  system: string;
  desc: string;
  applicant: string;
  pIC: string;
  requestFormNo: string;
  requestFormDesc: string;
  stage: string;
  userExpectedDate: string;
  stageEstimateFinish:string;
  stageActualFinish: string;
  testDateEstimate: string;
  applyDate: string;
  memo: string;
  memo2: string;
  fileName: string;
  week: string;
  weekId: string;
  createBy: string;
  isNormal: boolean;
  isExclude: boolean;
  createAt: Date;
}
