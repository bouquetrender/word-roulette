/* eslint-disable react-refresh/only-export-components */
export type Vocabulary = Record<
  string | number,
  Record<string | number, string[]>
>;

export const SPEC = "Spec";
export const IMPORT = "Import";

export const FORGOTTEN_WORDS = "Forgotten Words";
export const SONG = "Song";
export const EXPAND = "Expanded Vocabulary";

const allVocabulary: Vocabulary = {
  // 第一册
  1: {},
  // 第二册
  2: {
    "Unit 4": [
      "truant",
      "lorry",
      "hitchhike",
      "evade",
      "local authorities",
      "in the limelight",
      "caution",
      "shady",
      "sneer",
      "thick",
      "thin",
      "stamp",
      "scene",
      "survivor",
      "off course",
      "grower",
      "bulletin",
      "splendid",
      "crop",
      "harvest",
      "announce",
      "leading",
      "gather",
      "mummy",
      "disease",
      "temple",
      "section",
      "prove",
      "Egypt",
      "survive",
      "wax",
      "laboratory",
      "figure",
      "plate",
      "lit",
      "persuade",
      "entitle",
      "temper",
      "appetite",
      "nerve",
      "enormous",
      "effort",
      "produce",
      "concentration",
      "urge",
      "suffer",
      "amusement",
      "satisfaction",
      "symptom",
      "parents",
      "curious",
      "flight attendant",
      "frightened",
      "plant",
      "crystal",
      "palace",
      "extraordinary",
      "exhibition",
      "various",
      "profit",
      "elderly",
      "blaze",
      "prisoner",
      "rapidly",
      "uniform",
      "boldly",
      "shoulder",
      "march",
      "promptly",
      "refle",
      "sharp",
      "fleetly",
      "blow",
      "gleaming",
    ],
  },
  // 自定义导入单词数据
  [SPEC]: {
    [FORGOTTEN_WORDS]: [],
    [SONG]: [
      "aurorally",
      "enigmatic",
      "laser beamer",
      "craft",
      "marvelous",
      "persona",
      "domestic",
      "overcorrection",
      "tornado",
      "minority",
      "vacuum",
      "dynamite",
      "metamorphose",
      "syndrome",
      "symmetry",
      "subliminal",
      "abnormal",
      "kaleidoscope",
      "unravel",
      "scratch",
      "egomaniac",
      "feedback",
      "memento",
      "melt",
      "contrast",
      "phase",
      "phrase",
      "fragile",
    ],
    [EXPAND]: [
      "lamentable",
      "carving",
      "conclude",
      "sentry",
      "surgeon",
      "fantasia",
      "disposition",
      "resist",
      "irritate",
      "imaginary",
      "possess",
      "sheriff",
      "negate ",
      "signature",
      "halt",
      "inhabit / dwell",
      "reparation",
      "habitual",
      "sneer",
      "accustom",
      "centuries",
      "benefits",
      "excesses",
      "tease",
      "mock",
      "profited",
      "satisfactory",
      "measure",
      "amounts",
      "category",
    ],
  },
  [IMPORT]: {},
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
