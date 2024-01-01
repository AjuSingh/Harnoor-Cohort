const datefnstz = require("date-fns-tz");

function getCurrentTime() {
    setInterval(() => {
        const date = new Date();
        const clientTimeZone = 'Asia/Kolkata';
        const zonedDate = datefnstz.utcToZonedTime(date, clientTimeZone);
        const formattedDateTF = datefnstz.format(zonedDate, 'yyyy-MM-dd hh:mm:ss a', { timeZone: clientTimeZone });
        const formattedDate = datefnstz.format(zonedDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: clientTimeZone });
        console.log(formattedDateTF , formattedDate);
    }, 1000);
}

getCurrentTime();
