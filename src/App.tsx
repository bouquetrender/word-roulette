import { useEffect, useState } from "react";
import { WordsProvider } from "./store";
import MainPanel from "./Panel";
import Loading from "./components/screenLoading";

const App = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const span = document.createElement("span");
    span.innerText = "testdom";
    span.id = "test-span";
    Object.assign(span.style, {
      visibility: "hidden",
      fontFamily: "HarmonyOS",
      position: "absolute",
      top: "-9999px",
      left: "-9999px",
    });
    document.body.appendChild(span);
    const isFontLoaded = () => {
      const { fontFamily } = window.getComputedStyle(span);
      return fontFamily === "HarmonyOS";
    };
    const intervalId = setInterval(() => {
      if (isFontLoaded()) {
        setIsFontLoaded(true);
        clearInterval(intervalId);
        document.body.removeChild(span);
      }
    }, 100);
  }, []);

  if (isFontLoaded) {
    return (
      <>
        <WordsProvider>
          <MainPanel />
        </WordsProvider>
      </>
    );
  }

  return <Loading spining />;
};

export default App;
