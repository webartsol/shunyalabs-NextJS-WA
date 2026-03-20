"use client";
import { RealtimePage } from "../modules/realtime/pages/RealtimePage";
import Navbar from "../Layouts/Navbar";
import MainFooter from "../Layouts/MainFooter";

export default function Realtime() {
  return (
    <>
      <div className="relative z-0 min-h-screen bg-[#0B0B0F] overflow-hidden text-white pt-24">
        <Navbar />
        <RealtimePage />
      </div>
      <MainFooter />
    </>
  );
}
