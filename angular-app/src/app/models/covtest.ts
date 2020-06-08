import { User } from './user'

export class Covtest {
    _id: string;
    code: string;
    description: string;
    userHistory: string;
    userStatus: string;
    riskGroup: string;
    riskJob: string;
    testStatus: string;
    testResult: string;
    resultFile: string;
    schedule: string;
    saude24: boolean;
    user: User;
    updated_at: string;

    constructor(description: string, userHistory: string, riskGroup: string, riskJob: string, saude24: boolean, userStatus?: string, testStatus?: string, testResult?: string,
        resultFile?: string, schedule?: string) {

        this.description = description;
        this.userHistory = userHistory;
        this.userStatus = userStatus;
        this.riskGroup = riskGroup;
        this.riskJob = riskJob;
        this.testStatus = testStatus;
        this.testResult = testResult;
        this.resultFile = resultFile;
        this.schedule = schedule;
        this.saude24 = saude24;
        this.userStatus = userStatus;

    }
}
