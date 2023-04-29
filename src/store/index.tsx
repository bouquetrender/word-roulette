import { createContext, useReducer } from "react";

interface WordStore {
  forgetWordCount: {
    [key: string]: number;
  };
  vocabulary: {
    [key: number | string]: string[];
  };
  lesson: string;
  words: string[];
}

const wordsReducer = (store: any, action: any) => {
  switch (action.type) {
    case "changeLesson": {
      const vocabularyKey = action.val.replace("Lesson", "").replace("ALL", 0);
      return {
        ...store,
        lesson: action.val,
        words: store.vocabulary[vocabularyKey],
      };
    }
    case "changeVocabulary": {
      return {
        ...store,
        vocabulary: action.val,
        lesson: "ALL",
        words: action.val[0],
      };
    }
    case "markAsForget": {
      const updateCountObj = { ...store.forgetWordCount };
      updateCountObj[action.val] = updateCountObj[action.val]
        ? updateCountObj[action.val] + 1
        : 1;

      const objArray = Object.entries(updateCountObj).map(([key, value]) => ({
        key,
        value: value as number,
      }));
      objArray.sort((a, b) => b.value - a.value);
      const sortedWordCount = Object.fromEntries(
        objArray.map(({ key, value }) => [key, value])
      );

      localStorage.setItem("forgetWordCount", JSON.stringify(sortedWordCount));

      return {
        ...store,
        forgetWordCount: sortedWordCount,
      };
    }
    case "clearForgetList": {
      localStorage.removeItem('forgetWordCount')
      return {
        ...store,
        forgetWordCount: {},
      };
    }
    default: {
      throw Error("unknown actions: " + action.type);
    }
  }
};

const initialWordStore: WordStore = {
  vocabulary: {},
  lesson: "ALL",
  words: [],
  forgetWordCount: localStorage.getItem("forgetWordCount")
    ? JSON.parse(localStorage.getItem("forgetWordCount") as string)
    : {},
};

export const WordsContext = createContext<any>(null);

export const WordsDispatchContext = createContext<any>(null);

export function WordsProvider({ children }: { children: React.ReactNode }) {
  const [store, dispatch] = useReducer(wordsReducer, initialWordStore);

  return (
    <WordsContext.Provider value={store}>
      <WordsDispatchContext.Provider value={dispatch}>
        {children}
      </WordsDispatchContext.Provider>
    </WordsContext.Provider>
  );
}
