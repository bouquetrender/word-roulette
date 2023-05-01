import { useContext, useState } from "react";
import { ReactSVG } from "react-svg";
import { motion } from "framer-motion";
import ForgetWordsList from "./components/forgetWordsList";
import useWordManager from "./hooks/useWordManager";
import TopDrawer from "./TopDrawer";

import { WordsContext, WordsDispatchContext } from "./store";
import vocabulary from "./store/dict";
import Loading from "./components/screenLoading";
import { useDebounceEffect, useMount, useReactive } from "ahooks";

import SoundIcon from "./assest/sound.svg";

type DrawerOpenStatus = {
  top?: boolean;
  left?: boolean;
  right?: boolean;
};

const buttonVariants = (type: "left" | "right") => {
  return {
    hidden: {
      opacity: 0,
      x: type === "right" ? 30 : -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "linear",
        duration: 0,
      },
    },
  };
};

const title = "Word Roulette";

const MainPanel = () => {
  const store = useContext(WordsContext);
  const dispatch = useContext(WordsDispatchContext);
  const [loading, setLoading] = useState(true);

  const drawerOpenStatus = useReactive<DrawerOpenStatus>({
    top: false,
  });

  const [switchContainer, setSwitchContainer] = useState(false);

  const {
    btnText,
    state,
    currentWord,
    currentWordGroup,
    rouletteNext,
    restart,
    mark,
  } = useWordManager();

  useMount(() => {
    dispatch({
      type: "initalVocabulary",
      val: vocabulary,
    });

    setLoading(false);
  });

  useDebounceEffect(
    () => {
      const handleKeyDown = (event: { key: string }) => {
        if (event.key.toLocaleLowerCase() === "escape") {
          drawerOpenStatus.top = !drawerOpenStatus.top;
        } else if (event.key.toLocaleLowerCase() === "arrowright") {
          rouletteNext();
        } else if (event.key.toLocaleLowerCase() === "r") {
          restart();
        } else if (state && event.key.toLocaleLowerCase() === "m") {
          onSpeak();
        }
      };

      window.addEventListener("keydown", handleKeyDown, false);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    [state, currentWordGroup],
    { wait: 0 }
  );

  let pecent = 0;
  if (store.words)
    pecent = ((currentWordGroup.length + 1) / (store.words.length + 1)) * 100;

  const onViewWordMeaning = () => {
    window.open(
      // `https://translate.google.com/?source=gtx&sl=en&tl=zh-CN&text=${currentWord}&op=translate`,
      `https://fanyi.baidu.com/#en/zh/${currentWord}`,
      "_blank"
    );
  };

  const onSwitch = () => {
    setSwitchContainer(!switchContainer);
  };

  const onChangeDrawerOpen = (
    side: keyof DrawerOpenStatus,
    status: boolean
  ) => {
    drawerOpenStatus[side] = status;
  };

  const topButtons = [
    {
      content: "Setting",
      onClickFn: () => {
        onChangeDrawerOpen("top", true);
      },
      extendsClass: "",
    },
  ];

  const onSpeak = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = currentWord;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Loading spining={loading}>
      <div className="flex flex-col h-screen">
        {/* top */}
        <div className="flex flex-col flex-shrink-0 h-44 bg-gray-500 items-center justify-center shadow-md z-10">
          <div className="w-full text-4xl mb-5 text-center font-raleway">
            {title.toUpperCase()}
          </div>

          <div className="w-full flex justify-center items-center">
            {topButtons.map((item) => (
              <div
                key={item.content}
                onClick={item.onClickFn}
                className={`transition duration-200 ease-in-out hover:bg-gray-300 hover:text-gray-700 w-36 text-center border-2 border-gray-300 py-1 px-2 rounded cursor-pointer ${
                  item.extendsClass || ""
                }`}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>

        {/* middle */}
        <div className="flex flex-1 relative overflow-auto">
          <div className="absolute w-full text-center top-5">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={onSwitch}
                checked={switchContainer}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#485b75]"></div>
            </label>
          </div>
          <motion.div
            key={+switchContainer}
            className={`flex flex-col flex-1 items-center justify-center transition duration-400 ease-in-out`}
            animate={{
              backgroundColor: switchContainer ? "#2e3e54" : "#485b75",
              transition: { duration: 0.4 },
            }}
            initial={{
              backgroundColor: switchContainer ? "#485b75" : "#2e3e54",
            }}
            transition={{ duration: 0.4 }}
          >
            {switchContainer ? (
              <ForgetWordsList />
            ) : (
              <>
                {state && (
                  <ReactSVG
                    onClick={onSpeak}
                    src={SoundIcon}
                    className="opacity-85 mb-2 cursor-pointer"
                  />
                )}
                <motion.div
                  key={currentWord}
                  className="text-5xl sm:text-7xl text-zinc-200 sm:px-16 max-w-6xl text-center "
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  {currentWord}
                </motion.div>
                {state && (
                  <div
                    className="mt-6 cursor-pointer opacity-30 hover:opacity-70 transition duration-200 ease-in-out"
                    onClick={onViewWordMeaning}
                  >
                    Read word meanings
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* bottom */}
        <div className="flex flex-col flex-shrink-0 h-44 bg-gray-500 items-center justify-center z-10 shadow-md-top">
          <div className="w-full text-center">
            {state && (
              <motion.button
                variants={buttonVariants("left")}
                initial="hidden"
                animate="visible"
                disabled={switchContainer}
                onClick={mark}
                className={`transition duration-600 w-28 rounded p-3 mr-5 focus-visible:outline-slate-400 focus-visible:outline-1 focus-visible:outline ${
                  switchContainer
                    ? "bg-[#8c8c8c] active:bg-[#8c8c8c] cursor-not-allowed"
                    : "bg-slate-600 active:bg-slate-800"
                }`}
              >
                {`Forget`}
              </motion.button>
            )}
            <button
              disabled={switchContainer}
              onClick={rouletteNext}
              className={`transition duration-600 w-28 rounded p-3 focus-visible:outline-slate-400 focus-visible:outline-1 focus-visible:outline ${
                switchContainer
                  ? "bg-[#8c8c8c] active:bg-[#8c8c8c] cursor-not-allowed"
                  : "bg-slate-700 active:bg-slate-800"
              }`}
            >
              {btnText}
            </button>
            {state && (
              <motion.button
                variants={buttonVariants("right")}
                initial="hidden"
                animate="visible"
                disabled={switchContainer}
                onClick={restart}
                className={`transition duration-600 w-28 rounded p-3 ml-5 focus-visible:outline-slate-400 focus-visible:outline-1 focus-visible:outline ${
                  switchContainer
                    ? "bg-[#8c8c8c] active:bg-[#8c8c8c] cursor-not-allowed"
                    : "bg-slate-600 active:bg-slate-800"
                }`}
              >
                Reset
              </motion.button>
            )}
          </div>

          {store.words && (
            <div className="mt-4 mb-4">
              {!state
                ? "Loading Completed"
                : `${currentWordGroup.length + 1}/${store.words.length}`}
            </div>
          )}

          <div className="w-56 bg-gray-200 rounded-full h-2.5 rotate-180">
            <div
              className=" bg-slate-700 h-2.5 rounded-full"
              style={{
                width: `${state ? pecent : 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <TopDrawer
        gameStarted={state}
        onClose={() => {
          onChangeDrawerOpen("top", false);
        }}
        open={drawerOpenStatus.top as boolean}
      />
    </Loading>
  );
};

export default MainPanel;
