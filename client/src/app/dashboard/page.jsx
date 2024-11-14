"use client";
import { 
  BsBellFill, BsPersonCircle, BsPaperclip,
  BsSendArrowDown, BsArrowLeft, BsGearFill    
} from "react-icons/bs";

// Images
import Mic from "@/assets/Mic";
import AILogo from "@/assets/AILogo";
import Dots from "@/assets/Dots.svg";

// Components
import Link from "next/link";
import Image from "next/image";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import PieChart from "@/components/charts/Piechart";

// React.js
import { useState } from "react";

Chart.register(CategoryScale);
let name = "Guest"; 

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
  };

  return (
    <>
      <main className="relative bg-background p-7 h-screen overflow-hidden">
        <Image src={Dots} className="absolute bottom-0 left-0 z-0" />
        <header className="relative flex items-start justify-between mb-5">
          <h1 className="text-4xl font-extrabold text-header tracking-tighter">
            Welcome, <br/> 
            {name}
          </h1>
          <nav className="flex mt-2 gap-4 items-center">
            <BsBellFill className="text-2xl text-darker-gray" />
            <BsPersonCircle className="text-3xl text-darker-gray " />
            <BsGearFill className="text-3xl text-darker-gray mr-3" />
          </nav>
        </header>
        <section>
          <Link href="/aichat"><button className="rounded-full py-2 px-4 border-2 border-blue text-blue font-semibold mb-8 hover:scale-[1em]">
            New Chat &nbsp;+
          </button></Link>
          {/* BUTTONS for Dashboard & Custom */}
          <div className="bg-gold flex items-center justify-evenly h-10 w-full mb-3 *:rounded-[20px_20px_0_0] rounded-[20px_20px_0_0]">
            <p
              onClick={showFDashboard}
              className={`${
                showDashboard ? "bg-blue" : "bg-gold"
              } text-white w-full h-full p-2 text-center font-semibold rounded-lg`}
            >
              Dashboard
            </p>
            <p
              onClick={showSuggestions}
              className={`${
                userVisuals ? "bg-blue" : "bg-gold"
              } text-white w-full h-full p-2 text-center font-semibold rounded-lg`}
            >
              Custom
            </p>
          </div>

          {/* THE CHARTS */}
          {showDashboard && (
            <div className="grid grid-cols-2 gap-3 justify-center items-center *:rounded-2xl *:bg-white *:p-3 h-full w-full drop-shadow-[0_0_20px_rgb(0,0,0,0.2)]">
              <div onClick={() => setShowAISuggest(!showAISuggest)}>
                <PieChart
                  chartData={chartData}
                  className="h-full w-full"
                />
              </div>
              <div onClick={() => setShowAISuggest(!showAISuggest)}>
                <PieChart
                  chartData={chartData}
                  className="h-full w-full"
                />
              </div>
            </div>
          )}
          {userVisuals && ""}
        </section>

        <article className="absolute h-screen w-screen"></article>

        <footer className="absolute z-20 bottom-8 w-full left-4 right-0 grid place-items-center">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <figure className="flex items-center bg-white rounded-3xl px-4 h-14 w-9/12 drop-shadow-[0_0_20px_rgb(0,0,0,0.25)]">
              <div className="relative">
                <BsPaperclip className="text-4xl text-header p-1 mr-3 rounded-full bg-btnWhite" />
                <input type="file" className="top-[-3%] absolute w-8 opacity-0" />
              </div>
              <input type="text" className="text-lg w-full mr-3" placeholder="Ask me anything!"/>
              <Mic output="text-4xl text-header p-2.5 rounded-full bg-btnWhite" />
            </figure>
            <button
              type="submit"
              className="relative h-14 w-14 rounded-full bg-blue"
            >
              <BsSendArrowDown className="absolute text-3xl text-btnWhite top-3.5 left-2.5" />
            </button>
          </form>
        </footer>
      </main>
      {showAISuggest && viewAISuggest({ setShowAISuggest }) }
    </>
  );
}

function viewAISuggest({ setShowAISuggest }) {
  return (
    <main className="absolute z-10 top-0 p-5 bg-white h-screen w-screen">
      <header className="mb-10">
        <BsArrowLeft 
          className="text-4xl text-header"
          onClick={()=> setShowAISuggest(prev => !prev)}
        />
      </header>
      <main>
        <h1 className="my-4 text-4xl font-extrabold text-header tracking-tighter">Sales Insight</h1>
        <p className="my-4 mx-2 flex items-start">
          <img 
            src="https://site-assets.fontawesome.com/releases/v6.6.0/svgs/solid/sparkles.svg"
            className="h-8 w-8 mr-4 pb-1 brightness-[1000%] inline-block"
          />
          <span className="leading-relaxed">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
            officia deserunt mollit anim id est laborum."
          </span>
        </p>
      </main>
    </main>
  );
}
