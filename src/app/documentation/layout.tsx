import Navbar from "@/app/Layouts/Navbar";
import Sidebar from "../Layouts/documentation-components/Sidebar";
import MainFooter from "../Layouts/MainFooter";

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className="solution-bg min-h-screen flex flex-col hide-scrollbar ">
      {/* Navbar fixed on top */}
      <Navbar />

      <div className="flex flex-1 text-gray-700 overflow-hidden">
        {/* ===== Sidebar ===== */}
        <aside
          className="
            w-64 ms-3 bg-[#F5F5F5] border rounded-tr-2xl p-4 
            sticky top-[90px] self-start h-[calc(100vh-100px)] 
            overflow-y-auto
          "
        >
          <Sidebar />
        </aside>

        {/* ===== Main Content ===== */}
        <div className="flex-1 mx-4 bg-white rounded-tl-2xl overflow-y-auto h-[calc(100vh-100px)] mt-[90px] p-10">
          {children}
        </div>
      </div>
    </div>
    <MainFooter/>
    </>
  );
}
