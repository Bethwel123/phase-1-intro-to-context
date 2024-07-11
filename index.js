// Your code here
function createEmployeeRecord(employeeArray) {
  let employee = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
}
function createEmployeeRecords(employeeArrays) {
  let employeeRecords = [];
  employeeArrays.forEach(function(employeeArray) {
    employeeRecords.push(createEmployeeRecord(employeeArray));
  });
  return employeeRecords;
}
function createTimeInEvent(employeeRecord, dateStamp) {
  let [year, month, day, hour] = dateStamp.split(/[- ]/);
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: `${year}-${month}-${day}`,
  });
  return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateStamp) {
  let [year, month, day, hour] = dateStamp.split(/[- ]/);
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: `${year}-${month}-${day}`,
  });
  return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, date) {
  let timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  let timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );
  if (timeOutEvent && timeInEvent) {
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  } else {
    return 0;
  }
}
function wagesEarnedOnDate(employeeRecord, date) {
  let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}
function allWagesFor(employeeRecord) {
  let dates = new Set(
    employeeRecord.timeInEvents.map((event) => event.date)
  );
  let wages = 0;
  for (const date of dates) {
    wages += wagesEarnedOnDate(employeeRecord, date);
  }
  return wages;
}
function calculatePayroll(employeeRecords) {
  let totalWages = 0;
  for (const employeeRecord of employeeRecords) {
    totalWages += allWagesFor(employeeRecord);
  }
  return totalWages;
}