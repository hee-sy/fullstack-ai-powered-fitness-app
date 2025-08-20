import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import { ActivityList } from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import RotatingText from "./style_components/TextAnimations/RotatingText/RotatingText";
import DotGrid from "./style_components/Backgrounds/DotGrid/DotGrid";
import GlareHover from "./style_components/Animations/GlareHover/GlareHover";
import CardNav from "./style_components/Components/CardNav/CardNav";

const ActivitiesPage = ({ inputRef }: { inputRef: React.Ref<HTMLSelectElement> }) => {
  return (
    <div
      id="activities-page"
      className="flex flex-col items-center mt-28 md:mt-50"
    >
      <ActivityForm
        onActivityAdded={() => window.location.reload()}
        ref={inputRef}
      />
      <ActivityList />
    </div>
  );
};

function App() {
  const { token, tokenData, logIn, logOut } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);
  const inputRef = useRef<HTMLSelectElement | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const focusFirstInput = () => {
    navigate("/activities"); // Navigate to the /activities route
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus(); // Focus the input field after navigation
      }
    }, 60); // Delay to ensure the page has rendered
  };

  const navItems = [
    {
      label: "Settings",
      bgColor: "#615fff",
      textColor: "#fff",
      links: [{ label: "Logout", ariaLabel: "Log Out", onClick: () => logOut() }],
    },
  ];

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <>
      {!token ? (
        <div
          id="login-page"
          className="flex flex-col items-center justify-center h-screen w-full relative"
        >
          <div className="absolute inset-0  -z-10 opacity-50">
            <DotGrid
              dotSize={7}
              gap={15}
              baseColor="#e0e7ff"
              activeColor="#615fff"
              proximity={120}
              shockRadius={250}
              shockStrength={5}
              resistance={750}
              returnDuration={1.5}
            />
          </div>
          <p className="flex flex-col md:flex-row mb-6 mx-2 items-center text-2xl md:text-3xl font-bold">
            <span className="me-2">
              Your <span className="text-indigo-500">Personal</span> Fitness
            </span>
            <RotatingText
              texts={["App", "Tracker", "Coach", "Teacher!"]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-indigo-200 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </p>
          {/* star border, glare hover */}
          <GlareHover
            glareColor="#F0F5FF"
            borderRadius="30px"
            borderColor="transparent"
            background="transparent"
            width="min-content"
            height="min-content"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
          >
            <button
              onClick={() => logIn()}
              className="text-nowrap text-white hover:cursor-pointer text-lg md:text-xl py-4 px-6 font-bold bg-gradient-to-r w-full from-indigo-400 to-indigo-800"
            >
              Sign in now!
            </button>
          </GlareHover>
        </div>
      ) : (
        <div id="home-page">
          {/* <pre>{JSON.stringify(tokenData, null, 2)}</pre> */}
          <CardNav
            logo={"src/assets/logo.svg"}
            logoAlt="Company Logo"
            onClickLogo={() => navigate("/")}
            items={navItems}
            baseColor="#fff"
            menuColor="#615fff"
            buttonBgColor="#615fff"
            buttonTextColor="#fff"
            ease="power3.out"
            onGetStartedClick={focusFirstInput}
          />
          <Routes>
            <Route
              path="/activities"
              element={<ActivitiesPage inputRef={inputRef} />}
            />
            <Route
              path="/activities/:id"
              element={<ActivityDetail />}
            />
            <Route
              path="/"
              element={
                token ? (
                  <Navigate
                    to="/activities"
                    replace
                  />
                ) : (
                  <div>Welcome! Please Login.</div>
                )
              }
            />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
