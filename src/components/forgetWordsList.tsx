import { useContext } from "react";
import { WordsContext, WordsDispatchContext } from "../store";
import { FORGOTTEN_WORDS } from "../store/dict";

const ForgetWordsList = () => {
  const store = useContext(WordsContext);
  const dispatch = useContext(WordsDispatchContext);
  const keys = Object.keys(store.forgetWordCount);

  const onClear = () => {
    dispatch({
      type: "clearForgetList",
      val: {},
    });
  };

  return (
    <div className="text-2xl text-zinc-200 w-full text-center h-full overflow-auto py-16 max-w-lg">
      <div className="text-4xl mb-6">{FORGOTTEN_WORDS}</div>
      {keys.length > 0 && (
        <div
          className="text-xl mb-6 cursor-pointer opacity-40 hover:opacity-100 inline-block transition"
          onClick={onClear}
        >
          {`[ Clear ]`}
        </div>
      )}
      {keys.length > 0 &&
        keys.map((words) => {
          return (
            <div key={words} className="flex justify-between">
              <div>{words}</div>
              <div className=" pr-2">{store.forgetWordCount[words]}</div>
            </div>
          );
        })}
      {keys?.length === 0 && (
        <div>
          This list is currently empty. <br /> Start adding words to keep track
          of the meanings you forget.
        </div>
      )}
    </div>
  );
};

export default ForgetWordsList;
