#!/usr/bin/env node

// Fill in your estimates here:
const assumedAvgUrlsGeneratedDaily = 100000000;
const assumedReadToWriteRatio = 10;
const assumedAvgUrlLength = 100;

const averageWriteOperationsPerSecond =
  assumedAvgUrlsGeneratedDaily / 24 / 3600;
console.log('Writes per second:', averageWriteOperationsPerSecond.toFixed(2));

const averageReadOperationsPerSecond =
  averageWriteOperationsPerSecond * assumedReadToWriteRatio;
console.log('Reads per second:', averageReadOperationsPerSecond.toFixed(2));

const avgSingleRecordSize = (() => {
  let bytes = 0;
  bytes += assumedAvgUrlLength;
  bytes += 7; // short urls 7 chars/bytes
  bytes += 8; // 64 bit int to keep count of link using
  return bytes;
})();
const yearlyStorageRequirement =
  assumedAvgUrlsGeneratedDaily * 365 * avgSingleRecordSize;

console.log(
  'Yearly storage requirment in TB:',
  (yearlyStorageRequirement / 1e12).toFixed(2),
);
