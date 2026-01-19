import { useNavigate } from "react-router-dom";
import DesktopBg from "../../assets/LandingBgDesktop.png";
import MobileBg from "../../assets/LandingBgMobile.png";
import TabletBg from "../../assets/LandingBgTablet.png"

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden">

      {/* Backgrounds */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat block md:hidden"
        style={{ backgroundImage: `url(${MobileBg})` }}
      />

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block lg:hidden"
        style={{ backgroundImage: `url(${TabletBg})` }}
      />

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url(${DesktopBg})` }}
      />

      <div className="relative flex items-center min-h-[100svh]">
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            grid
            grid-cols-2
            items-center
            gap-6
            md:gap-10
          "
        >
          {/* LEFT CONTENT */}
          <div>
            <h1
              className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 whitespace-nowrap leading-tight"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Smart Expense Tracker
            </h1>

            <p className="mt-3 sm:mt-4 md:mt-6 text-xs sm:text-sm md:text-lg text-gray-600 max-w-xl">
              Track your expenses with AI-powered insights and take full control
              of your finances effortlessly.
            </p>

            {/* BUTTONS */}
            <div
              className="
                mt-5
                sm:mt-6
                flex
                flex-row
                gap-3
                items-start
                sm:items-center
              "
            >
              <button
                onClick={() => navigate("/signup")}
                className="
                  w-fit
                  bg-emerald-500
                  hover:bg-emerald-600
                  text-white
                  px-2
                  py-1
                  sm:px-5
                  sm:py-2.5
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                Signup
              </button>

              <button
                onClick={() => navigate("/login")}
                className="
                  w-fit
                  border
                  border-gray-800
                  text-gray-800
                  hover:bg-gray-800
                  hover:text-white
                  px-2
                  py-1
                  sm:px-5
                  sm:py-2.5
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                Login
              </button>
            </div>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
