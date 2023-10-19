import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Drawer from "./components/drawer";
import ChangeLesson from "./ChangeLesson";
import About from "./About";
import Export from "./Export";

interface TopDrawer {
  open: boolean;
  onClose: () => void;
  gameStarted: boolean;
}

const superTitle = "Word Roulette".toUpperCase();
const changeLesson = "Change Lesson";
const exportTitle = "Export";
const aboutTitle = "About";

const TopDrawer = (props: TopDrawer) => {
  const [title, setTitle] = useState(superTitle);
  const [printIt, setPrintIt] = useState("Word Roulette");

  const btnList = [
    {
      disabled: props.gameStarted,
      content: changeLesson,
      onClick: () => {
        if (!props.gameStarted) {
          setTitle(changeLesson);
        }
      },
    },
    {
      content: exportTitle,
      onClick: () => {
        setTitle(exportTitle)
      },
    },
    {
      content: aboutTitle,
      onClick: () => {
        setTitle(aboutTitle);
      },
    },
    {
      content: "Exit",
      onClick: () => {
        props.onClose();
      },
    },
  ];

  const onClose = () => {
    props.onClose();

    setTimeout(() => {
      setTitle(superTitle);
    }, 500);
  };

  const onBack = useCallback(() => {
    setTitle(superTitle);
  }, []);

  useEffect(() => {
    if (!props.open) {
      setTitle(superTitle);
    }
  }, [props.open]);

  useLayoutEffect(() => {
    setPrintIt("");
    const delay = 20;
    let i = -1;

    const intervalId = setInterval(() => {
      if (i >= title.length) {
        clearInterval(intervalId);
        return;
      }
      setPrintIt((prevVal) => {
        return prevVal + title.charAt(i);
      });
      i++;
    }, delay);
  }, [title]);

  return (
    <Drawer
      shadowNode={true}
      open={props.open}
      onClose={onClose}
      position="top"
    >
      <div className="h-full w-4/5 min-[1040px]:w-1/2 mx-auto text-left flex justify-center flex-col pt-10 pb-10">
        <div className="text-4xl min-[1040px]:text-6xl mb-5 font-raleway select-none h-[60px] -mt-6">
          {printIt}
        </div>

        {title === superTitle &&
          btnList.map((btn) => (
            <div
              key={btn.content}
              className={`text-2xl mt-6 ${
                btn.disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={btn.onClick}
            >
              <span
                className={`${
                  btn.disabled ? "text-zinc-500" : "hover:underline"
                }`}
              >
                {btn.content}
              </span>
            </div>
          ))}

        {title === changeLesson && <ChangeLesson onBack={onBack} />}
        {title === aboutTitle && <About onBack={onBack} />}
        {title === exportTitle && <Export onBack={onBack} />}
      </div>
    </Drawer>
  );
};

export default TopDrawer;
