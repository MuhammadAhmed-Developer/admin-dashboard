import { forwardRef } from "react";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { PiStudentBold } from "react-icons/pi";
import { RiComputerLine, RiPresentationFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-blue-950  drop-shadow-2xl border-r border-orange-500">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 h-auto rounded-full "
            src="/ferox-transparent.png"
            alt="company logo"
          />
        </picture>
      </div>

      <Link href="/">
        <div
          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            router.pathname === "/"
              ? "bg-orange-100 text-orange-100"
              : "text-orange-400 rounded-full hover:text-orange-500"
          }`}
        >
          <div className="mr-2">
            <AiOutlineDashboard className=" h-5 w-5" />
          </div>
          <div>
            <p className="text-3xl font-bold">Home</p>
          </div>
        </div>
      </Link>

      <div className="flex flex-col">
        <Link href="/students">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname === "/students"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 rounded-full hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <PiStudentBold className="h-5 w-5" />
            </div>
            <div>
              <p>Students</p>
            </div>
          </div>
        </Link>
        <Link href="/courses">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname === "/courses"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 rounded-full hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <RiComputerLine className="h-5 w-5" />
            </div>
            <div>
              <p>Courses</p>
            </div>
          </div>
        </Link>
        <Link href="/attendance">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname === "/attendance"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 rounded-full hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <RiPresentationFill className="h-5 w-5" />
            </div>
            <div>
              <p>Attendance</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
