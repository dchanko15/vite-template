export function numPad(n, width) {
    n = n + '';
    return n.length >= width ? n :
        new Array(width - n.length + 1).join('0') + n;
}

export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function removeNumberFormat(numStr) {
    let s = "";
    if (numStr)
        s = numStr.replace(/[^\d.-]/g, '');
    return s;
}

export function dateYMDT(cdate) {
    let cdateStr = "";
    if (!cdate) {
        cdate = new Date();
    }
    try {
        let dd = cdate.getDate();
        let mm = cdate.getMonth();
        let yyyy = cdate.getFullYear();
        let hh = cdate.getHours();
        let mi = cdate.getMinutes();
        let ss = cdate.getSeconds();
        cdateStr = yyyy + "-" + numPad(mm + 1, 2) + "-" + numPad(dd, 2) + " " + numPad(hh, 2) + ":" + numPad(mi, 2) + ":" + numPad(ss, 2);
    } catch (e) {
        cdateStr = cdate ? cdate.toString() : "";
    }
    return cdateStr;
}

export function dateDMY(cdate) {
    let cdateStr = "";
    if (!cdate) {
        cdate = new Date();
    }
    try {
        let dd = cdate.getDate();
        let mm = cdate.getMonth();
        let yyyy = cdate.getFullYear();
        let hh = cdate.getHours();
        let mi = cdate.getMinutes();
        let ss = cdate.getSeconds();
        cdateStr = numPad(dd, 2) + "/" + numPad(mm + 1, 2) + "/" + yyyy + " " + numPad(hh, 2) + ":" + numPad(mi, 2) + ":" + numPad(ss, 2);

    } catch (e) {
        cdateStr = cdate ? cdate.toString() : "";
    }
    return cdateStr;
}

export function isValidDate(dateStr) {
    let day;
    let month;
    let year;
    let parts = dateStr.split(/[\/.]/);

    if (parts.length < 3)
        return false;
    if (isNumeric(parts[0]) && isNumeric(parts[1]) && (!parts[2] || isNumeric(parts[2]))) {
        day = +parts[0];
        month = +parts[1];
        year = +parts[2];
    } else
        return false;

    if (month < 1 || month > 12) { // check month range
        console.error("Month must be between 1 and 12");
        return false;
    }
    if (day < 1 || day > 31) {
        console.error("Day must be between 1 and 31");
        return false;
    }
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
        console.error("Month " + month + " doesn't have 31 days!")
        return false;
    }
    if (month === 2) { // check for february 29th
        let isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
        if (day > 29 || (day === 29 && !isleap)) {
            console.error("February " + year + " doesn't have " + day + " days!");
            return false;
        }
    }
    return true;  // date is valid
}

export function IsValidTime(timeStr) {
    let hour = -1;
    let minute = -1;
    let second = -1;

    if (!timeStr)
        return true;

    let parts = timeStr.split(':');
    if (parts.length < 2)
        return false;
    if (isNumeric(parts[0]) && isNumeric(parts[1]) && (!parts[2] || isNumeric(parts[2]))) {
        hour = +parts[0];
        minute = +parts[1];
        second = +(parts[2] || 0);
    } else
        return false;


    // 24-hour time format
    if (hour < 0 || hour > 23) {
        console.log("Invalid value for hours: " + hours)
        return false
    }

    if (minute < 0 || minute > 59) {
        console.log("Invalid value for minutes: " + minute);
        return false;
    }

    if (second < 0 || second > 59) {
        console.log("Invalid value for seconds: " + second);
        return false;
    }

    return true;
}

export function date_DMY_ISO(value) {

    let datePart = "";
    let timePart = "";
    let parts = "";
    try {
        if (!value)
            return "";

        parts = value.split(' ');

        if (parts.length === 1) {
            datePart = parts[0];
            timePart = "";
        }
        if (parts.length === 2) {
            datePart = parts[0];
            timePart = parts[1];
        }


        parts = datePart.split(/[\/.]/);
        if (parts.length !== 3)
            return "";

        let day = numPad(+parts[0], 2);
        let month = numPad(+parts[1], 2);
        let year = +parts[2];

        let dateStr = `${year}-${month}-${day}`

        parts = timePart.split(/[:]/);

        if (parts.length !== 2)
            return dateStr;

        let hour = numPad(+parts[0], 2);
        let min = numPad(+parts[1], 2);

        let timeStr = `${hour}:${min}`;

        dateStr = dateStr + ' ' + timeStr;

        return dateStr;

    } catch (e) {
        console.error(e.message);
        return "";
    }

}