const zodiacData = [
    { sign: "Aries", start: "03/21", end: "04/19" },
    { sign: "Taurus", start: "04/20", end: "05/20" },
    { sign: "Gemini", start: "05/21", end: "06/20" },
    { sign: "Cancer", start: "06/21", end: "07/22" },
    { sign: "Leo", start: "07/23", end: "08/22" },
    { sign: "Virgo", start: "08/23", end: "09/22" },
    { sign: "Libra", start: "09/23", end: "10/22" },
    { sign: "Scorpio", start: "10/23", end: "11/21" },
    { sign: "Sagittarius", start: "11/22", end: "12/21" },
    { sign: "Capricorn", start: "12/22", end: "01/19" },
    { sign: "Aquarius", start: "01/20", end: "02/18" },
    { sign: "Pisces", start: "02/19", end: "03/20" }
];

const randomBirthdays = [
    "01/15", "02/03", "03/28", "04/12", "05/15", "06/22",
    "07/30", "08/08", "09/14", "10/31", "11/19", "12/25"
];

function parseDate(input) {
    input = input.trim();

    if(!/^\d{1,2}\/\d{1,2}$/.test(input)) {
        return null;
    }

    let [month, day] = input.split("/");
    return `${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
}

function getZodiacfromDate(date) {
    const [month, day] = date.split("/").map(Number);

    for (const z of zodiacData) {
        const [startMonth, startDay] = z.start.split("/").map(Number);
        const [endMonth, endDay] = z.end.split("/").map(Number);

        if (z.sign.startsWith("Capricorn")) {
            if ((month === 12 && day >= startDay) || (month === 1 && day <= endDay)) {
                return z;
            }
        }

        if (
            (month > startMonth || (month === startMonth && day >= startDay)) && 
            (month < endMonth || (month === endMonth && day <= endDay))
        ) {
            return z;
        }
    }

    return null;
}

function verbalize(){
    const input = document.getElementById("inputString").value;
    const parsedDate = parseDate(input);

    if(!parsedDate){
        document.getElementById("zodiacResult").innerHTML = "Invalid date format. Please use MM/DD.";
        return;
    }
    const zodiac = getZodiacfromDate(parsedDate);

    if (!zodiac) {
        document.getElementById("zodiacResult").innerHTML = "Could not determine zodiac sign.";
        return;
    }
    document.getElementById("zodiacResult").innerHTML = zodiac.sign;
}

function generateRandomBirthday(){
    const randomIndex = Math.floor(Math.random() * randomBirthdays.length);
    document.getElementById("inputString").value = randomBirthdays[randomIndex];
    verbalize();
}

function clearZodiac(){
    document.getElementById("inputString").value = "";
    document.getElementById("zodiacResult").innerHTML = "";
}
