import { Pomodoro } from "@/components/Pomodoro";
import SoundPanel from "@/components/SoundPanel";

export default function Home() {
  return (
    <main className="w-ful h-full">
      <div className="flex flex-col justify-center items-center gap-[2rem] container">
        <div className="pt-[4rem] text-center">
          <div className="text-[32px] sm:text-[48px] lg:text-[72px] font-bold">
            <h1>Sleep Serenade</h1>
          </div>
          <div>
            <h2>
              Enhance Relaxation, Improve Sleep, and Boost Focus with Soothing
              Audio
            </h2>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center	">
          <Pomodoro />
          <SoundPanel />
        </div>
      </div>
    </main>
  );
}
