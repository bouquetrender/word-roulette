import { useContext, useEffect, useState } from "react";
import { WordsContext, WordsDispatchContext } from "../store";

const initialText = "Keep on keeping on.";
const resetText = "Reset Completed";
const finishText = "You have completed this round of word review !";

const shuffleArray = (arr: string[]) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const randomPick = (arr: string[]) => {
  const index = Math.floor(Math.random() * arr.length);
  const picked = arr.splice(index, 1)[0];
  return {
    arr,
    picked,
  };
};

const useWordManager = () => {
  const store = useContext(WordsContext);
  const dispatch = useContext(WordsDispatchContext);

  const [btnText, setBtnText] = useState("Start");
  const [state, setState] = useState(false);
  const [currentWord, setCurrentWord] = useState(initialText);
  const [currentWordGroup, setCurrentWordGroup] = useState<string[]>([]);

  useEffect(() => {
    setCurrentWord(initialText);
    setCurrentWordGroup(shuffleArray(store.words));
  }, [store.words]);

  const mark = () => {
    dispatch({
      type: "markAsForget",
      val: currentWord,
    });
    rouletteNext();
  };

  const restart = () => {
    setCurrentWord(resetText);
    reset();
  };

  const finish = () => {
    setCurrentWord(finishText);
  };

  const reset = () => {
    setState(false);
    setBtnText("Start");
    setCurrentWordGroup(shuffleArray(store.words));
  };

  const start = () => {
    if (currentWordGroup.length === 0) {
      return alert("The current list of words is empty. Please select again.");
    }
    setState(true);
    setBtnText("Next");
    getWords();
  };

  const nextWords = () => {
    getWords();
  };

  const getWords = () => {
    const { arr, picked } = randomPick(currentWordGroup);
    setCurrentWordGroup(arr);
    setCurrentWord(picked);
  };

  const rouletteNext = () => {
    if (state) {
      if (currentWordGroup.length === 0) {
        finish();
        reset();
      } else {
        nextWords();
      }
    } else {
      start();
    }
  };

  return {
    btnText,
    state,
    currentWord,
    currentWordGroup,
    reset,
    restart,
    finish,
    start,
    nextWords,
    mark,
    rouletteNext,
  };
};

export default useWordManager;
