"use client";
import { BsBellFill, BsPersonCircle } from "react-icons/bs";
import { BsPaperclip } from "react-icons/bs";
import { BsSendArrowDown } from "react-icons/bs";
import Mic from "@/assets/Mic";

import { useState } from "react";
import Link from "next/link";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

import PieChart from "@/components/charts/Piechart";

Chart.register(CategoryScale);
let name = "Guest"

export default function page() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [userVisuals, setUserVisuals] = useState(false);
  const [showAISuggest, setShowAISuggest] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ["Red", "Orange", "Blue"],
    datasets: [
      {
        label: "Users Gained ",
        data: [55, 23, 96],
        backgroundColor: [
          // "rgba(75,192,192,1)", // Teal
          "#ecf0f1", // Light Gray
          // "#50AF95", // Green
          "#F4BE37", // Yellow
          "#3F56FF", // Blue
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const showFDashboard = (e) => {
    setShowDashboard(true);
    setUserVisuals(false);
  };

  const showSuggestions = (e) => {
    setUserVisuals(true);
    setShowDashboard(false);
  }

  return (
    <>
      <main className="relative bg-background p-5 h-screen overflow-hidden">
        <header className="relative flex items-start justify-between h-28 mb-3">
          <div className="fixed bg-gold rounded-full h-40 w-40 top-[-5%] left-[-14%]"></div>
          <div></div>
          <nav className="flex gap-5 items-center">
            <BsBellFill className="text-2xl text-header" />
            <BsPersonCircle className="text-3xl text-header" />
          </nav>
        </header>
        <section>
          <h1 className="text-4xl mb-5 font-extrabold text-header tracking-tighter">
            Welcome,
            <br /> {name}
          </h1>
          <div className="bg-gold flex items-center justify-evenly h-10 w-full mb-3 *:rounded-[20px_20px_0_0] rounded-[20px_20px_0_0]">
            <p
              onClick={showFDashboard}
              className={`${showDashboard ? "bg-blue" : "bg-gold"} text-white w-full h-full p-2 text-center font-semibold rounded-lg`}
            >
              Dashboard
            </p>
            <p
              onClick={showSuggestions} 
              className={`${userVisuals ? "bg-blue" : "bg-gold"} text-white w-full h-full p-2 text-center font-semibold rounded-lg`}>
              Custom
            </p>
          </div>
          {showDashboard && (
            <div className="grid grid-cols-2 gap-3 justify-center items-center *:rounded-2xl *:bg-white *:p-3 h-full w-full drop-shadow-[0_0_15px_rgb(0,0,0,0.15)]">
              <PieChart
                chartData={chartData}
                className="h-full w-full"
                onClick={() => setShowAISuggest(!showAISuggest)}
              />
              <PieChart
                chartData={chartData}
                className="h-full w-full"
                onClick={() => setShowAISuggest(!showAISuggest)}
              />
            </div>
          )}
          {userVisuals && ""}
        </section>

        <article className="absolute h-screen w-screen"></article>

        <footer className="fixed bottom-10 w-full">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="flex items-center bg-white rounded-3xl px-4 h-14 w-9/12 drop-shadow-[0_0_20px_rgb(0,0,0,0.25)]">
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <BsPaperclip className="text-4xl text-header p-1 rounded-full bg-btnWhite" />
                  <input
                    type="file"
                    className="top-[-3%] absolute w-8 opacity-0"
                  />
                </div>
                <inptu
                  type="text"
                  className="text-lg w-full mr-2"
                  placeholder="Ask me anything!"
                />
              </div>
              <Mic output="text-4xl text-header p-2.5 rounded-full bg-btnWhite" />
            </div>
            <button
              type="submit"
              className="relative h-14 w-14 rounded-full bg-navbar"
            >
              <BsSendArrowDown className="absolute text-3xl text-btnWhite top-3.5 left-2.5" />
            </button>
          </form>
        </footer>
      </main>
      {showAISuggest && 
      <main className="absolute z-50 bg-white h-screen w-screen"> 

      </main>}
    </>
  );
}

// function View() {
//   return (
//     <article className="fixed h-screen w-screen bg-background -z-10">
//       <h1 className="text-3xl text-header">Dashboard</h1>
//     </article>
//   )
// }
