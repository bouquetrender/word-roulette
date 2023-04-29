interface vocabulary {
  [key: number | string]: string[];
}

const vocabulary: vocabulary = {
  1: [
    "rudely",
    "bear it / stand it",
    "attract / catch / draw one's attention",
    "eventually",
    "cross / unhappy",
  ],
  2: ["breakfest / lunch / brunch / supper", "frequently", "rarely"],
  3: [
    "send for a doctor",
    "post office / postbox",
    "spoil spolied spoilt",
    "Don't spoil your children.",
    "The food will spoil soon.",
    "spoil my holiday.",
    "spoil / damage / destory / ruin",
    "public opinions",
    "waiter / waitress",
    "borrow / lend",
    "whole milk",
  ],
};

const lessonKey = Object.keys(vocabulary);

let combine: string[] = [];
lessonKey.forEach((key) => {
  combine = [...combine, ...vocabulary[key]];
});

vocabulary[0] = combine;

export default vocabulary;
