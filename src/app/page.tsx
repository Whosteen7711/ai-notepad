import TypewriterTitle from "@/components/typewriter-title";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bgGradient">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center mb-4">
          AI <span className="text-green-600 font-bold">Notepad</span>
        </h1>
        <h2 className=" font-semibold text-center text-3xl text-slate-700 mb-4">
          A simple tool that helps you write better!
        </h2>
        <h2 className=" font-semibold text-center text-3xl text-slate-700 mb-8">
          <TypewriterTitle />
        </h2>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className="bg-green-600">
              Dashboard{" "}
              <ArrowRight className=" ml-2 w-5 h-5 " strokeWidth={3} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
