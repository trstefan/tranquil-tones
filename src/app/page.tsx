import { ModeToggle } from "@/components/Toggle";
import SoundPanel from "@/components/SoundPanel";

export default function Home() {
  return (
    <main className="w-ful h-full">
      <div className="flex flex-col justify-center items-center gap-[2rem] container">
        <div className="pt-[4rem] text-center">
          <div className="text-[32px] sm:text-[48px] lg:text-[72px] font-bold">
            Sleep Serenade
          </div>
          <div>
            “Moodlody is an app with nature sounds to help you focus, sleep,
            relax and relieve stress.”
            <ModeToggle />
          </div>
        </div>
        <div>
          <SoundPanel />
        </div>
      </div>
    </main>
  );
}