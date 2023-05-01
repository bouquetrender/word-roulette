interface Vocabulary {
  [key: number | string]: {
    [key: number | string]: string[];
  };
}

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
  },
  // 自定义导入单词数据
  More: {},
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
