import React, { useState } from "react";
import { useEffect } from "react";
// import ShowTimer from "./ShowTimer";

function SetTimer() {
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [dateArr, setDateArr] = useState([]);
  const [time, setTime] = useState("00:00");
  const [check, setCheck] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [editBtn, setEditBtn] = useState(false);
  // today date to set min attribute in input date
  let today = new Date();
  let dd = (today.getDate() + (check ? 0 : 1)).toString().padStart(2, 0);
  let mm = (today.getMonth() + 1).toString().padStart(2, 0);
  let yy = today.getFullYear().toString().padStart(2, 0);
  today = `${yy}-${mm}-${dd}`;

  setTimeout(() => {
    setTodayDate(new Date().getTime());
  }, 1000);

  const addDate = () => {
    let userSelectedDate = new Date(date);
    let userTargetDate = new Date(date);
    userSelectedDate.setHours(
      time ? Number.parseInt(time.toString().slice(0, 2)) : 0
    );
    userSelectedDate.setMinutes(
      time ? Number.parseInt(time.toString().slice(-2)) : 0
    );
    userSelectedDate.setSeconds(0);

    console.log(time ? time : "none");
    dateArr.unshift(userSelectedDate.getTime());
    let data = {
      date: userTargetDate.toGMTString().slice(0, 17),
      time: time,
      note: note,
      selectedDate: date,
    };
    localStorage.setItem(
      JSON.stringify(userSelectedDate.getTime()),
      JSON.stringify(data)
    );
    setDate("");
    setTime(false);
    setNote("");
    // setCheck(false);
  };

  const deleteDate = (id) => {
    // console.log(id);
    dateArr.splice(dateArr.indexOf(id), 1);
    localStorage.removeItem(id);
  };

  const editDate = (id) => {
    let date = JSON.parse(localStorage.getItem(id));
    let elemt = document.getElementById(String(id));
    let btn1 = elemt.lastElementChild.childNodes[1].lastChild.childNodes[1];
    let btn2 = elemt.lastElementChild.childNodes[1].lastChild.childNodes[2];
    btn1.classList.toggle("hidden");
    btn2.classList.toggle("hidden");
    setUpdateId(id);
    setDate(date.selectedDate.toString());
    setNote(date.note);
    setEditBtn(!editBtn);
  };

  const updateDate = () => {
    let data = JSON.parse(localStorage.getItem(updateId));
    data.note = note;
    localStorage.setItem(updateId, JSON.stringify(data));
    setNote("");
    setDate("");
    setEditBtn(false);
  };

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      dateArr.unshift(localStorage.key(JSON.parse(i)));
    }
    setDateArr(Array.from(new Set(dateArr.sort((a, b) => a - b))));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-yellow-500 min-h-[100vh] py-8 px-4">
      <form
        className="flex flex-col justify-center items-center md:items-center gap-5 my-5 w-10/12 m-auto"
        onSubmit={(e) => e.defaultPrevented()}
      >
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-purple-600">
            Manage Your Pricious Time
          </span>{" "}
          Using
        </h1>

        <h2 className="text-3xl font-bold">Set The Counter</h2>
        {/* Date */}
        <div className="md:flex justify-center items-center font-semibold text-2xl">
          <label htmlFor="date">
            <p>
              Select a date <b className="mr-2">:</b>
            </p>
          </label>

          <input
            className="w-56 mt-2 md:mt-0 py-2 px-4 rounded-md shadow-md bg-slate-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
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
            className="w-56 mt-2 md:mt-0 py-2 px-4 rounded-md shadow-md bg-slate-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 md:w-[49%] md:ml-1.5"
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
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className={`${editBtn ? "hidden" : ""} ${
              date.length === 0
                ? "bg-blue-900"
                : "from-blue-500 via-blue-600 to-blue-700"
            } text-2xl text-white bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center`}
            onClick={addDate}
            disabled={date.length === 0}
          >
            Set Counter
          </button>

          <button
            type="button"
            className={` ${editBtn ? "" : "hidden"} ${
              date.length === 0
                ? "bg-blue-900"
                : "from-blue-500 via-blue-600 to-blue-700"
            }  text-2xl text-white bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center`}
            onClick={updateDate}
            disabled={date.length === 0}
          >
            Update Counter
          </button>
        </div>
      </form>

      {/* Show Timer */}
      {dateArr.map((date, index) => {
        return (
          Math.sign(parseInt(date) - todayDate) === 1 && (
            <section
              id={date}
              key={index}
              className="h-36 md:h-44 w-full md:max-w-xl lg:max-w-2xl p-2 flex m-auto"
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

              <div className="bg-slate-800 w-[75%] rounded-r-lg flex items-center justify-center text-whitefont-bold text-white flex-col relative p-2">
                <div className="flex text-sm md:text-base md:pb-2">
                  <p>
                    <span className="font-semibold">Date&nbsp;</span>
                    {": " + JSON.parse(localStorage.getItem(date)).date}
                  </p>
                  <p
                    className={`${
                      JSON.parse(localStorage.getItem(date)).time === "00:00"
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <span className="font-semibold">&nbsp;Time</span>
                    {" : " + JSON.parse(localStorage.getItem(date)).time}
                  </p>
                </div>
                <div className="flex text-center gap-1">
                  <div>
                    <div
                      className={`bg-slate-600 w-[4.25rem] md:w-28 max-w-full text-center rounded-md shadow-md text-xl font-bold py-3 px-2 ${
                        Math.floor(
                          (date - todayDate) / (1000 * 60 * 60 * 24)
                        ).toString() < 1 &&
                        Math.floor(
                          ((date - todayDate) % (1000 * 60 * 60 * 24)) /
                            (1000 * 60 * 60)
                        ) < 1 &&
                        "text-orange-600"
                      }`}
                    >
                      {Math.floor(
                        ((date - todayDate) % (1000 * 60 * 60 * 24)) /
                          (1000 * 60 * 60)
                      )
                        .toString()
                        .padStart(2, 0)}
                    </div>
                    <div className="w-[4.25rem] md:w-28 max-w-full rounded-md shadow-md font-semibold">
                      Hrs
                    </div>
                  </div>
                  <div>
                    <div
                      className={`bg-slate-600 w-[4.25rem] md:w-28 max-w-full text-center rounded-md shadow-md text-xl font-bold py-3 px-2 ${
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
                    <div className="w-[4.25rem] md:w-28 max-w-full rounded-md shadow-md font-semibold">
                      Mins
                    </div>
                  </div>
                  <div>
                    <div
                      className={`bg-slate-600 w-[4.25rem] md:w-28 max-w-full text-center rounded-md shadow-md text-xl font-bold py-3 px-2 ${
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
                    <div className="w-[4.25rem] md:w-28 max-w-full rounded-md shadow-md font-semibold">
                      Secs
                    </div>
                  </div>
                  <div className="ml-1 flex flex-col justify-between">
                    {/* Delete-Btn */}
                    <button
                      onClick={() => {
                        deleteDate(date);
                      }}
                    >
                      <div className="text-orange-600 cursor-pointer rounded-full bg-slate-900 shadow-md hover:bg-slate-700 px-2 py-1 md:text-xl">
                        <i className="bi bi-trash"></i>
                      </div>
                    </button>

                    {/* Edit-Btn */}
                    <button
                      className=""
                      onClick={() => {
                        editDate(date);
                      }}
                    >
                      <div className="text-blue-400 cursor-pointer rounded-full bg-slate-900 shadow-md hover:bg-slate-700 px-2 py-1 md:text-xl">
                        <i className="bi bi-pencil-square"></i>
                      </div>
                    </button>

                    {/* Undo-Btn */}
                    <button
                      className="hidden"
                      onClick={() => {
                        editDate(date);
                        setNote("");
                        setDate("");
                      }}
                    >
                      <div className="text-blue-400 cursor-pointer rounded-full bg-slate-900 shadow-md hover:bg-slate-700 px-2 py-1 md:text-xl">
                        <i className="bi bi-arrow-counterclockwise"></i>
                      </div>
                    </button>
                  </div>
                </div>
                <p className="md:pt-2">
                  <span className="font-semibold">Msg : </span>
                  {JSON.parse(localStorage.getItem(date)).note}
                </p>
              </div>
            </section>
          )
        );
      })}
      {/* <ShowTimer /> */}
    </div>
  );
}

export default SetTimer;
