interface vocabulary {
  [key: number | string]: string[];
}

const vocabulary: vocabulary = {
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
  4: [
    "firm",
    "abroad",
    "a great/large number of",
    "society",
  ]
};

const lessonKey = Object.keys(vocabulary);

let combine: string[] = [];
lessonKey.forEach((key) => {
  combine = [...combine, ...vocabulary[key]];
});

vocabulary[0] = combine;

export default vocabulary;
