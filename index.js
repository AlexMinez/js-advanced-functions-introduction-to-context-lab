function createEmployeeRecord(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}
function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee

}
function hoursWorkedOnDate(employee, dateStamp){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === dateStamp
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })
    return (outEvent.hour - inEvent.hour) / 100
}
function wagesEarnedOnDate(employee, dateStamp){
    let wage = hoursWorkedOnDate(employee, dateStamp)
    * employee.payPerHour
    return parseFloat(wage.toString())
}
function allWagesFor(employee){
    let wage = employee.timeInEvents.map(function(e){
        return e.date
    })
    let newPay = wage.reduce(function (memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return newPay
}
function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}
function calculatePayroll(employee){
    return employee.reduce(function(memo, rec){
        return memo + allWagesFor(rec)

    },0)

}