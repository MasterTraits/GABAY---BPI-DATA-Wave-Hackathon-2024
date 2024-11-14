import Image from "next/image";
import Dots from "@/assets/Dots.svg";
import { BsSendArrowDown } from "react-icons/bs";
import Mic from "@/assets/Mic";
import "./app.module.css"

export default function Home() {
  return (
    <main className="h-screen flex items-center overflow-hidden p-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section>
        <h1 className="w-3/4 ml-2 text-4xl font-bold tracking-tight mb-6">
          Harness the Power of Data with
          <b className="text-[40px] gradient-custom">&nbsp;GABAY</b>
        </h1>
        <div className="w-full pb-5">
          <form>
            <div className="flex items-center gap-2 bg-white rounded-3xl px-4 h-14 drop-shadow-[0_0_20px_rgb(0,0,0,0.25)]">
              <div className="flex gap-4 items-center w-full">
                <input
                  type="text"
                  className="mx-2 text-lg w-full"
                  placeholder="Empower your Business"
                />
              </div>
              <Mic output="text-4xl text-header p-2.5 rounded-full bg-btnWhite" />
              <BsSendArrowDown className="text-4xl bg-btnWhite p-1.5 rounded-full h-10 w-14" />
            </div>
          </form>
        </div>
        <div className="flex gap-3">
          <button class="btn" type="button">
            <strong className="cuzImStrong">CSV</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>
          <button class="btn" type="button">
            <strong className="cuzImStrong">PDF</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>
          <button class="btn" type="button">
            <strong className="cuzImStrong">Spreadsheet</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>
        </div>
      </section>
      <article className="relative">
        <div className="fixed items-center justify-center w-56 h-56 top-[-15%] left-[-25%] bg-blue rounded-full"></div>
        <Image src={Dots} className="fixed top-0 right-0" alt="Dots" />
        <div className="fixed bg-gold w-56 h-72 top-5 right-[-40%] rounded-full"></div>
        <Image src={Dots} className="fixed bottom-0 left-0" alt="Dots" />
        <div className="fixed bg-blue w-72 h-96 right-[-10%] bottom-[-15%] rounded-full"></div>
      </article>
    </main>
  );
}
