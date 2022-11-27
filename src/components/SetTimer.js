import React, { useState } from "react";
import { useEffect } from "react";
// import ShowTimer from "./ShowTimer";

function SetTimer() {
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
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
    let userTargetDate = userSelectedDate;
    userSelectedDate.setHours(
      time ? Number.parseInt(time.toString().slice(0, 2)) : 0
    );
    userSelectedDate.setMinutes(
      time ? Number.parseInt(time.toString().slice(-2)) : 0
    );
    userSelectedDate.setSeconds(0);
    // console.log(userSelectedDate);

    // console.log(time);
    dateArr.unshift(userSelectedDate.getTime());
    let data = {
      date: userTargetDate.toGMTString().slice(0, 17),
      note: note,
    };
    localStorage.setItem(
      JSON.stringify(userSelectedDate.getTime()),
      JSON.stringify(data)
    );
    // console.log(dateArr);
    setDate("");
    setTime(false);
    setNote("");
    // setCheck(false);
  };

  const deleteDate = (id) => {
    console.log(id);
  };
  const editDate = (id) => {
    let today = new Date(JSON.parse(id));
    console.log(id, today);
    let dd = (today.getDate() + (check ? 0 : 1)).toString().padStart(2, 0);
    let mm = (today.getMonth() + 1).toString().padStart(2, 0);
    let yy = today.getFullYear().toString().padStart(2, 0);
    setDate(`${yy}-${mm}-${dd}`);
  };
  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      // console.log(localStorage.key(i));
      dateArr.unshift(localStorage.key(JSON.parse(i)));
    }
    setDateArr(Array.from(new Set(dateArr.sort((a, b) => a - b))));
    // console.log(dateArr);
    // console.log(localStorage);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-yellow-500 min-h-[100vh] py-8 px-4">
      <form
        className="flex flex-col justify-center md:items-center gap-5 my-5 items-start w-10/12 m-auto"
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

        {/* Note */}
        <div className="md:flex justify-center items-center font-semibold text-2xl">
          <label htmlFor="note">
            <p>
              Enter a note <b className="mr-2">:</b>
            </p>
          </label>

          <input
            className="mt-2 md:mt-0 py-2 px-4 rounded-md shadow-md bg-slate-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 md:w-[49%] md:ml-1.5"
            type="text"
            name=""
            id="note"
            onChange={(e) => setNote(e.target.value)}
            value={note}
            placeholder="Enter Your Note"
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
            className="ml-2 text-sm font-medium text-gray-900"
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
          <section
            id={date}
            key={index}
            className={`h-36 md:h-44  w-full md:max-w-xl lg:max-w-2xl p-2 flex m-auto ${
              Math.sign(Math.floor(date - todayDate)) === -1 ? "hidden" : ""
            }`}
          >
            <div className="bg-cyan-800 w-[35%] flex flex-col items-center justify-center rounded-l-lg">
              <div className="text-xs md:text-xl font-bold mb-1 text-white">
                {JSON.parse(localStorage.getItem(date)).date}
              </div>
              <div className="bg-slate-50 w-[70%] rounded-tr-lg rounded-tl-lg h-6 mb-0.5 text-base font-bold grid place-items-center">
                Days
              </div>
              <div
                className={`bg-slate-100 w-[70%] rounded-br-lg rounded-bl-lg h-16 grid place-items-center font-bold text-4xl ${
                  Math.floor(
                    (date - todayDate) / (1000 * 60 * 60 * 24)
                  ).toString() < 1 && "text-red-700"
                }`}
              >
                {Math.floor((date - todayDate) / (1000 * 60 * 60 * 24))
                  .toString()
                  .padStart(2, 0)}
              </div>
            </div>

            <div className="bg-slate-800 w-[75%] rounded-r-lg flex items-center justify-center text-whitefont-bold text-white flex-col">
              <div className="-mt-2 mb-2">
                <i className="bi-alarm mr-2 text-xl"></i>
                <span>{JSON.parse(localStorage.getItem(date)).note}</span>
              </div>
              <div className="flex text-center gap-1">
                <div>
                  <div
                    className={`bg-slate-600 w-20 md:w-28 max-w-full text-center rounded-md shadow-md text-xl font-bold py-3 px-2 ${
                      Math.floor(
                        ((date - todayDate) % (1000 * 60 * 60 * 24)) /
                          (1000 * 60 * 60)
                      ) < 1 && "text-orange-600"
                    }`}
                  >
                    {Math.floor(
                      ((date - todayDate) % (1000 * 60 * 60 * 24)) /
                        (1000 * 60 * 60)
                    )
                      .toString()
                      .padStart(2, 0)}
                  </div>
                  <div className="w-20 md:w-28 max-w-full rounded-md shadow-md font-semibold">
                    Hrs
                  </div>
                </div>
                <div>
                  <div
                    className={`bg-slate-600 w-20 md:w-28 max-w-full text-center rounded-md shadow-md text-xl font-bold py-3 px-2 ${
                      Math.floor(
                        ((date - todayDate) % (1000 * 60 * 60 * 24)) /
                          (1000 * 60 * 60)
                      ) < 1 &&
                      Math.floor(
                        ((date - todayDate) % (1000 * 60 * 60)) / (1000 * 60)
                      ) < 1 &&
                      "text-orange-600"
                    }`}
                  >
                    {Math.floor(
                      ((date - todayDate) % (1000 * 60 * 60)) / (1000 * 60)
                    )
                      .toString()
                      .padStart(2, 0)}
                  </div>
                  <div className="w-20 md:w-28 max-w-full rounded-md shadow-md font-semibold">
                    Mins
                  </div>
                </div>
                <div>
                  <div
                    className={`bg-slate-600 w-20 md:w-28 max-w-full text-center rounded-md shadow-md text-xl font-bold py-3 px-2 ${
                      Math.floor(
                        ((date - todayDate) % (1000 * 60 * 60 * 24)) /
                          (1000 * 60 * 60)
                      ) < 1 &&
                      Math.floor(
                        ((date - todayDate) % (1000 * 60 * 60)) / (1000 * 60)
                      ) < 1 &&
                      "text-orange-600"
                    }`}
                  >
                    {Math.floor(((date - todayDate) % (1000 * 60)) / 1000)
                      .toString()
                      .padStart(2, 0)}
                  </div>
                  <div className="w-20 md:w-28 max-w-full rounded-md shadow-md font-semibold">
                    Secs
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <button
                    onClick={() => {
                      deleteDate(date);
                    }}
                  >
                    <i className="cursor-pointer rounded-full bg-slate-900 shadow-md hover:bg-slate-700 px-2 py-1 md:text-xl bi bi-trash"></i>
                  </button>

                  <button
                    onClick={() => {
                      editDate(date);
                    }}
                  >
                    <i className="cursor-pointer rounded-full bg-slate-900 shadow-md hover:bg-slate-700 px-2 py-1 md:text-xl bi bi-pencil-square"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      {/* <ShowTimer /> */}
    </div>
  );
}

export default SetTimer;
