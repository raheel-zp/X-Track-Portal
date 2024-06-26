export default class Common {
    static empty = (val) => {

        // test results
        //---------------
        // []        true, empty array
        // {}        true, empty object
        // null      true
        // undefined true
        // ""        true, empty string
        // ''        true, empty string
        // 0         false, number
        // true      false, boolean
        // false     false, boolean
        // Date      false
        // function  false

        if (val === undefined)
            return true;

        if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
            return false;

        if (val == null || val.length === 0)        // null or 0 length array
            return true;

        if (typeof (val) == "object") {
            // empty object

            var r = true;

            for (var f in val)
                r = false;

            return r;
        }

        return false;
    }
    static numberIsZero = (val) => {
        return typeof (val) == 'number' && Number(val) <= 0 ? true : false;
    }
    static ConverDateToSQLFormat = (date, seprator) => {

        if (date === undefined || date === null || date === '')
            return '';

        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join(seprator);
    }
    static removeDataByID = (data, level, id) => {
        var index = data.findIndex(function (o) {
            return o[id] === level;
        })
        if (index !== -1)
            data.splice(index, 1);
        return data;
    }

    static validateEmail = (email) => {
        console.log(email);
        // Basic email validation using regex
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        //const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    static passwordValidate = (value) => {
       return (value.length >= 6) ? false : true;
    };

    static mobileNumberLengthValidate = (value) => {
        return (value.length == 11) ? false : true;
     };

}