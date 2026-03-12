import { localized } from "@/lib/i18n";
import type { FilmCreditGroup, FilmDetails, FilmInfoItem, LocalizedText, ProjectMediaItem } from "@/types/content";

function filmAssetPath(project: string, file: string) {
  return `/projects/film-video/film/${project}/${file}`;
}

function createFilmImage(
  project: string,
  file: string,
  title: LocalizedText,
  description: LocalizedText,
  fallback: { width: number; height: number }
): ProjectMediaItem {
  return {
    type: "image",
    src: filmAssetPath(project, file),
    width: fallback.width,
    height: fallback.height,
    title,
    description
  };
}

function createFilmInfo(labelEn: string, labelZh: string, valueEn: string, valueZh?: string): FilmInfoItem {
  return {
    label: localized(labelEn, labelZh),
    value: localized(valueEn, valueZh ?? valueEn)
  };
}

function createFilmCredit(
  enName: string,
  href?: string,
  zhName?: string,
  noteEn?: string,
  noteZh?: string
) {
  return {
    name: localized(enName, zhName ?? enName),
    href,
    note: noteEn ? localized(noteEn, noteZh ?? noteEn) : undefined
  };
}

function createSequentialStills(
  project: string,
  count: number,
  extension: "png" | "jpeg",
  titleEn: string,
  titleZh: string,
  descriptionEn: string,
  descriptionZh: string
) {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const padded = String(number).padStart(2, "0");

    return createFilmImage(
      project,
      `stills/still-${project}-${padded}.${extension}`,
      localized(`${titleEn} ${padded}`, `${titleZh} ${padded}`),
      localized(descriptionEn, descriptionZh),
      { width: 1920, height: 1080 }
    );
  });
}

function asCreditGroup(roleEn: string, roleZh: string, people: FilmCreditGroup["people"]): FilmCreditGroup {
  return {
    role: localized(roleEn, roleZh),
    people
  };
}

const fraudMainPoster = createFilmImage(
  "fraud",
  "posters/poster-fraud-main.png",
  localized("FRAÜD main poster", "信途主海报"),
  localized("Primary one-sheet poster used for FRAÜD.", "《信途》的主海报。"),
  { width: 1728, height: 2304 }
);

const thePillsMainPosterEn = createFilmImage(
  "the-pills",
  "posters/poster-the-pills-main-en.png",
  localized("The Pills main poster", "药丸主海报"),
  localized("Primary English-language festival poster for The Pills.", "《药丸》的英文主海报。"),
  { width: 1728, height: 2304 }
);

const thePillsMainPosterZh = createFilmImage(
  "the-pills",
  "posters/poster-the-pills-main-zh.png",
  localized("The Pills main poster", "药丸主海报"),
  localized("Primary Chinese-language festival poster for The Pills.", "《药丸》的中文主海报。"),
  { width: 1728, height: 2304 }
);

const gourdMainPoster = createFilmImage(
  "gourd",
  "posters/poster-gourd-main.png",
  localized("Gourd main poster", "清兵卫主海报"),
  localized("Primary poster artwork for Gourd.", "《清兵卫》的主海报。"),
  { width: 1587, height: 2245 }
);

export const fraudFilmDetails: FilmDetails = {
  heroPoster: {
    en: fraudMainPoster,
    zh: fraudMainPoster
  },
  posters: [
    fraudMainPoster,
    createFilmImage(
      "fraud",
      "posters/poster-fraud-christy-character.png",
      localized("Christy character poster", "Christy 角色海报"),
      localized("Character poster featuring Christy.", "Christy 的角色海报。"),
      { width: 1728, height: 2304 }
    ),
    createFilmImage(
      "fraud",
      "posters/poster-fraud-christy-quote.png",
      localized("Christy quote poster", "Christy 台词海报"),
      localized("Quote poster built around Christy's dialogue.", "围绕 Christy 台词设计的海报。"),
      { width: 1728, height: 2304 }
    ),
    createFilmImage(
      "fraud",
      "posters/poster-fraud-isabella-character.png",
      localized("Isabella character poster", "Isabella 角色海报"),
      localized("Character poster featuring Isabella.", "Isabella 的角色海报。"),
      { width: 1728, height: 2304 }
    ),
    createFilmImage(
      "fraud",
      "posters/poster-fraud-isabella-quote.png",
      localized("Isabella quote poster", "Isabella 台词海报"),
      localized("Quote poster built around Isabella's dialogue.", "围绕 Isabella 台词设计的海报。"),
      { width: 1728, height: 2304 }
    ),
    createFilmImage(
      "fraud",
      "posters/poster-fraud-senior-sister-character.png",
      localized("Senior Sister character poster", "学姐角色海报"),
      localized("Character poster featuring the senior sister.", "学姐角色海报。"),
      { width: 1728, height: 2304 }
    ),
    createFilmImage(
      "fraud",
      "posters/poster-fraud-senior-sister-quote.png",
      localized("Senior Sister quote poster", "学姐台词海报"),
      localized("Quote poster built around the senior sister's dialogue.", "围绕学姐台词设计的海报。"),
      { width: 1728, height: 2304 }
    )
  ],
  stills: createSequentialStills(
    "fraud",
    13,
    "png",
    "FRAÜD still",
    "信途剧照",
    "Production still from FRAÜD.",
    "《信途》剧照。"
  ),
  credits: [
    asCreditGroup("Director", "导演", [
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸"),
      createFilmCredit("Manyi (Makayla) Chen", "https://www.imdb.com/name/nm16014588/", "陈镘伊")
    ]),
    asCreditGroup("Writer", "编剧", [
      createFilmCredit("Vivienne Chen", "https://www.imdb.com/name/nm14547689/", "陈瑾遥"),
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸")
    ]),
    asCreditGroup("Cast", "演员", [
      createFilmCredit("Manyi (Makayla) Chen", "https://www.imdb.com/name/nm16014588/", "陈镘伊", "as Christy", "饰 Christy"),
      createFilmCredit("Vivienne Chen", "https://www.imdb.com/name/nm16014586/", "陈瑾遥", "as Senior Sister", "饰 学姐"),
      createFilmCredit("Xiaoqing (Kelly) Li", "https://www.imdb.com/name/nm16014587/", "李晓晴", "as Isabella", "饰 Isabella")
    ]),
    asCreditGroup("Composer", "作曲", [
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸")
    ]),
    asCreditGroup("Cinematographer", "摄影", [
      createFilmCredit("Manyi (Makayla) Chen", "https://www.imdb.com/name/nm16014588/", "陈镘伊"),
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸")
    ]),
    asCreditGroup("Editor", "剪辑", [
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸")
    ]),
    asCreditGroup("Art Director", "美术指导", [
      createFilmCredit("Ziyuan (Esme) Yang", "https://www.imdb.com/name/nm16247600/", "杨紫媛")
    ]),
    asCreditGroup("Assistant Director", "副导演", [
      createFilmCredit("Manyi (Makayla) Chen", "https://www.imdb.com/name/nm16014588/", "陈镘伊")
    ])
  ],
  facts: [
    createFilmInfo("Runtime", "片长", "5m 48s"),
    createFilmInfo("Language", "语言", "Mandarin Chinese", "普通话"),
    createFilmInfo("Country", "国家", "Canada", "加拿大"),
    createFilmInfo("Completion", "完成时间", "2024")
  ]
};

export const thePillsFilmDetails: FilmDetails = {
  heroPoster: {
    en: thePillsMainPosterEn,
    zh: thePillsMainPosterZh
  },
  posters: [
    thePillsMainPosterZh,
    thePillsMainPosterEn,
    createFilmImage(
      "the-pills",
      "posters/poster-the-pills-main-ja.png",
      localized("The Pills Japanese poster", "药丸日文海报"),
      localized("Japanese-language poster variant for The Pills.", "《药丸》的日文版海报。"),
      { width: 1728, height: 2304 }
    ),
    createFilmImage(
      "the-pills",
      "posters/poster-the-pills-youtube-cover.png",
      localized("The Pills YouTube cover", "药丸 YouTube 封面"),
      localized("Landscape promo cover prepared for YouTube.", "为 YouTube 准备的横版宣传封面。"),
      { width: 1280, height: 720 }
    )
  ],
  stills: createSequentialStills(
    "the-pills",
    6,
    "jpeg",
    "The Pills still",
    "药丸剧照",
    "Production still from The Pills.",
    "《药丸》剧照。"
  ),
  credits: [
    asCreditGroup("Director", "导演", [
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸")
    ]),
    asCreditGroup("Writer", "编剧", [
      createFilmCredit("Annalise Gumboc", "https://www.imdb.com/name/nm16995722/"),
      createFilmCredit("Shuli Wang", "https://www.imdb.com/name/nm16995723/", "王舒里")
    ]),
    asCreditGroup("Cast", "演员", [
      createFilmCredit("Annaliese Gumboc", "https://www.imdb.com/name/nm16995725/"),
      createFilmCredit("Jimmy Han", "https://www.imdb.com/name/nm16995727/", "韩嘉铭"),
      createFilmCredit("Arden Huang", "https://www.imdb.com/name/nm16995726/", "黄天逸"),
      createFilmCredit("Julianna Wu", "https://www.imdb.com/name/nm16995724/", "吴泽萌"),
      createFilmCredit("Tengs Wu", "https://www.imdb.com/name/nm16995729/", "伍正")
    ]),
    asCreditGroup("Cinematographer", "摄影", [
      createFilmCredit("Chris Sang", "https://www.imdb.com/name/nm16995728/", "桑宁敬"),
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸")
    ]),
    asCreditGroup("Editor", "剪辑", [
      createFilmCredit("Robbie Grahamm", "https://www.imdb.com/name/nm16995730/"),
      createFilmCredit("Shuli Wang", "https://www.imdb.com/name/nm16995723/", "王舒里"),
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸")
    ])
  ],
  facts: [
    createFilmInfo("Runtime", "片长", "2m 58s"),
    createFilmInfo("Language", "语言", "English", "英语"),
    createFilmInfo("Country", "国家", "Canada", "加拿大"),
    createFilmInfo("Completion", "完成时间", "January 2024", "2024年1月")
  ]
};

export const gourdFilmDetails: FilmDetails = {
  heroPoster: {
    en: gourdMainPoster,
    zh: gourdMainPoster
  },
  posters: [gourdMainPoster],
  stills: createSequentialStills(
    "gourd",
    11,
    "png",
    "Gourd still",
    "清兵卫剧照",
    "Production still from Gourd.",
    "《清兵卫》剧照。"
  ),
  credits: [
    asCreditGroup("Director", "导演", [
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸")
    ]),
    asCreditGroup("Writer", "编剧", [
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸")
    ]),
    asCreditGroup("Cast", "演员", [
      createFilmCredit("Jerry Dai", "https://www.imdb.com/name/nm16997979/", "戴翰林"),
      createFilmCredit("Efraim Li", "https://www.imdb.com/name/nm16997977/", "厉以琳"),
      createFilmCredit("Rayon Xiang", "https://www.imdb.com/name/nm16997978/", "项奕睿"),
      createFilmCredit("Melissa Yuan", "https://www.imdb.com/name/nm16997976/", "袁梦舒"),
      createFilmCredit("Benjamin Zhang", "https://www.imdb.com/name/nm16997975/", "张慕道"),
      createFilmCredit("Sun Zihan", undefined, "孙梓涵")
    ]),
    asCreditGroup("Cinematographer", "摄影", [
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸")
    ]),
    asCreditGroup("Editor", "剪辑", [
      createFilmCredit("David Weng", "https://www.imdb.com/name/nm16014585/", "翁佳宸")
    ])
  ],
  facts: [
    createFilmInfo("Completion", "完成时间", "2020")
  ]
};
