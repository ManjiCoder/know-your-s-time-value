import React from "react";

function ShowTimer() {
  return (
    <section className="h-36  w-full md:w-[45%] p-2 flex m-auto">
      <div className="bg-cyan-800 w-[35%] flex flex-col items-center justify-center rounded-l-lg">
        <div className="bg-slate-50 w-[70%] rounded-tr-lg rounded-tl-lg h-6 mb-0.5 text-base font-semibold grid place-items-center">
          Days
        </div>
        <div className="bg-slate-100 w-[70%] rounded-br-lg rounded-bl-lg h-16 grid place-items-center font-bold text-3xl">
          00
        </div>
      </div>
      <div className="bg-slate-700 w-[75%] rounded-r-lg flex items-center justify-center text-whitefont-bold text-white">
        <div className="flex text-center gap-1">
          <div>
            <div className="bg-slate-600 w-20 md:w-28 max-w-full text-center rounded-md shadow-md text-xl font-bold py-3 px-2">
              00
            </div>
            <div className="w-20 md:w-28 max-w-full rounded-md shadow-md text-xl font-semibold">
              Days
            </div>
          </div>
          <div>
            <div className="bg-slate-600 w-20 md:w-28 max-w-full text-center rounded-md shadow-md text-xl font-bold py-3 px-2">
              00
            </div>
            <div className="w-20 md:w-28 max-w-full rounded-md shadow-md text-xl font-semibold">
              Days
            </div>
          </div>
          <div>
            <div className="bg-slate-600 w-20 md:w-28 max-w-full text-center rounded-md shadow-md text-xl font-bold py-3 px-2">
              00
            </div>
            <div className="w-20 md:w-28 max-w-full rounded-md shadow-md text-xl font-semibold">
              Days
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default ShowTimer;
