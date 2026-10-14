export type Failure = {
    testName: string;
    file: string;
    status: string;
    errorMessage: string;
    attempts: number;
};