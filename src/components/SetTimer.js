import React, { useState } from "react";
// import ShowTimer from "./ShowTimer";

function SetTimer() {
  const [date, setDate] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [dateArr, setDateArr] = useState([]);
  const [time, setTime] = useState(false);
  const [check, setCheck] = useState(false);

  // today date to set min attribute in input date
  let today = new Date();
  let dd = (today.getDate() + (check ? 0 : 1)).toString().padStart(2, 0);
  let mm = (today.getMonth() + 1).toString().padStart(2, 0);
  let yy = today.getFullYear().toString().padStart(2, 0);
  today = `${yy}-${mm}-${dd}`;

  setTimeout(() => {
    setTodayDate(new Date().getTime());
    // setTodayDate(new Date().toGMTString())
  }, 1000);

  const addDate = () => {
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
    setDateArr(dateArr.concat(userSelectedDate.getTime()));
    // console.log(dateArr);
    setDate("");
    setTime(false)
    setCheck(false)
  };
  return (
    <div className="bg-blue-100 min-h-[100vh] py-8 px-10">
      <form
        className="flex flex-col justify-center items-center gap-5"
        onSubmit={(e) => e.defaultPrevented()}
      >
        <h2 className="text-3xl font-bold">Set The Counter</h2>
        {/* Date */}
        <div className="md:flex justify-center items-center font-semibold text-2xl">
          <label htmlFor="date">
            <p>
              Select a date <b className="mr-2">:</b>
            </p>
          </label>

          <input
            className="mt-2 md:mt-0 py-2 px-4 rounded-md shadow-md bg-slate-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
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
            <span>Do you want to set custom time.</span>
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
            className={`${
              date.length === 0
                ? "bg-blue-900"
                : "from-blue-500 via-blue-600 to-blue-700"
            } text-2xl text-white bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center`}
            onClick={addDate}
            disabled={date.length === 0}
          >
            Set Counter
          </button>
        </div>
      </form>

      {/* Show Timer */}
      {dateArr.map((date, index) => {
        return (
          <div
            className="my-7 flex flex-col gap-3 items-center"
            key={index}
          >
            <section className="flex gap-2 min-w-[7rem] p-3 text-center  rounded-md shadow-md">
              <div className="flex flex-col gap-3">
                <div className="min-w-20 p-3 text-center bg-white rounded-md shadow-md text-xl font-bold">
                  {Math.floor((date - todayDate) / (1000 * 60 * 60 * 24))
                    .toString()
                    .padStart(2, 0)}
                </div>
                <div className="min-w-20 p-3 bg-slate-100 rounded-md shadow-md text-xl font-semibold">
                  Days
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="min-w-20 p-3 text-center bg-white rounded-md shadow-md text-xl font-bold">
                  {Math.floor(
                    ((date - todayDate) % (1000 * 60 * 60 * 24)) /
                      (1000 * 60 * 60)
                  )
                    .toString()
                    .padStart(2, 0)}
                </div>
                <div className="min-w-20 p-3 bg-slate-100 rounded-md shadow-md text-xl font-semibold">
                  Hrs
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="min-w-20 p-3 text-center bg-white rounded-md shadow-md text-xl font-bold">
                  {Math.floor(
                    ((date - todayDate) % (1000 * 60 * 60)) / (1000 * 60)
                  )
                    .toString()
                    .padStart(2, 0)}
                </div>
                <div className="min-w-20 p-3 bg-slate-100 rounded-md shadow-md text-xl font-semibold">
                  Min
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="min-w-20 p-3 text-center bg-white rounded-md shadow-md text-xl font-bold">
                  {Math.floor(((date - todayDate) % (1000 * 60)) / 1000)
                    .toString()
                    .padStart(2, 0)}
                </div>
                <div className="min-w-20 p-3 bg-slate-100 rounded-md shadow-md text-xl font-semibold">
                  Sec
                </div>
              </div>
            </section>
          </div>
        );
      })}
      {/* <ShowTimer days={days} hrs={hrs} mins={mins} secs={secs} /> */}
    </div>
  );
}

export default SetTimer;
