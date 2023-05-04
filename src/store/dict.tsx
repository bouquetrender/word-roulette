/* eslint-disable react-refresh/only-export-components */
export type Vocabulary = Record<string | number, Record<string | number, string[]>>;

export const MORE = 'More'
export const FORGOTTEN_WORDS = 'Forgotten Words'

const allVocabulary: Vocabulary = {
  // 第一册
  1: {},
  // 第二册
  2: {
    1: [
      "rudely",
      "bear / stand it",
      "attract / catch / draw one's attention",
      "eventually",
      "cross",
    ],
    2: ["supper", "frequently", "rarely"],
    3: [
      "send for a doctor",
      "postbox",
      "spoil spolied spoilt",
      "Don't spoil your children",
      "The food will spoil soon",
      "spoil my holiday",
      "ruin",
      "public opinions",
      "waiter / waitress",
      "borrow / lend",
      "whole milk",
      "salt",
      "stay up late",
    ],
    4: ["firm", "abroad", "a great/large number of", "society"],
    5: [
      "pigeno / dove",
      "urgent",
      "distant",
      "distance",
      "convenience",
      "absurd",
      "spare part",
      "garage",
      "cover",
      "obtain",
      "general",
    ],
    6: ["beg", "pollution", "in return for..."],
  },
  // 自定义导入单词数据
  [MORE]: {
    [FORGOTTEN_WORDS]: []
  },
};

for (const key in allVocabulary) {
  const vocabulary = allVocabulary[key];
  const lessonKey = Object.keys(vocabulary);
  if (lessonKey.length > 0) {
    let combine: string[] = [];
    lessonKey.forEach((key) => {
      combine = [...combine, ...vocabulary[key]];
    });
    vocabulary[0] = combine;
  }
}

export default allVocabulary;
