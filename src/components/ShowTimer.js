import React from "react";

function ShowTimer(props) {
  const { days, hrs, mins, secs } = props;
  return (
    <div className="my-7 flex flex-col gap-3 items-center  text-4xl font-semibold">
      <section
        className={`${days === "00" || days === "" ? "hidden" : "flex"} gap-2`}
      >
        <div className="min-w-[7rem] p-3 text-center bg-white rounded-md shadow-md">
          {days}
        </div>
        <div className="w-28 p-3 bg-slate-100 rounded-md shadow-md">Days</div>
      </section>

      <section className={`${hrs === "" ? "hidden" : "flex"} gap-2`}>
        <div className="min-w-[7rem] p-3 text-center bg-white rounded-md shadow-md">
          {hrs}
        </div>
        <div className="w-28 p-3 bg-slate-100 rounded-md shadow-md">Hrs</div>
      </section>

      <section className={`${mins === "" ? "hidden" : "flex"} gap-2`}>
        <div className="min-w-[7rem] p-3 text-center bg-white rounded-md shadow-md">
          {mins}
        </div>
        <div className="w-28 p-3 bg-slate-100 rounded-md shadow-md">Mins</div>
      </section>

      <section className={`${secs === "" ? "hidden" : "flex"} gap-2`}>
        <div className="min-w-[7rem] p-3 text-center bg-white rounded-md shadow-md">
          {secs}
        </div>
        <div className="w-28 p-3 bg-slate-100 rounded-md shadow-md">Secs</div>
      </section>
    </div>
  );
}

export default ShowTimer;
