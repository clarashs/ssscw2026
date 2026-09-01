/* ============================================================
   苏州河 Citywalk — 结构化数据
   ------------------------------------------------------------
   type:  stop（正式站点，绿色编号） | glance（顺路看点，蓝色眼睛）
          | optional（备选景点，橙色空心菱形） | chapter（主题步行章节）
   coord: [经度, 纬度]（高德 GCJ-02）
   stay / addMin: 分钟
   tags:  food 餐饮 | mall 商场 | id 需携带护照/实名核验
   ============================================================ */

/* ---------- 界面文案 ---------- */
const UI = {
  zh: {
    kicker: 'SUZHOU CREEK · CITYWALK',
    title: '上海阿姨的一天',
    subtitle: '从街坊烟火、城市更新，到苏州河与上海历史',
    metaDuration: '约 {t}',
    metaWalk: '步行约 {d} 公里',
    metaStopsLabel: '6 个正式站点',
    btnRoute: '查看完整路线',
    mapTitle: '完整路线地图',
    mapNoteFormal: '正式路线',
    mapNoteAside: '顺路看看景点',
    mapNoteOptional: '备选景点',
    mapNotePhoto: '推荐拍照点',
    photoSpotsLabel: '推荐拍照点：',
    mapNoteAction: '点击',
    mapNoteClickable: '景点名称可跳转至景点介绍',
    mapNoteRetry: '若出现虚线，请点击‘重新计算路线’。',
    mapLoading: '地图加载中…',
    mapFail: '地图暂时无法加载（可能是网络或 Key 限制）。路线卡片和单站导航仍可正常使用。',
    mapNoKey: '尚未配置高德地图 Key，地图区域已跳过。路线卡片和单站导航不受影响。',
    locate: '◎ 获取我的位置',
    locating: '正在获取位置…',
    locateAgain: '◎ 重新定位',
    locateFail: '无法获取当前位置，请检查手机和浏览器的定位权限。',
    reroute: '↻ 重新计算路线',
    rerouting: '正在重新计算…',
    rerouteDone: '路线已重新计算',
    copyList: '复制有序地点清单',
    copiedList: '已复制有序地点清单，可在高德 App 中手动建立多途经点路线。',
    prepTitle: '行前准备',
    prepHint: '舒适地走完这条路线所需的几件小事。',
    timelineTitle: '路线',
    routeHint: '绿色编号＝正式站点 · 蓝色眼睛＝顺路看 · 橙色菱形＝备选（可加入）',
    legendStop: '正式路线',
    legendAside: '顺路看看',
    legendOptional: '备选景点（可选择）',
    asideTitle: '顺路看点',
    asideHint: '不编号、不额外绕路，建议停留 2–10 分钟。',
    optionalTitle: '备选景点',
    optionalHint: '可按兴趣加入或移出路线；加入后只更新地图、路线顺序与预计总时长。',
    boatTitle: '隐藏玩法：苏州河游船',
    endingTitle: '结语：另一面的上海',
    stay: '建议停留 {m}',
    stayRange: '建议停留 {a}–{b} 分钟',
    hours: '开放时间',
    stayKey: '建议停留',
    intro: '介绍',
    addr: '地址',
    navAmap: '高德步行导航',
    navApple: 'Apple Maps',
    addStop: '加入路线',
    removeStop: '移出路线',
    navFail: '无法打开地图 App，已改为复制查询名称，可粘贴到地图 App 搜索。',
    copyFallback: '复制失败，请长按地址手动复制。',
    foodLabel: '可用餐',
    mallLabel: '商场',
    idLabel: '护照',
    stopWord: '第 {n} 站',
    stopWordShort: '第 {n} 站',
    tipNoPhoto: '请勿拍摄住宅内部或未经允许近距离拍摄居民。',
    checkHintAll: '（{a}/{b}）',
    footNote: '开放时间、预约与游船班次等信息可能变动，请以官方渠道当日公布为准。',
    createdBy: 'Created by Jenny&Sol&Luna&Hy4&Deepseek',
    langLabel: '语言',
    totalBase: '预计总时长',
    detail: '展开',
    collapse: '收起'
    ,bookLabel: '推荐书籍'
  },
  de: {
    kicker: 'SUZHOU CREEK · CITYWALK',
    title: 'Ein Tag im Leben einer Shanghaier Tante',
    subtitle: 'Vom gelebten Alltag über Stadterneuerung bis zum Suzhou Creek und zur Geschichte Shanghais',
    metaDuration: 'ca. {t}',
    metaWalk: 'ca. {d} km zu Fuß',
    metaStopsLabel: '6 feste Stationen',
    metaStops: '6 feste Stationen',
    metaStart: 'empfohlen 09:00–17:00',
    btnRoute: 'Ganze Route ansehen',
    mapTitle: 'Karte der ganzen Route',
    mapNoteFormal: 'die feste Route',
    mapNoteAside: 'Sehenswürdigkeiten am Weg',
    mapNoteOptional: 'Wahlstationen',
    mapNotePhoto: 'empfohlene Fotopunkte',
    photoSpotsLabel: 'Empfohlene Fotopunkte:',
    mapNoteAction: 'Klicken Sie',
    mapNoteClickable: 'den Namen, um zur passenden Stationsbeschreibung zu gelangen',
    mapNoteRetry: 'Bei gestrichelten Linien bitte auf „Route neu berechnen“ klicken.',
    mapLoading: 'Karte wird geladen …',
    mapFail: 'Die Karte konnte nicht geladen werden (Netzwerk oder Key-Einschränkung). Alle Karten, das Kopieren von Adressen und die Einzelnavigation funktionieren weiterhin.',
    mapNoKey: 'Es ist kein Amap-Key hinterlegt, der Kartenbereich wird übersprungen. Route, Adressen kopieren und Einzelnavigation sind nicht betroffen.',
    locate: '◎ Meinen Standort zeigen',
    locating: 'Standort wird ermittelt …',
    locateAgain: '◎ Erneut lokalisieren',
    locateFail: 'Standort nicht verfügbar. Bitte die Standortberechtigung von Telefon und Browser prüfen.',
    reroute: '↻ Route neu berechnen',
    rerouting: 'Route wird neu berechnet …',
    rerouteDone: 'Route wurde neu berechnet',
    copyList: 'Geordnete Ortsliste kopieren',
    copiedList: 'Liste kopiert – damit lässt sich in der Amap-App eine Route mit Zwischenzielen anlegen.',
    prepTitle: 'Vorbereitung',
    prepHint: 'Vor dem Start durchgehen. Der Haken bleibt nur in diesem Browser gespeichert.',
    timelineTitle: 'Route',
    routeHint: 'Grüne Nummer = feste Station · blaues Auge = Sehenswürdigkeit am Weg · orange Raute = Wahlstation (hinzufügbar)',
    legendStop: 'Feste Station',
    legendAside: 'Sehenswürdigkeit am Weg',
    legendOptional: 'Wahlstation (hinzufügbar)',
    asideTitle: 'Sehenswürdigkeiten am Weg',
    asideHint: 'Ohne Nummer, ohne Umweg – 2 bis 10 Minuten reichen.',
    optionalTitle: 'Wahlstationen',
    optionalHint: 'Nach Interesse hinzufügen oder entfernen. Danach aktualisieren sich Karte, Reihenfolge und die geplante Gesamtdauer.',
    boatTitle: 'Extra: Bootsfahrt auf dem Suzhou Creek',
    endingTitle: 'Schluss: Eine andere Seite von Shanghai',
    stay: 'empfohlen {m}',
    stayRange: '{a}–{b} Minuten',
    hours: 'Öffnungszeiten',
    stayKey: 'Empfohlene Dauer',
    intro: 'Über den Ort',
    addr: 'Adresse',
    navAmap: 'Amap – zu Fuß',
    navApple: 'Apple Maps',
    addStop: 'Zur Route hinzufügen',
    removeStop: 'Aus Route entfernen',
    navFail: 'Karten-App konnte nicht geöffnet werden. Stattdessen wurde der Suchname kopiert.',
    copyFallback: 'Kopieren fehlgeschlagen – bitte Adresse lange drücken und manuell kopieren.',
    foodLabel: 'Essen möglich',
    mallLabel: 'Einkaufszentrum',
    idLabel: 'Reisepass',
    stopWord: 'Station {n}',
    stopWordShort: 'Station {n}',
    tipNoPhoto: 'Bitte keine Wohnungen fotografieren und keine Menschen ohne Erlaubnis aus nächster Nähe.',
    checkHintAll: '({a}/{b})',
    footNote: 'Öffnungszeiten, Anmelderegeln und Bootsfahrpläne können sich ändern – bitte am Tag selbst in den offiziellen Kanälen prüfen.',
    createdBy: 'Created by Jenny&Sol&Luna&Hy4&Deepseek',
    langLabel: 'Sprache',
    totalBase: 'Geplante Gesamtdauer',
    detail: 'Mehr',
    collapse: 'Weniger'
    ,bookLabel: 'Buchempfehlung'
  }
};

/* ---------- 行前准备清单 ---------- */
const PREP = [
  { id: 'shoes', zh: '穿舒适的鞋', de: 'Bequeme Schuhe tragen' },
  { id: 'passport', zh: '携带护照原件', de: 'Reisepass im Original mitnehmen' },
  { id: 'temple-dress', zh: '注意着装（玉佛寺）', de: 'Kleiderordnung (Jade-Buddha-Tempel)' },
  { id: 'bike', zh: '（可选）共享单车', de: '(optional) Leihfahrrad' }
];

/* ---------- 正式站点 / 顺路看点 / 备选景点 ---------- */
const PLACES = [
  {
    id: 'yufo',
    type: 'stop',
    order: 10,
    slot: '09:00–10:00',
    coord: [121.445135, 31.241382],
    name: { zh: '玉佛寺', en: 'Jade Buddha Temple', de: 'Jade-Buddha-Tempel' },
    addr: {
      zh: '上海市普陀区安远路170号',
      en: 'No. 170 Anyuan Road, Putuo District, Shanghai'
    },
    stay: 60,
    tags: ['food'],
    tagText: {
      zh: '素面/月饼',
      de: 'Vegetarische Nudeln/Mondkuchen'
    },
    hours: {
      zh: '08:00–16:30（免香花券入寺；重大节日另行公告）',
      de: '08:00–16:30 (Eintritt frei; an Feiertagen gesonderte Ankündigung)'
    },
    highlight: {
      zh: '香火与菜场只隔一条街——寺院是社区的一部分。',
      de: 'Weihrauch und Gemüsemarkt liegen eine Straße auseinander – der Tempel gehört zum Viertel.'
    },
    intro: {
      zh: '玉佛禅寺始建于 1882 年，因两尊从缅甸请回的玉佛而得名。如今寺院仍在城市中心运转：门外是住宅、菜场和小店，门内是上香、诵经和日常修行。在这里看看，一座寺庙如何成为城市生活的一部分。',
      de: 'Der Tempel wurde 1882 gegründet und erhielt seinen Namen von zwei Jade-Buddha-Figuren, die aus Birma hierhergebracht wurden. Heute ist er weiterhin mitten im Stadtleben verankert: Vor dem Tempel liegen Wohnhäuser, Märkte und kleine Läden, im Inneren finden Gebete, Rezitationen und der tägliche religiöse Alltag statt. Hier lässt sich beobachten, wie ein Tempel Teil des städtischen Lebens wird.'
    },
    tips: {
      zh: '👀 路上别忘了找一找「大橘禅院」。\n\n⚠️ 入寺注意着装：避免背心、露脐装、拖鞋及过短的裙裤。',
      de: '👀 Unterwegs nicht vergessen, nach dem „Big Orange Zen Temple“ Ausschau zu halten.\n\n⚠️ Beim Tempel bitte angemessene Kleidung tragen: Keine Trägershirts, bauchfreien Oberteile, Hausschuhe oder zu kurzen Röcke und Hosen.'
    },
    links: [{ label: { zh: '玉佛禅寺官网 ↗', en: 'Jade Buddha Temple official website ↗', de: 'Offizielle Website des Jade-Buddha-Tempels ↗' }, url: { zh: 'https://www.yufotemple.com/', en: 'https://www.yufotemple.com/', de: 'https://www.yufotemple.com/en/' } }]
  },

  {
    id: 'chapter-putuo',
    type: 'chapter',
    order: 15,
    title: {
      zh: '长寿路 / 西康路一带的社区生活',
      en: 'Community life around Changshou and Xikang Roads',
      de: 'Alltagsleben rund um Changshou- und Xikang-Straße'
    },
    body: {
      zh: '武康路、愚园路代表了许多游客熟悉的上海：梧桐、老建筑、咖啡馆，以及经过精心更新的街道空间。\n\n而在长寿路和西康路一带，住宅、早餐铺、便利店、快递、电动车，还有买菜和通勤的人，共同构成了更朴素而具体的日常。这里的生活并没有被特别整理成一道“风景”，却更接近这座城市每天真实运转的样子。\n\n继续往鸿寿坊走，这种自然生长的街坊生活，会逐渐过渡到一种经过城市更新重新组织的“精致烟火气”：旧里弄的尺度和建筑语言被保留下来，新的餐饮、咖啡和商业进入其中。',
      de: 'Wukang Road und Yuyuan Road zeigen vielen Besuchern das vertraute Shanghai: Platanen, alte Häuser, Cafés und sorgfältig erneuerte Straßenräume.\n\nRund um Changshou- und Xikang-Straße ist der Alltag schlichter und unmittelbarer: Wohnungen, Frühstücksläden, Convenience-Stores, Lieferboten, E-Bikes und Menschen auf dem Weg zur Arbeit oder zum Markt. Dieses Leben wurde nicht eigens zur „Sehenswürdigkeit“ gemacht – gerade deshalb zeigt es, wie die Stadt wirklich funktioniert.\n\nAuf dem Weg nach Hong Shou Fang geht dieser gewachsene Alltag allmählich in eine neu organisierte, gepflegte Form des Quartierslebens über: Die Maßstäbe und Spuren der alten Gassen bleiben, neue Gastronomie, Cafés und Geschäfte kommen hinzu.'
    }
  },

  {
    id: 'hongshou',
    type: 'stop',
    order: 30,
    slot: '10:15–11:05',
    coord: [121.440182, 31.240997],
    name: { zh: '鸿寿坊', en: 'Hong Shou Fang', de: 'Hong Shou Fang' },
    addr: {
      zh: '上海市普陀区西康路1143号',
      en: 'No. 1143 Xikang Road, Putuo District, Shanghai'
    },
    stay: 30,
    tags: ['mall'],
    tagText: {
      zh: '商场',
      de: 'Einkaufszentrum'
    },
    hours: {
      zh: '约 10:00–22:00（各店铺略有差异）',
      de: 'ca. 10:00–22:00 (je nach Geschäft)'
    },
    highlight: {
      zh: '石库门里弄被重新设计成“菜场＋咖啡”的日常商业。',
      de: 'Eine Shikumen-Gasse, neu erfunden als Alltagskommerz aus Markt und Kaffee.'
    },
    intro: {
      zh: '鸿寿坊始建于 1933 年，2023 年改造后重新开放。石库门弄堂结构、赤色陶砖和门头装饰被保留下来，中央食集则把菜场、老字号、精品咖啡和各种餐饮放在同一片屋檐下，延续着这里从三十年代卖米的吆喝、七八十年代粮票买副食品的生活传统。\n\n相比新天地、张园等石库门改造后的精致商业区，鸿寿坊更像附近居民老少皆宜的社区会客厅。\n\n👀 想知道哪家店好吃又便宜？看看阿姨们在哪里排队。',
      de: 'Hong Shou Fang entstand 1933 als zweigeschossige Shikumen-Siedlung und wurde nach der Erneuerung 2023 wiedereröffnet. Die Gassenstruktur, die roten Terrakotta-Ziegel und die Türportale blieben erhalten; die zentrale Markthalle bringt Gemüsemarkt, alteingesessene Marken, Spezialitätenkaffee und verschiedenste Gastronomie unter ein Dach. So setzt sie die Alltagstradition dieses Viertels fort – von den Rufen der Reishändler in den 1930er-Jahren bis zum Einkauf von Grundbedarf mit Lebensmittelmarken in den 1970er- und 1980er-Jahren.\n\nIm Vergleich zu den eleganten, hochwertigen Shikumen-Vierteln Xintiandi und Zhangyuan ist Hong Shou Fang eher ein Treffpunkt für die Anwohner – für Jung und Alt.\n\n👀 Wer wissen möchte, wo es gut und günstig schmeckt, schaut einfach, vor welchem Laden die Tanten Schlange stehen.'
    },
    tips: null
  },

  {
    id: 'changshou',
    type: 'glance',
    order: 40,
    leg: '11:05–11:40',
    coord: [121.43951, 31.24337],
    name: { zh: '长寿公园', en: 'Changshou Park', de: 'Changshou-Park' },
    addr: {
      zh: '上海市普陀区长寿路260号',
      en: 'No. 260 Changshou Road, Putuo District, Shanghai'
    },
    stay: 5,
    tags: [],
    hours: {
      zh: '24 小时开放',
      de: 'rund um die Uhr geöffnet'
    },
    highlight: {
      zh: '24 小时开放的社区公园。',
      de: 'Ein rund um die Uhr offener Park – morgens und abends das Wohnzimmer der Nachbarschaft.'
    },
    intro: {
      zh: '约 4 万平方米的社区公园，早晨是附近居民慢跑、散步和锻炼的时间；到了白天，公园里又多了带孩子前来的家庭。这里不像一个需要专程前往的“景点”，更像社区日常自然延伸，也是城市行走途中适合坐下来小憩的一站。',
      de: 'Ein rund 40.000 m² großer Nachbarschaftspark: Am Morgen joggen, spazieren und trainieren hier die Anwohner; tagsüber kommen Familien mit Kindern dazu. Der Park ist keine „Sehenswürdigkeit“, für die man eigens anreisen muss, sondern eher eine natürliche Verlängerung des Alltags im Viertel – und ein guter Ort, um sich unterwegs kurz hinzusetzen und auszuruhen.'
    },
    tips: {
      zh: '👀 泡泡森林、喷泉单车',
      de: '👀 Bubble Forest und Fountain Bike'
    }
  },

  {
    id: 'trees',
    type: 'stop',
    order: 50,
    slot: '11:40–12:40',
    coord: [121.445506, 31.249016],
    name: { zh: '天安千树', en: '1000 Trees', de: '1000 Trees' },
    addr: {
      zh: '上海市普陀区莫干山路600号',
      en: 'No. 600 Moganshan Road, Putuo District, Shanghai'
    },
    stay: 40,
    tags: ['mall', { key: 'photo', icon: 'camera', label: { zh: '拍照', de: 'Fotospot' } }],
    tagText: {
      zh: '商场',
      de: 'Einkaufszentrum'
    },
    hours: {
      zh: '商场约 10:00–21:30；沿河步道全天可通行',
      de: 'Einkaufszentrum ca. 10:00–21:30; Uferweg tagsüber frei zugänglich'
    },
    highlight: {
      zh: '空中花园搬进商场的建筑，争议与惊喜都在。',
      de: 'Ein Bau, der die hängenden Gärten in ein Einkaufszentrum holt – umstritten und sehenswert zugleich.'
    },
    intro: {
      zh: '这座建筑奇观被誉为“上海的巴比伦”，坐落于原福新面粉厂旧址。项目保留了四座历史建筑，并将其转化为集休闲、购物与艺术于一体的公共空间。\n\n超过两万株植物覆盖建筑立面，营造出宛如垂直森林的景观；一条长约 900 米的滨河步道与公共公园相连。\n\n商场内设有多种艺术装置，并定期举办潮流展览，使其成为苏州河沿岸一处充满未来感的文化旅游地标。',
      de: 'Dieses architektonische Wahrzeichen wird als „Babylon von Shanghai“ bezeichnet und steht auf dem Gelände der ehemaligen Fuxin-Mehlmühle. Vier historische Gebäude blieben erhalten und wurden in einen öffentlichen Ort für Freizeit, Einkauf und Kunst verwandelt.\n\nMehr als 20.000 Pflanzen bedecken die Fassade und lassen sie wie einen vertikalen Wald wirken. Eine rund 900 Meter lange Uferpromenade verbindet das Areal mit einem öffentlichen Park.\n\nIm Einkaufszentrum gibt es zahlreiche Kunstinstallationen und regelmäßig wechselnde Trend-Ausstellungen. So ist am Suzhou Creek ein futuristisch wirkendes Kultur- und Reiseziel entstanden.'
    },
    notes: [
      {
        icon: 'smile',
        text: {
          zh: '你觉得它像什么？问问身边的中国朋友，答案可能比官方介绍更有趣。',
          de: 'Woran erinnert euch das Gebäude? Fragt chinesische Freunde – ihre Antworten sind vielleicht interessanter als die offizielle Beschreibung.'
        }
      },
      {
        icon: 'idea',
        text: {
          zh: '德国汉堡也有一座被我们戏称为“德国版天安千树”的建筑。',
          de: 'Auch in Hamburg gibt es ein Gebäude, das wir scherzhaft die „deutsche Version von 1000 Trees“ nennen.'
        }
      }
    ],
    photoSpots: ['changhua-moganshan', 'changhua-bridge'],
    tips: null
  },

  {
    id: 'buy42',
    type: 'optional',
    order: 20,
    addMin: 20,
    coord: [121.44691720604894, 31.240605840871176],
    name: {
      zh: '善淘BUY42慈善商店',
      en: 'Shantao BUY42 Charity Shop',
      de: 'Shantao BUY42 Charity-Shop'
    },
    addr: {
      zh: '静安区江宁路916号',
      en: 'No. 916 Jiangning Road'
    },
    stay: 20,
    tags: [],
    hours: {
      zh: '4–9 月 9:00–21:00；10–3 月 9:00–20:00',
      de: 'April–September 9:00–21:00; Oktober–März 9:00–20:00'
    },
    highlight: {
      zh: 'Buy42 = Buy for two',
      en: 'Shantao BUY42 is a charity shop.',
      de: 'Buy42 = Buy for two'
    },
    intro: {
      zh: '这是一家社区慈善商店。居民和企业捐来的闲置物品在这里重新流通，门店也为残障伙伴提供就业和培训机会。\n\n买东西、捐东西、做志愿者——在这里看看，公益如何变成社区里可以随手参与的一件小事。\n\nBuy42 = Buy for two：为自己，也为别人。',
      en: 'Most items here are donated by individuals and companies, giving pre-owned things a new life in the city; shopping, donating, or volunteering can all be ways to take part in public good.',
      de: 'Dies ist ein gemeinnütziger Nachbarschaftsladen. Gebrauchte Dinge, die von Anwohnern und Unternehmen gespendet werden, zirkulieren hier weiter; außerdem bietet der Laden Menschen mit Behinderung Arbeitsplätze und Schulungen.\n\nEinkaufen, spenden oder ehrenamtlich helfen – hier lässt sich sehen, wie Gemeinwohl zu etwas wird, an dem man sich im Viertel ganz unkompliziert beteiligen kann.\n\nBuy42 = Buy for two: für sich selbst und für andere.'
    },
    tips: null,
    links: [{ label: { zh: '善淘官网 ↗', en: 'Shantao official website ↗', de: 'Offizielle Website von Shantao ↗' }, url: 'https://www.buy42.com/' }]
  },

  {
    id: 'texmuseum',
    type: 'optional',
    order: 60,
    addMin: 30,
    coord: [121.446125, 31.246907],
    name: { zh: '上海纺织博物馆', en: 'Shanghai Textile Museum', de: 'Textilmuseum Shanghai' },
    addr: {
      zh: '上海市普陀区澳门路128号',
      en: 'No. 128 Aomen Road, Putuo District, Shanghai'
    },
    stay: 30,
    tags: [],
    hours: {
      zh: '周二至周日 9:30–16:00（周一闭馆，法定节假日除外；春节期间闭馆）',
      de: 'Di–So 9:30–16:00 (Montag geschlossen, außer an gesetzlichen Feiertagen; während des Frühlingsfests geschlossen)'
    },
    highlight: {
      zh: '苏州河“母亲工业”的档案室，就在申新九厂原址上。',
      de: 'Das Archiv der „Mutterindustrie“ am Suzhou Creek – auf dem Gelände der ehemaligen Shenxin-Spinnerei Nr. 9.'
    },
    intro: {
      zh: '从明代（1368—1644年）备受推崇的“松江布”，到如今的高科技发展，纺织业一直被誉为上海的“母亲工业”。\n\n如果你想进一步了解上海的纺织工业，位于普陀区的上海纺织博物馆是一个非常值得参观的地方。\n\n博物馆收藏了超过20,000件（套）实物、文献和图片资料，浓缩并展现了上海地区六千多年的纺织历史。',
      de: 'Vom hochgeschätzten „Songjiang-Tuch“ der Ming-Zeit (1368–1644) bis zur heutigen Hightech-Entwicklung gilt die Textilindustrie als Shanghais „Mutterindustrie“.\n\nWer mehr über Shanghais Textilindustrie erfahren möchte, findet im Shanghaier Textilmuseum im Bezirk Putuo einen besonders lohnenden Besuchsort.\n\nDas Museum bewahrt mehr als 20.000 Objekte, Dokumente und Bildmaterialien und bündelt die über sechstausendjährige Textilgeschichte der Region Shanghai.'
    },
    tips: null
  },

  {
    id: 'm50',
    type: 'stop',
    order: 70,
    slot: '13:05–14:00',
    coord: [121.449359, 31.248122],
    name: { zh: 'M50 创意园', en: 'M50 Creative Park', de: 'M50 Kreativpark' },
    addr: {
      zh: '上海市普陀区莫干山路50号',
      en: 'No. 50 Moganshan Road, Putuo District, Shanghai'
    },
    stay: 60,
    tags: [],
    hours: {
      zh: '园区约 08:00–22:00；画廊多为 10:00–18:00，个别周一闭馆',
      de: 'Areal ca. 08:00–22:00; Galerien meist 10:00–18:00, teils montags geschlossen'
    },
    highlight: {
      zh: '纺织厂厂房里长出的当代艺术区，涂鸦墙是它的门面。',
      de: 'Ein zeitgenössisches Kunstviertel in alten Spinnereihallen – mit Graffitiwänden als Aushängeschild.'
    },
    intro: {
      zh: 'M50创意园是一处由废弃纺织厂改造而成的地标性艺术街区。\n\n这里原本是一座纺织厂，于1999年关闭。如今，M50汇集了艺术家工作室、画廊以及各类创意文化机构，并已发展成为充满活力的当代艺术与创意文化聚集地。\n\n园区保留了烟囱、锅炉等工业时代留下的痕迹，同时也融入了涂鸦等现代元素。\n\n在这里还可以体验各种手工活动项目，还有丰富的免费展览可供参观。\n\n最新展览信息请查看M50微信公众号',
      de: 'Der M50 Creative Park ist ein kunstprägendes Viertel, das aus einer stillgelegten Textilfabrik entstanden ist.\n\nHier stand ursprünglich eine Textilfabrik, die 1999 geschlossen wurde. Heute versammelt M50 Künstlerateliers, Galerien und verschiedene kreative Kultureinrichtungen und hat sich zu einem lebendigen Zentrum für zeitgenössische Kunst und Kreativkultur entwickelt.\n\nSchornstein, Kessel und andere Spuren des Industriezeitalters blieben erhalten und verbinden sich mit modernen Elementen wie Graffiti.\n\nAußerdem gibt es verschiedene handwerkliche Aktivitäten und zahlreiche kostenlose Ausstellungen.\n\nFür aktuelle Ausstellungsinformationen bitte den WeChat-Kanal von M50 prüfen.'
    },
    tips: null
  },

  {
    id: 'fuxin',
    type: 'glance',
    order: 100,
    leg: '15:20–16:00',
    coord: [121.464724, 31.241645],
    name: { zh: '福新面粉一厂旧址', en: 'Former Site of Fuxin No. 1 Flour Mill', de: 'Ehemalige Fuxin-Mehlmühle Nr. 1' },
    addr: {
      zh: '上海市静安区光复路423号',
      en: 'No. 423 Guangfu Road'
    },
    stay: 5,
    tags: [],
    hours: {
      zh: '沿河外观，全天可见；内部不开放参观',
      de: 'Ansicht vom Ufer jederzeit möglich; innen keine Besichtigung'
    },
    highlight: {
      zh: '河边一排老厂房，是苏州河“面粉厂时代”剩下的半页。',
      de: 'Eine Reihe alter Fabrikbauten am Wasser – die halbe Seite, die vom „Mühlenzeitalter“ des Suzhou Creek blieb.'
    },
    intro: {
      zh: '1912 年底，荣宗敬、荣德生兄弟在此创办福新面粉厂，依托苏州河水运与沿岸产业聚集，发展成近代上海最大的私营机器面粉厂。1956 年与阜丰面粉厂合并，后成为上海面粉厂。现存沿河两排建筑：前一排为清水青红砖的砖木结构二至三层楼房，后排为六层钢筋混凝土框架。南墙仍可见“福新面粉公司”字样。',
      de: 'Ende 1912 gründeten die Brüder Rong Zongjing und Rong Desheng hier die Fuxin-Mehlmühle. Dank der Binnenschifffahrt auf dem Suzhou Creek und der benachbarten Betriebe wuchs sie zur größten privaten Maschinenmühle Shanghais. 1956 fusionierte sie mit der Fufeng-Mühle, später wurde daraus die Shanghaier Mehlwerke. Erhalten sind zwei Gebäudereihen am Wasser: vorne zwei- bis dreigeschossige Ziegelbauten mit rot-grünem Sichtmauerwerk, hinten ein sechsgeschossiger Stahlbetonbau. An der Südwand ist noch der Schriftzug „Fuxin Flour Company“ zu erkennen.'
    },
    tips: null
  },

  {
    id: 'butterfly',
    type: 'stop',
    order: 80,
    slot: '14:45–15:20',
    coord: [121.456146, 31.237291],
    name: {
      zh: '蝴蝶湾党群服务中心',
      en: 'Butterfly Bay Community Party and Public Service Center',
      de: 'Stadtteilzentrum Butterfly Bay'
    },
    addr: {
      zh: '上海市静安区康定东路85号',
      en: 'No. 85 East Kangding Road, Jing’an District, Shanghai'
    },
    stay: 30,
    tags: [
      { key: 'community-food', icon: 'food', label: { zh: '最美社区食堂', de: 'Schönste Nachbarschaftskantine' } },
      { key: 'cafe', icon: 'coffee', label: { zh: '咖啡馆', de: 'Café' } },
      { key: 'library', icon: 'library', label: { zh: '图书馆', de: 'Bibliothek' } },
      { key: 'residence', icon: 'residence', label: { zh: '名人故居', de: 'Wohnhaus einer berühmten Persönlichkeit' } }
    ],
    hours: {
      zh: '邻里楼约 8:30–20:30，蝴蝶堡约 8:30–20:00，水晶宫约 9:00–17:00（各空间略有差异）',
      de: 'Nachbarschaftsgebäude ca. 8:30–20:30, „Schmetterlingsburg“ ca. 8:30–20:00, „Kristallpalast“ ca. 9:00–17:00 (Abweichungen möglich)'
    },
    highlight: {
      zh: '不是景点：一个向所有人开放的社区客厅。',
      de: 'Keine Sehenswürdigkeit, sondern ein offenes Wohnzimmer für alle im Quartier.'
    },
    intro: {
      zh: '服务中心的核心建筑“蝴蝶堡”是一栋有百余年历史、具有安妮女王复兴风格的老建筑，与女作家张爱玲故居改造的“邻里楼”和原泵房改造的“水晶宫”向周边居民提供阅读、休息、玩乐与便民服务，也常举办社区市集和手作活动。\n\n周边是蝴蝶湾公园与苏州河滨水步道，这类空间在中国城市里非常普遍，却很少出现在游客路线中——它展示的是“15 分钟社区生活圈”的日常运行方式。',
      de: 'Das Kerngebäude des Zentrums, die „Schmetterlingsburg“, ist ein über hundert Jahre altes Gebäude im Queen-Anne-Revival-Stil. Zusammen mit dem zum ehemaligen Wohnhaus der Schriftstellerin Eileen Chang umgebauten „Nachbarschaftsgebäude“ und dem aus einem früheren Pumpenhaus entstandenen „Kristallpalast“ bietet es den Anwohnern Raum zum Lesen, Ausruhen, Spielen und für praktische Dienstleistungen; außerdem finden hier oft Quartiersmärkte und Handwerksaktivitäten statt.\n\nIn der Umgebung liegen der Schmetterlingsbucht-Park und die Uferpromenade des Suzhou Creek. Solche Orte sind in chinesischen Städten sehr verbreitet, tauchen aber nur selten in Touristenrouten auf – hier zeigt sich, wie ein „15-Minuten-Lebenskreis“ im Alltag funktioniert.'
    },
    story: {
      label: { zh: '了解张爱玲', de: 'Mehr über Eileen Chang' },
      body: {
        zh: '张爱玲（1920—1995）出生于上海，是20世纪中国最具代表性的女作家之一。康定东路85号这幢建筑曾是张爱玲家族的住宅，她出生于此，并在这里度过了童年时光。\n\n张爱玲以书写上海都市生活见长，更关注时代变化中的普通人。她笔下的上海既摩登繁华，又充满细腻的人情与时代变迁。\n\n她的短篇小说《色，戒》后来被著名导演李安（Ang Lee）改编为同名电影，并于2007年获得第64届威尼斯国际电影节最佳影片金狮奖。',
        de: 'Eileen Chang (1920–1995) wurde in Shanghai geboren und zählt zu den bedeutendsten chinesischen Schriftstellerinnen des 20. Jahrhunderts. Das Gebäude in der Kangding East Road 85 war einst das Wohnhaus ihrer Familie; hier wurde sie geboren und verbrachte ihre Kindheit.\n\nEileen Chang wurde vor allem durch ihre Schilderungen des städtischen Lebens in Shanghai bekannt und richtete ihren Blick auf gewöhnliche Menschen im Wandel der Zeit. Ihr Shanghai ist zugleich modern und mondän, voller feiner menschlicher Beziehungen und historischer Veränderungen.\n\nIhre Kurzgeschichte „Lust, Caution“ wurde später vom bekannten Regisseur Ang Lee verfilmt. Der gleichnamige Film gewann 2007 den Goldenen Löwen als bester Film bei den 64. Internationalen Filmfestspielen von Venedig.'
      }
    },
    tips: null
  },

  {
    id: 'chapter-creek',
    type: 'chapter',
    order: 85,
    title: {
      zh: '苏州河滨水步行段',
      en: 'Suzhou Creek Riverside Walk',
      de: 'Suzhou-Creek-Uferweg'
    },
    body: {
      zh: '苏州河曾因水运聚集纺织厂、面粉厂、仓库和其他工业设施，也一度经历严重污染。\n\n在20世纪上半叶，这片工业岸线附近也生活着大量工人和普通市民，一些极其简陋、低矮的棚屋被上海人称作“滚地龙”。那时，一边是南京路、百货公司、舞厅和霓虹灯，另一边却是工厂、棚屋和为生计奔忙的人——距离并不遥远，却像两个完全不同的上海。\n\n今天再沿河走，旧工厂变成艺术园区，工业岸线成为跑步、遛狗、滑板和休息的公共空间，曾经普通甚至贫困的河岸，也成了价格不菲的城市地段。',
      de: 'Der Suzhou Creek zog einst Spinnereien, Mühlen, Lagerhäuser und weitere Industriebetriebe an und war zeitweise schwer verschmutzt.\n\nIn der ersten Hälfte des 20. Jahrhunderts lebten hier viele Arbeiter und gewöhnliche Stadtbewohner. Äußerst einfache, niedrige Hütten wurden in Shanghai „Gundilong“ genannt. Auf der einen Seite lagen Nanjing Road, Kaufhäuser, Tanzlokale und Neonlicht, auf der anderen Fabriken, Hütten und Menschen, die um ihren Lebensunterhalt kämpften – nicht weit voneinander entfernt und doch zwei völlig verschiedene Städte.\n\nHeute sind alte Fabriken Kunstviertel, das Industrieufer ist öffentlicher Raum für Jogger, Hunde, Skateboards und Pausen. Das einst gewöhnliche, teils arme Ufer ist zugleich zu einer teuren Stadtlage geworden.'
    },
    bookNote: {
      zh: '石库门、棚户区、人力车夫、菜场、煤球店、烟纸店、老虎灶，以及生活在弄堂里的普通市民。',
      de: 'Shikumen, Hüttensiedlungen, Rikschafahrer, Märkte, Kohlenläden, Tabak- und Papierläden, öffentliche Kochstellen – und die gewöhnlichen Menschen, die in den Gassen lebten.'
    },
    links: [{ label: { zh: '《霓虹灯外：20世纪初日常生活中的上海》', en: 'Beyond the Neon Lights: Everyday Shanghai in the Early Twentieth Century', de: 'Beyond the Neon Lights: Everyday Shanghai in the Early Twentieth Century' }, url: { zh: 'https://book.douban.com/subject/30254263/', en: 'https://www.ucpress.edu/book/9780520262202/beyond-the-neon-lights', de: 'https://www.ucpress.edu/books/beyond-the-neon-lights/paper' } }]
  },

  {
    id: 'skate',
    type: 'glance',
    order: 90,
    leg: '15:20–16:00',
    coord: [121.462789, 31.241846],
    name: {
      zh: '静安 SPORT 潮涌苏河嗨派滑板公园',
      en: 'Suhe Haipai Skate Park',
      de: 'Suhe Haipai Skatepark'
    },
    addr: {
      zh: '上海市静安区共和新路与光复路交叉口（南北高架桥下）',
      en: 'Intersection of Gonghexin Road and Guangfu Road (under the elevated road), Jing’an District, Shanghai'
    },
    stay: 5,
    tags: [],
    hours: {
      zh: '约 6:00–22:00，免费使用；维护或极端天气可能临时关闭',
      de: 'ca. 6:00–22:00, kostenlos; bei Wartung oder Unwetter vorübergehend geschlossen'
    },
    highlight: {
      zh: '高架桥下的滑板场：城市把剩余空间交给了年轻人。',
      de: 'Ein Skatepark unter der Hochstraße: Die Stadt überlässt den Restflächen den Jungen.'
    },
    intro: {
      zh: '这片场地位于南北高架与苏州河之间，原是功能单一的桥下停车场与球场。改造后加入跑步道、滑板场与霹雳舞舞台，成为“桥下空间再利用”的样板：曾经的灰色剩余空间，如今是附近居民和滑板爱好者的日常据点。旁边还配了市民驿站，提供饮水、厕所和休息位。',
      de: 'Das Gelände liegt zwischen der Hochstraße und dem Suzhou Creek; früher war es ein funktionsarmer Parkplatz unter der Brücke. Nach dem Umbau kamen Laufbahn, Skatefläche und Breakdance-Bühne hinzu – ein Musterbeispiel für die Nutzbarmachung von Restflächen unter Brücken: Aus einem grauen Niemandsort ist ein Treffpunkt für Anwohner und Skater geworden. Daneben steht eine Station mit Trinkwasser, Toiletten und Sitzgelegenheiten.'
    },
    tips: null
  },

  {
    id: 'fotografiska',
    type: 'optional',
    order: 105,
    addMin: 50,
    coord: [121.46527, 31.24166],
    name: { zh: 'Fotografiska 上海影像艺术中心', en: 'Fotografiska Shanghai', de: 'Fotografiska Shanghai' },
    addr: {
      zh: '上海市静安区光复路127号',
      en: 'No. 127 Guangfu Road, Jing’an District, Shanghai'
    },
    stay: 50,
    tags: [
      { key: 'art', icon: 'art', label: { zh: '艺术馆', de: 'Kunstzentrum' } },
      { key: 'cafe', icon: 'coffee', label: { zh: '咖啡馆', de: 'Café' } }
    ],
    hours: {
      zh: '每天 10:30–23:00',
      de: 'täglich 10:30–23:00'
    },
    highlight: {
      zh: '从银行仓库到国际影像艺术机构，苏州河边的工业建筑继续讲述城市。',
      de: 'Vom Banklagerhaus zur internationalen Institution für visuelle Kunst – ein Industriebau am Suzhou Creek erzählt weiter von der Stadt.'
    },
    intro: {
      zh: 'Fotografiska 是一家源自斯德哥尔摩的国际影像艺术机构，上海馆坐落在苏州河畔，由一座始建于 1931 年的银行仓库改建而成，也是四行仓库体系的一部分。\n\n四层高的仓库保留了早期工业建筑的尺度和现代主义外观，如今则被重新改造成摄影、影像、装置和当代视觉艺术的展览空间。',
      de: 'Fotografiska ist eine internationale Institution für Fotografie und visuelle Kunst mit Ursprung in Stockholm. Der Standort Shanghai liegt am Suzhou Creek und wurde in einem 1931 errichteten Banklagerhaus eingerichtet, das Teil des Sihang-Warehouse-Komplexes ist.\n\nDas viergeschossige Lagerhaus bewahrt die Dimensionen und die moderne Fassade der frühen Industriearchitektur. Heute ist es ein Ausstellungsort für Fotografie, Bewegtbild, Installationen und zeitgenössische visuelle Kunst.'
    },
    tips: null,
    links: [{ label: { zh: 'Fotografiska 官方网站 ↗', en: 'Fotografiska official website ↗', de: 'Offizielle Website von Fotografiska ↗' }, url: { zh: 'https://shanghai.fotografiska.com/zh/', en: 'https://shanghai.fotografiska.com/zh/', de: 'https://shanghai.fotografiska.com/en' } }]
  },

  {
    id: 'sihang',
    type: 'stop',
    order: 110,
    slot: '16:00–17:00',
    coord: [121.471089, 31.240258],
    name: {
      zh: '四行仓库纪念馆',
      en: 'Shanghai Sihang Warehouse Battle Memorial',
      de: 'Sihang-Lagerhaus-Gedenkstätte'
    },
    addr: {
      zh: '上海市静安区光复路21号',
      en: 'No. 21 Guangfu Road, Jing’an District, Shanghai'
    },
    stay: 50,
    tags: ['id'],
    hours: {
      zh: '周二至周日 9:00–16:30（16:00 停止入馆）；周一闭馆，法定节假日除外；免费、免预约',
      de: 'Di–So 9:00–16:30 (Einlass bis 16:00); montags geschlossen außer an Feiertagen; kostenlos, ohne Anmeldung'
    },
    highlight: {
      zh: '城市把一场战役留在原址上，也留在公共记忆里。',
      de: 'Die Stadt bewahrt eine Schlacht am Originalschauplatz – und im öffentlichen Gedächtnis.'
    },
    intro: {
      zh: '1937年淞沪会战末期，中国军队第88师420余名官兵在谢晋元率领下坚守四行仓库四昼夜，后来以“八百壮士”闻名。今天的上海四行仓库抗战纪念馆就建在这处战场旧址之上，西墙至今仍保留着当年的弹孔与炮击痕迹。\n\n纪念馆的核心展览围绕四行仓库保卫战展开，通过史料、场景复原等方式再现战斗经过与守军事迹。展陈规模不大，却把“遗址、战斗、纪念”三层含义叠在同一栋建筑里。这里也是本路线的终点：从寺庙、市井、工厂、河岸一路走到战争记忆。',
      de: 'Ende der Schlacht um Shanghai 1937 hielten sich mehr als 420 Soldaten der chinesischen 88. Division unter dem Kommando von Xie Jinyuan vier Tage und vier Nächte im Sihang-Lagerhaus. Später wurden sie als „800 Helden“ bekannt. Das heutige Shanghai Sihang Warehouse Battle Memorial steht auf diesem ehemaligen Schlachtfeld; an der Westwand sind bis heute Einschusslöcher und Spuren des Beschusses erhalten.\n\nDie zentrale Ausstellung des Memorials widmet sich der Verteidigung des Sihang-Lagerhauses und rekonstruiert anhand historischer Quellen und szenischer Darstellungen den Verlauf der Kämpfe und die Taten der Verteidiger. Die Ausstellung ist nicht groß, verbindet aber in einem Gebäude die drei Ebenen „historischer Ort, Schlacht und Gedenken“. Hier endet auch diese Route: Sie führt von Tempel, Alltag, Fabriken und Flussufer bis zur Erinnerung an den Krieg.'
    },
    tips: null,
    linksTitle: { zh: '推荐电影', de: 'Filmtipp' },
    filmNote: {
      zh: '一河之隔，一边是炮火中的生死战场，另一边却灯火如常，人们喝着咖啡，隔岸围观这场战争。',
      de: 'Nur durch den Fluss getrennt: Auf der einen Seite tobte ein Kampf auf Leben und Tod, auf der anderen gingen die Lichter an, während Menschen Kaffee tranken und den Krieg vom gegenüberliegenden Ufer aus beobachteten.'
    },
    links: [
          {
        label: { zh: '了解《八佰》 ↗', en: 'more about The Eight Hundred ↗', de: 'Mehr über The Eight Hundred ↗' },
        url: 'https://www.cinema.de/film/the-800%2C10371922.html?utm_source=chatgpt.com'
      }
    ]
  },

  {
    id: 'joycity',
    type: 'optional',
    order: 120,
    addMin: 60,
    coord: [121.472158, 31.243898],
    name: { zh: '静安大悦城', en: 'Jing’an Joy City', de: 'Jing’an Joy City' },
    addr: {
      zh: '上海市静安区西藏北路166号',
      en: 'No. 166 North Xizang Road, Jing’an District, Shanghai'
    },
    stay: 60,
    tags: [
      'mall',
      { key: 'ferris', icon: 'ferris', label: { zh: '摩天轮', de: 'Riesenrad' } }
    ],
    hours: {
      zh: '约 10:00–22:00；摩天轮约 11:00–21:00（周末与节假日 10:00 起）',
      de: 'ca. 10:00–22:00; Riesenrad ca. 11:00–21:00 (am Wochenende ab 10:00)'
    },
    highlight: {
      zh: '二次元、快闪与屋顶摩天轮：上海年轻人的商业切面。',
      de: 'Anime-Kultur, Pop-up-Stores und ein Riesenrad auf dem Dach: Shanghais junge Konsumwelt.'
    },
    intro: {
      zh: '静安大悦城是上海很有代表性的二次元聚集地。商场里聚集了大量动漫、游戏和潮玩周边店，各种热门 IP 快闪和限定活动几乎不断档。经常能遇到精心妆造的 Coser 在商场里拍照、和同好“集邮”，也有人专程带着角色周边来打卡。',
      de: 'Jing’an Joy City ist einer der bekanntesten Treffpunkte der Anime- und Popkultur in Shanghai. Im Einkaufszentrum gibt es zahlreiche Geschäfte für Anime-, Gaming- und Designer-Toys sowie Fanartikel. Pop-up-Stores und limitierte Aktionen beliebter IPs finden hier nahezu ohne Unterbrechung statt. Häufig sieht man aufwendig kostümierte Cosplayer, die im Einkaufszentrum Fotos machen und sich mit anderen Fans zum „Sammeln“ von Erinnerungsfotos treffen. Manche kommen auch eigens mit Fanartikeln ihrer Lieblingsfiguren zum Check-in.'
    },
    tips: null
  }
];

/* ---------- 推荐拍照点（只显示在地图上，不参与路线计算） ---------- */
const PHOTO_SPOTS = [
  {
    id: 'changhua-moganshan',
    coord: [121.443996, 31.248676],
    name: {
      zh: '昌化路与莫干山路交叉口',
      de: 'Kreuzung Changhua Road / Moganshan Road'
    },
    hint: {
      zh: '推荐拍摄天安千树的街道纵深。',
      de: 'Empfohlener Blick entlang der Straße auf 1000 Trees.'
    }
  },
  {
    id: 'changhua-bridge',
    coord: [121.443891, 31.249791],
    name: {
      zh: '昌化路桥',
      de: 'Changhua Road Bridge'
    },
    hint: {
      zh: '推荐从桥上拍摄天安千树与苏州河。',
      de: 'Empfohlener Blick auf 1000 Trees und den Suzhou Creek.'
    }
  }
];

/* ---------- 隐藏玩法：苏州河游船 ---------- */
const BOAT = {
  zh: {
    title: { zh: '隐藏玩法：苏州河游船', en: 'Hidden option: Suzhou Creek boat ride' },
    paragraphs: [
      '苏州河不仅适合沿岸步行，也可以换个角度坐船看城市。游船沿苏州河穿行，可以从水面欣赏两岸的老建筑、工业遗存、桥梁，以及不断变化的城市天际线。',
      '本次 Citywalk 会经过昌化路码头和四行仓库码头，都可以作为上船点。部分航线可一路前往外滩源，也就是苏州河汇入黄浦江前的河口区域。'
    ],
    ticket: '购票和游船路线信息：悠游苏州河微信公众号。也可以请你的中国学生 Buddy 帮忙查一下'
  },
  de: {
    title: { zh: '隐藏玩法：苏州河游船', en: 'Hidden option: Suzhou Creek boat ride' },
    paragraphs: [
      'Der Suzhou Creek eignet sich nicht nur für Spaziergänge am Ufer – man kann die Stadt auch vom Wasser aus entdecken. Die Boote fahren den Fluss entlang und eröffnen den Blick auf alte Gebäude, industrielle Relikte, Brücken und eine sich ständig verändernde Skyline.',
      'Auf dieser Citywalk-Route kommt man am Changhua-Road-Pier und am Sihang-Warehouse-Pier vorbei; beide können als Zustieg dienen. Einige Linien fahren weiter bis zum Bund Source, dem Mündungsbereich, bevor der Suzhou Creek in den Huangpu-Fluss fließt.'
    ],
    ticket: 'Ticket- und Routeninformationen: über den WeChat-Account „悠游苏州河“. Dein chinesischer Student Buddy kann beim Nachschauen helfen'
  },
};

/* ---------- 结尾总结 ---------- */
const ENDING = {
  zh: {
    title: { zh: '结语：另一面的上海', en: 'Conclusion: Another Side of Shanghai' },
    body: [
      '上海不只有外滩的天际线、繁华的商业街和被反复介绍的城市地标。',
      '今天，你看到寺院如何融入社区，旧里弄和工厂如何获得新的用途，曾经污染的河岸如何成为居民散步、运动和休息的公共空间，也看到城市如何保存战争记忆。城市在这里被生活使用，也在这里不断变化；有些记忆被更新，有些记忆则被保留下来。',
      '也许，这些不那么耀眼、却一直在运转的地方，正是上海最值得慢慢看的另一面。'
    ],
    question: '今天哪一个地方，让你觉得自己看到了不一样的上海？'
  },
  de: {
    title: { zh: '结语：另一面的上海', en: 'Conclusion: Another Side of Shanghai' },
    body: [
      'Shanghai ist mehr als die Skyline des Bunds, glänzende Einkaufsstraßen und die immer wieder vorgestellten Sehenswürdigkeiten.',
      'Heute habt ihr gesehen, wie ein Tempel Teil einer Nachbarschaft ist, wie alte Gassen und Fabriken neue Aufgaben bekommen, wie ein einst verseuchtes Ufer zum öffentlichen Raum für Spaziergänge, Sport und Pausen wurde – und wie eine Stadt ihre Kriegserinnerung bewahrt. Die Stadt wird hier vom Alltag genutzt und verändert sich zugleich; manche Erinnerungen werden erneuert, andere bleiben erhalten.',
      'Vielleicht sind gerade diese unscheinbaren Orte, die ständig in Betrieb bleiben, die andere Seite Shanghais, die es sich am meisten lohnt, langsam zu entdecken.'
    ],
    question: 'Welcher Ort hat dir heute das Gefühl gegeben, eine andere Seite Shanghais zu sehen?'
  }
};

/* ---------- 页脚参考入口 ---------- */
const FOOT_LINKS = [];

/* ---------- 路线基础信息 ---------- */
const ROUTE_META = {
  baseMinutes: 480,      // 09:00–17:00
  fallbackKm: 6.5        // 地图未加载时的步行距离估算
};

