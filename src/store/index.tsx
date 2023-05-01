import { createContext, useReducer } from "react";
import { produce } from "immer";
import { FORGOTTEN_WORDS, SPEC, Vocabulary } from "./dict";

interface WordStore {
  partKey: string;
  forgetWordCount: Record<string, number>;
  vocabulary: Vocabulary;
  lesson: string;
  words: string[];
}

const wordsReducer = (store: WordStore, action: any) => {
  switch (action.type) {
    case "changeLesson": {
      const { currentSelection, currSelectPartKey } = action.val;
      const lessonKey = currentSelection
        .replace("Lesson", "")
        .replace("ALL", 0);
      return produce(store, (draftStore: WordStore) => {
        draftStore.partKey = currSelectPartKey;
        draftStore.lesson = currentSelection;
        draftStore.words = draftStore.vocabulary[currSelectPartKey][lessonKey];
      });
    }

    case "initalVocabulary": {
      return produce(store, (draftStore: any) => {
        draftStore.vocabulary = action.val;
        draftStore.lesson = "ALL";
        draftStore.words = action.val[draftStore.partKey][0] || [];
      });
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

      return produce(store, (draftStore: any) => {
        draftStore.forgetWordCount = sortedWordCount;
      });
    }

    case "clearForgetList": {
      localStorage.removeItem("forgetWordCount");
      return produce(store, (draftStore: any) => {
        draftStore.forgetWordCount = {};
        draftStore.vocabulary[SPEC][FORGOTTEN_WORDS] = {};
        draftStore.words = [];
      });
    }

    default: {
      throw Error("unknown actions: " + action.type);
    }
  }
};

const initialWordStore: WordStore = {
  partKey: "2", // 当前默认选择的词库
  lesson: "ALL",
  vocabulary: {},
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
