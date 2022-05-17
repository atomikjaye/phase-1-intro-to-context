// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  // Here we are destructuring the array
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrayOfEmployees) {
  // initialize employeeArray
  let employeeArray = []
  // forEach employee Array in the arrayOfEmployees, we push to employeeArray
  arrayOfEmployees.forEach(arrayOfEmployee => {
    employeeArray.push(createEmployeeRecord(arrayOfEmployee))
  })
  return employeeArray
}

function createTimeInEvent(employeeRecord, date) {
  //assign timeInEvents in employeeRecord to timeInEvents
  let timeInEvents = employeeRecord.timeInEvents
  // Here we grab the date arg and piece it together and assign it to the timeEvent variable
  let timeEvent = {
    type: "TimeIn",
    hour: parseInt(`${date.substr(11)}`),
    date: date.substr(0, 10)
  }
  // Now we push this object to timeInEvents array inside the employeeRecord
  timeInEvents.push(timeEvent)
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, date) {
  // same as timeInEvents
  //TODO: Should I make timeEvent in a function?
  let timeOutEvents = employeeRecord.timeOutEvents
  let timeEvent = {
    type: "TimeOut",
    hour: parseInt(`${date.substr(11)}`),
    date: date.substr(0, 10)
  }
  timeOutEvents.push(timeEvent)
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
  // assign timeIn and timeOut to the first timeEvent that holds that date (should be only date) in array
  // and grab the hour from them
  let timeIn = employeeRecord.timeInEvents.find(timeInEvent => timeInEvent.date === date).hour
  let timeOut = employeeRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date).hour
  // subtract hours and divide by 100 since we are only needing the hours 1800 - 1000 = 800 / 100 = 8 hrs
  let totalHours = (timeOut - timeIn) / 100
  return totalHours
}

function wagesEarnedOnDate(employeeRecord, date) {
  // Retrive totalHours from previous function and multiply it by the pay perHour for the employee
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
  // initialize totalWages to 0 (returns undefined if we dont tell js what we expect)
  let totalWages = 0;
  // for each TimeInEvent, we will add the wagesEarned for that date.
  employeeRecord.timeInEvents.forEach(timeInEvent => {
    totalWages += wagesEarnedOnDate(employeeRecord, timeInEvent.date)
  })
  return totalWages
}

function calculatePayroll(allEmployeeRecords) {
  // initialize totalPayroll to 0 (returns undefined if we dont tell js what we expect)
  let totalPayroll = 0;
  // for each EmployyRecord, we go into the TimeInEvents array and for each entry in the TimeInEvents array,
  // we add the totalWages.. 
  //TODO: I feel like we can use allWagesFor for this area.
  allEmployeeRecords.forEach(employee => employee.timeInEvents.forEach(timeInEvent => {
    totalPayroll += wagesEarnedOnDate(employee, timeInEvent.date)
  }))
  return totalPayroll
}
