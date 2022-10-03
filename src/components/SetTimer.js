import React, { useState } from "react";
import ShowTimer from "./ShowTimer";

function SetTimer() {
  const [date, setDate] = useState("2022-10-04");
  const [time, setTime] = useState(false);
  const [check, setCheck] = useState(false);
  // const [timeDiff, setTimeDiff] = useState("");
  const [hrs, setHrs] = useState("");
  const [mins, setMins] = useState("");
  const [secs, setSecs] = useState("");
  const [days, setDays] = useState("");
  // today date to set min attribute in input date
  let today = new Date();
  let dd = (today.getDate() + (check ? 0 : 1)).toString().padStart(2, 0);
  let mm = (today.getMonth() + 1).toString().padStart(2, 0);
  let yy = today.getFullYear().toString().padStart(2, 0);
  today = `${yy}-${mm}-${dd}`;

  const setReminder = () => {
    console.log(date);
    let userSelectedDate = new Date(date);
    userSelectedDate.setHours(
      time ? Number.parseInt(time.toString().slice(0, 2)) : 0
    );
    userSelectedDate.setMinutes(
      time ? Number.parseInt(time.toString().slice(-2)) : 0
    );
    userSelectedDate.setSeconds(0);
    // console.log(userSelectedDate);

    // console.log(time);

    setInterval(() => {
      let todayDate = new Date();
      todayDate.getDate().toString().padStart(2, 0);
      todayDate.getHours().toString().padStart(2, 0);
      todayDate.getMinutes().toString().padStart(2, 0);
      todayDate.getSeconds().toString().padStart(2, 0);
      todayDate = todayDate.getTime();
      let diff = userSelectedDate - todayDate;
      // setTimeDiff(diff);
      // console.log(diff);

      // logic to calculate remaining time
      setDays(
        Math.floor(diff / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, 0)
      );
      setHrs(
        Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          .toString()
          .padStart(2, 0)
      );
      setMins(
        Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, 0)
      );
      setSecs(
        Math.floor((diff % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, 0)
      );
    }, 1000);
    // setInterval(calculateTime, 1000);
    /*if (timeDiff > 0) {
      console.log("big  then 0");
    }
    if (timeDiff === 0) {
      console.log("the time is come get ready to fight");
    } else {
      console.log("less then 0");
    }*/
  };
  return (
    <div className="bg-blue-100 min-h-[100vh] py-8 px-10">
      <form
        className="flex flex-col justify-center items-center gap-5"
        onSubmit={(e) => e.defaultPrevented()}
      >
        <h2 className="text-3xl">Set The Counter</h2>
        {/* Date */}
        <div className="font-semibold text-2xl text-center">
          <label htmlFor="date">
            <p>
              Select a date <b>:</b>
            </p>
          </label>

          <input
            className="py-2 px-4 rounded-md shadow-md bg-slate-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            type="date"
            name=""
            id="date"
            min={today}
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>

        {/* checkbox */}
        <div className="flex items-center">
          <input
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 focus:outline-none rounded-sm"
            id="checkbox"
            type="checkbox"
            value={check}
            onClick={() => setCheck(!check)}
          />
          <label
            htmlFor="checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <span>Do you want to set custom time</span>
          </label>
        </div>

        {/* Time */}
        <div className={`${check ? "" : "transition-all invisible"}`}>
          <label htmlFor="time"></label>
          <input
            className={`py-2 px-4 rounded-md shadow-md bg-slate-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
            type="time"
            name=""
            id="time"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          />
        </div>

        {/* button */}
        <div>
          <button
            type="button"
            className="text-2xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center"
            onClick={setReminder}
          >
            Set Counter
          </button>
        </div>
      </form>

      {/* Show Timer */}
      <ShowTimer days={days} hrs={hrs} mins={mins} secs={secs} />
    </div>
  );
}

export default SetTimer;
