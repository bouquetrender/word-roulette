import { useContext, useState } from "react";
import { useMount } from "ahooks";

import { motion } from "framer-motion";
import SelectLesson from "./components/select";
import ForgetWordsList from "./components/wordList";
import useWordManager from "./hooks/useWordManager";

import { WordsContext, WordsProvider, WordsDispatchContext } from "./store";
import vocabulary from "./store/dict";

const title = "WORD ROULETTE";

const Home = () => {
  const store = useContext(WordsContext);
  const dispatch = useContext(WordsDispatchContext);

  const [switchContainer, setSwitchContainer] = useState(false);

  useMount(() => {
    dispatch({
      type: "changeVocabulary",
      val: vocabulary,
    });
  });

  const {
    btnText,
    state,
    currentWord,
    currentWordGroup,
    rouletteNext,
    restart,
    mark,
  } = useWordManager();

  const pecent =
    ((currentWordGroup.length + 1) / (store.words.length + 1)) * 100;

  const onViewWordMeaning = () => {
    window.open(
      `https://www.dictionary.com/browse/${currentWord}`,
      "_blank"
    );
  };

  const onSwitch = () => {
    setSwitchContainer(!switchContainer);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* top */}
      <div className="flex flex-col flex-shrink-0 h-44 bg-gray-500 items-center justify-center shadow-md z-10">
        <div className="w-full text-4xl mb-5 text-center">{title}</div>

        <div className="w-full flex justify-center items-center">
          <SelectLesson state={state} />
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
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-700"></div>
          </label>
        </div>
        <div
          key={+switchContainer}
          className="flex flex-col flex-1 items-center justify-center"
          style={{
            backgroundColor: switchContainer ? "#45566f" : "#485b75",
          }}
        >
          {switchContainer ? (
            <ForgetWordsList />
          ) : (
            <>
              <motion.div
                key={currentWord}
                className="text-7xl text-zinc-200 px-20 max-w-6xl text-center"
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
        </div>
      </div>

      {/* bottom */}
      <div className="flex flex-col flex-shrink-0 h-44 bg-gray-500 items-center justify-center z-10 shadow-md-top">
        <div className="w-full text-center">
          {state && (
            <button
              disabled={switchContainer}
              onClick={mark}
              className="bg-slate-600 w-28 active:bg-slate-800 rounded p-3 mr-5"
            >
              {`Forget`}
            </button>
          )}
          <button
            disabled={switchContainer}
            onClick={rouletteNext}
            className="bg-slate-700 w-28 active:bg-slate-800 rounded p-3"
          >
            {btnText}
          </button>
          {state && (
            <button
              disabled={switchContainer}
              onClick={restart}
              className="bg-slate-600 w-28 active:bg-slate-800 rounded p-3 ml-5"
            >
              Restart
            </button>
          )}
        </div>
        <div className="mt-4 mb-4">
          {!state
            ? "Loading Completed"
            : `${currentWordGroup.length + 1}/${store.words.length}`}
        </div>

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
  );
};

const App = () => {
  return (
    <WordsProvider>
      <Home />
    </WordsProvider>
  );
};

export default App;
