import fs from 'node:fs';
import { Failure } from '../types/failure';
import stripAnsi from 'strip-ansi';

const reportPath = 'test-results/results.json';

const reportContent = fs.readFileSync(
    reportPath,
    'utf-8'
);

const report = JSON.parse(reportContent);

const failures: Failure[] = [];

function processSuite(suite: any): void {

    for (const spec of suite.specs ?? []) {

        for (const test of spec.tests ?? []) {

            const failedResults = (test.results ?? []).filter(
                (result: any) => result.status === 'failed'
            );

            if (failedResults.length === 0) {
                continue;
            }

            const lastFailure =
                failedResults[failedResults.length - 1];

            failures.push({
                testName: spec.title,
                file: spec.file,
                status: 'failed',
                errorMessage: stripAnsi(
                    lastFailure.error?.message ??
                    lastFailure.errors?.[0]?.message ??
                    'No error message available'
                ),
                attempts: test.results.length
            });
        }
    }

    for (const childSuite of suite.suites ?? []) {
        processSuite(childSuite);
    }
}

for (const suite of report.suites ?? []) {
    processSuite(suite);
}

console.log(
    JSON.stringify(failures, null, 2)
);