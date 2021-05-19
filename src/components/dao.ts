export interface TExam {
    SubjectID: number,
    StreamNum: number,
    SubjectName: string,
    ExamDateTime: string
}

export interface TExamCenter {
    ExamCenterID: number;
    Name: string;
}

export interface TPlacement {
    ID: number,
    ExamCenterID: number,
    ExamID: number,
    SpecDemID: number,
    EntrantID: number,
    SectorNum: number,
    TableNum: number,
    BarcodePageNum: number,
    BarcodeNum: number,
    ExtraActionType: number,
    ScriptID: number,
    RealSubjectID: number,
    EntrantName: string,
    ExamPaperNum: string,
    BID: number,
    BarcodeID: number,
    ActBarcodeID: number
}

export function examCenterName(ec: TExamCenter) {
    return `${ec.ExamCenterID}-${ec.Name}`
}

export interface ds {
    exam: TExam;
    examCenter: TExamCenter;
    candidates: TPlacement[];
}
