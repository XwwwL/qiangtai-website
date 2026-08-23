// Add Japanese/Korean product-level translations
import { readFileSync, writeFileSync } from "node:fs";

// Japanese/Korean product name mappings (74 products)
const names = {
  // Camlock
  "camlock-type-a": { ja: "カムロック継手 A型", ko: "캠록 커플링 A형" },
  "camlock-type-b": { ja: "カムロック継手 B型", ko: "캠록 커플링 B형" },
  "camlock-type-c": { ja: "カムロック継手 C型", ko: "캠록 커플링 C형" },
  "camlock-type-d": { ja: "カムロック継手 D型", ko: "캠록 커플링 D형" },
  "camlock-type-f": { ja: "カムロック継手 F型", ko: "캠록 커플링 F형" },
  // Threaded fittings
  "pipe-cap": { ja: "ねじ込み管キャップ", ko: "나사식 파이프 캡" },
  "threaded-plug": { ja: "ねじ込みプラグ", ko: "나사식 플러그" },
  "threaded-bushing": { ja: "ねじ込みブッシング", ko: "나사식 부싱" },
  "male-threaded-tee": { ja: "おねじティー", ko: "수나사 티" },
  "male-threaded-elbow": { ja: "おねじエルボ", ko: "수나사 엘보" },
  "double-male-union": { ja: "両おねじユニオン", ko: "양수나사 유니온" },
  "reducing-tee": { ja: "径違いティー", ko: "레듀싱 티" },
  "female-threaded-elbow": { ja: "めねじエルボ", ko: "암나사 엘보" },
  "male-female-elbow": { ja: "おねじ×めねじエルボ", ko: "수×암나사 엘보" },
  "hex-male-threaded-nipple": { ja: "六角おねじニップル", ko: "육각 수나사 니플" },
  "female-coupling": { ja: "めねじカップリング", ko: "암나사 커플링" },
  "threaded-cross": { ja: "ねじ込みクロス", ko: "나사식 크로스" },
  "female-threaded-tee": { ja: "めねじティー", ko: "암나사 티" },
  "female-threaded-union": { ja: "めねじユニオン", ko: "암나사 유니온" },
  "y-type-tee": { ja: "Y型ティー", ko: "Y형 티" },
  "three-dimensional-tee": { ja: "立体ティー", ko: "입체 티" },
  "male-female-threaded-tee": { ja: "おねじ×めねじティー", ko: "수×암나사 티" },
  "male-female-threaded-coupling": { ja: "おねじ×めねじカップリング", ko: "수×암나사 커플링" },
  // Threaded pipes
  "polished-pipe-nipple-male": { ja: "研磨管ニップル（片側おねじ）", ko: "연마 파이프 니플(한쪽 수나사)" },
  "polished-female-pipe-nipple": { ja: "研磨管ニップル（めねじ）", ko: "연마 파이프 니플(암나사)" },
  "full-thread-pipe-nipple": { ja: "全ねじパイプニップル", ko: "전나사 파이프 니플" },
  "hexagon-hose-nipple": { ja: "六角ホースニップル", ko: "육각 호스 니플" },
  "polished-extended-nipple": { ja: "研磨ロングニップル", ko: "연마 롱 니플" },
  // High pressure
  "forged-hp-threaded-coupling": { ja: "鍛造高圧ねじ込みカップリング", ko: "단조 고압 나사식 커플링" },
  "forged-hp-threaded-union": { ja: "鍛造高圧ねじ込みユニオン", ko: "단조 고압 나사식 유니온" },
  "forged-hp-elbow-male-female": { ja: "鍛造高圧エルボ（おねじ×めねじ）", ko: "단조 고압 엘보(수×암나사)" },
  "forged-hp-threaded-tee": { ja: "鍛造高圧ねじ込みティー", ko: "단조 고압 나사식 티" },
  "forged-hp-elbow-female": { ja: "鍛造高圧めねじエルボ", ko: "단조 고압 암나사 엘보" },
  // Threaded valves
  "y-strainer": { ja: "Y型ストレーナー", ko: "Y형 스트레이너" },
  "one-piece-threaded-ball-valve": { ja: "一体式ねじ込みボールバルブ", ko: "일체형 나사식 볼 밸브" },
  "three-piece-threaded-ball-valve": { ja: "三体式ねじ込みボールバルブ", ko: "3피스 나사식 볼 밸브" },
  "three-piece-weld-ball-valve-bleed": { ja: "三体式ブロー付き溶接ボールバルブ", ko: "3피스 블리드 용접 볼 밸브" },
  "three-piece-clamp-ball-valve": { ja: "三体式クランプボールバルブ", ko: "3피스 클램프 볼 밸브" },
  "three-piece-weld-ball-valve": { ja: "三体式溶接ボールバルブ", ko: "3피스 용접 볼 밸브" },
  "two-piece-threaded-ball-valve": { ja: "二体式ねじ込みボールバルブ", ko: "2피스 나사식 볼 밸브" },
  "threaded-three-way-ball-valve": { ja: "ねじ込み三方ボールバルブ", ko: "나사식 3방향 볼 밸브" },
  "threaded-check-valve": { ja: "ねじ込み逆止弁", ko: "나사식 체크 밸브" },
  "threaded-gate-valve": { ja: "ねじ込みゲートバルブ", ko: "나사식 게이트 밸브" },
  "vertical-check-valve": { ja: "縦型逆止弁", ko: "수직 체크 밸브" },
  "ansi-threaded-globe-valve": { ja: "ANSIねじ込みグローブバルブ", ko: "ANSI 나사식 글로브 밸브" },
  // Pneumatic
  "pneumatic-three-piece-flanged-ball-valve": { ja: "空気作動三体式フランジボールバルブ", ko: "공압 3피스 플랜지 볼 밸브" },
  "pneumatic-three-piece-ball-valve": { ja: "空気作動三体式ボールバルブ", ko: "공압 3피스 볼 밸브" },
  "pneumatic-three-way-flanged-ball-valve": { ja: "空気作動三方フランジボールバルブ", ko: "공압 3방향 플랜지 볼 밸브" },
  // Flanged multi-way
  "q44f-three-way-flanged-ball-valve": { ja: "Q44F-16P三方フランジボールバルブ", ko: "Q44F-16P 3방향 플랜지 볼 밸브" },
  "q45f-three-way-flanged-ball-valve": { ja: "Q45F-16P三方フランジボールバルブ", ko: "Q45F-16P 3방향 플랜지 볼 밸브" },
  "q46f-four-way-ball-valve": { ja: "Q46F-16P四方ボールバルブ", ko: "Q46F-16P 4방향 볼 밸브" },
  "ansi-three-way-flanged-ball-valve": { ja: "ANSI三方フランジボールバルブ", ko: "ANSI 3방향 플랜지 볼 밸브" },
  "ansi-high-platform-hard-seal-three-way": { ja: "ANSI高台ハードシール三方ボールバルブ", ko: "ANSI 고플랫폼 하드실 3방향 볼 밸브" },
  "fluorine-lined-t-type-three-way": { ja: "フッ素ライニングT型三方ボールバルブ", ko: "불소 라이닝 T형 3방향 볼 밸브" },
  // Electric
  "electric-three-way-flanged-ball-valve": { ja: "電動三方フランジボールバルブ", ko: "전동 3방향 플랜지 볼 밸브" },
  "electric-intelligent-flanged-ball-valve": { ja: "電動インテリジェントフランジボールバルブ", ko: "전동 지능형 플랜지 볼 밸브" },
  "part-turn-electric-flanged-ball-valve": { ja: "部分回転電動フランジボールバルブ", ko: "부분 회전 전동 플랜지 볼 밸브" },
  "explosion-proof-electric-intelligent-flanged": { ja: "防爆電動インテリジェントフランジボールバルブ", ko: "방폭 전동 지능형 플랜지 볼 밸브" },
  "explosion-proof-electric-flanged": { ja: "防爆電動フランジボールバルブ", ko: "방폭 전동 플랜지 볼 밸브" },
  // Hard/soft seal
  "gb-hard-seal-flanged-ball-valve": { ja: "国標ハードシールフランジボールバルブ", ko: "GB 하드실 플랜지 볼 밸브" },
  "gb-soft-seal-flanged-ball-valve": { ja: "国標ソフトシールフランジボールバルブ", ko: "GB 소프트실 플랜지 볼 밸브" },
  "din-soft-seal-flanged-ball-valve": { ja: "独標ソフトシールフランジボールバルブ", ko: "DIN 소프트실 플랜지 볼 밸브" },
  "ansi-hard-seal-flanged-ball-valve": { ja: "ANSIハードシールフランジボールバルブ", ko: "ANSI 하드실 플랜지 볼 밸브" },
  "ansi-soft-seal-flanged-ball-valve": { ja: "ANSIソフトシールフランジボールバルブ", ko: "ANSI 소프트실 플랜지 볼 밸브" },
  // Forged steel
  "italian-wafer-flanged-ball-valve": { ja: "イタリア式ウェハーフランジボールバルブ", ko: "이탈리아식 웨이퍼 플랜지 볼 밸브" },
  "forged-three-piece-threaded-ball-valve": { ja: "鍛鋼三体式ねじ込みボールバルブ", ko: "단조 3피스 나사식 볼 밸브" },
  "forged-three-piece-extended-weld": { ja: "鍛鋼三体式ロング溶接ボールバルブ", ko: "단조 3피스 롱 용접 볼 밸브" },
  "forged-three-piece-round-weld": { ja: "鍛鋼三体式丸形溶接ボールバルブ", ko: "단조 3피스 원형 용접 볼 밸브" },
  "forged-three-piece-socket-weld": { ja: "鍛鋼三体式ソケット溶接ボールバルブ", ko: "단조 3피스 소켓 용접 볼 밸브" },
  "forged-three-piece-square-weld": { ja: "鍛鋼三体式角形溶接ボールバルブ", ko: "단조 3피스 각형 용접 볼 밸브" },
  "forged-three-piece-flanged-ball-valve": { ja: "鍛鋼三体式フランジボールバルブ", ko: "단조 3피스 플랜지 볼 밸브" },
  "forged-two-piece-threaded-ball-valve": { ja: "鍛鋼二体式ねじ込みボールバルブ", ko: "단조 2피스 나사식 볼 밸브" },
  "forged-two-piece-flanged-ball-valve": { ja: "鍛鋼二体式フランジボールバルブ", ko: "단조 2피스 플랜지 볼 밸브" },
  "forged-italian-wafer-ball-valve": { ja: "鍛鋼イタリア式ウェハーボールバルブ", ko: "단조 이탈리아식 웨이퍼 볼 밸브" },
};

// Category-level ja/ko data
const catJaKo = {
  "threaded-pipe-fittings": {
    nameJa: "ねじ込み管継手", nameKo: "나사식 배관 피팅",
    descJa: "ANSI・DIN・BS・JISなどの国際規格に準拠したねじ込み管継手です。エルボ、ティー、クロス、カップリング、ユニオン、キャップ、プラグ、ブッシングなどを取り揃えています。",
    descKo: "ANSI, DIN, BS, JIS 등 국제 표준에 따라 제조된 나사식 배관 피팅입니다. 엘보, 티, 크로스, 커플링, 유니온, 캡, 플러그, 부싱 등을 갖추고 있습니다.",
    fJa: ["精密なNPT/BSPT/BSPPねじ加工", "1/8〜4インチサイズ対応", "ステンレス鋼304/316/316L", "亜鉛めっき炭素鋼対応", "ANSI/DIN/BS/JIS規格準拠"],
    fKo: ["정밀 NPT/BSPT/BSPP 나사 가공", "1/8~4인치 크기", "스테인리스강 304/316/316L", "아연도금 탄소강", "ANSI/DIN/BS/JIS 규격"],
    mJa: ["ステンレス鋼304", "ステンレス鋼316", "ステンレス鋼316L", "炭素鋼", "亜鉛めっき鋼"],
    mKo: ["스테인리스강 304", "스테인리스강 316", "스테인리스강 316L", "탄소강", "아연도금강"],
    aJa: ["水処理", "石油・ガス", "化学処理", "配管システム", "消防", "空調"],
    aKo: ["수처리", "석유·가스", "화학 처리", "배관 시스템", "소방", "공조"],
  },
  "threaded-pipes": {
    nameJa: "ねじ込みパイプ・ニップル", nameKo: "나사식 파이프·니플",
    descJa: "研磨管、六角ホースニップル、全ねじニップル、ロングニップルなどのねじ込みパイプ製品です。",
    descKo: "연마 파이프, 육각 호스 니플, 전나사 니플, 롱 니플 등 나사식 파이프 제품입니다.",
    fJa: ["継目無・溶接管対応", "研磨仕上げ対応", "長さカスタム可能", "NPT/BSPT/BSPPねじ"],
    fKo: ["이음매 없는·용접관 지원", "연마 마감", "길이 맞춤 가능", "NPT/BSPT/BSPP 나사"],
    mJa: ["ステンレス鋼304", "ステンレス鋼316", "炭素鋼"],
    mKo: ["스테인리스강 304", "스테인리스강 316", "탄소강"],
    aJa: ["流体輸送", "圧縮空気", "計装配管", "油圧システム", "食品加工"],
    aKo: ["유체 수송", "압축 공기", "계장 배관", "유압 시스템", "식품 가공"],
  },
  "high-pressure-fittings": {
    nameJa: "高圧管継手", nameKo: "고압 배관 피팅",
    descJa: "6000 psiまでの鍛鋼高圧継手です。油圧・高圧流体・オフショア用途に最適です。",
    descKo: "6000 psi까지 견디는 단조 고압 피팅입니다. 유압, 고압 유체, 해양 용도에 최적입니다.",
    fJa: ["鍛鋼構造", "6000 psi対応", "精密ねじ加工", "NPT/BSPP接続", "個別圧力試験"],
    fKo: ["단조 구조", "6000 psi 대응", "정밀 나사 가공", "NPT/BSPP 연결", "개별 압력 시험"],
    mJa: ["鍛造炭素鋼", "鍛造ステンレス鋼316", "合金鋼"],
    mKo: ["단조 탄소강", "단조 스테인리스강 316", "합금강"],
    aJa: ["油圧システム", "高圧流体輸送", "薬液注入", "オフショア", "石油・ガス"],
    aKo: ["유압 시스템", "고압 유체 수송", "약액 주입", "해양", "석유·가스"],
  },
  "camlock-couplings": {
    nameJa: "カムロック継手", nameKo: "캠록 커플링",
    descJa: "A〜F型のクイック接続カムロック継手です。流体の迅速な接続・切離しに最適です。",
    descKo: "A~F형의 퀵 커넥트 캠록 커플링입니다. 유체의 신속한 연결·분리에 최적입니다.",
    fJa: ["クイック接続/切離し", "ステンレス鋼カムアーム", "漏れ防止シール", "国際規格互換", "A/B/C/D/E/F型対応"],
    fKo: ["퀵 연결/분리", "스테인리스 캠 암", "누수 방지 실", "국제 규격 호환", "A/B/C/D/E/F형"],
    mJa: ["ステンレス鋼304", "ステンレス鋼316", "アルミニウム", "真鍮"],
    mKo: ["스테인리스강 304", "스테인리스강 316", "알루미늄", "황동"],
    aJa: ["石油輸送", "化学処理", "農業・灌漑", "食品加工", "水処理"],
    aKo: ["석유 수송", "화학 처리", "농업·관개", "식품 가공", "수처리"],
  },
  "threaded-valves-ball-valves": {
    nameJa: "ねじ込みバルブ・ボールバルブ", nameKo: "나사식 밸브·볼 밸브",
    descJa: "ねじ込みボールバルブ、ゲートバルブ、グローブバルブ、逆止弁、Y型ストレーナーなどのバルブ製品です。",
    descKo: "나사식 볼 밸브, 게이트 밸브, 글로브 밸브, 체크 밸브, Y형 스트레이너 등의 밸브 제품입니다.",
    fJa: ["ブローアウト防止ステム", "ISO 5211取付台", "NPT/BSPTねじ", "各種ボディ構造"],
    fKo: ["블로아웃 방지 스템", "ISO 5211 장착대", "NPT/BSPT 나사", "다양한 바디 구조"],
    mJa: ["ステンレス鋼304", "ステンレス鋼316", "炭素鋼"],
    mKo: ["스테인리스강 304", "스테인리스강 316", "탄소강"],
    aJa: ["水処理", "化学処理", "石油・ガス", "一般工業"],
    aKo: ["수처리", "화학 처리", "석유·가스", "일반 산업"],
  },
  "forged-steel-ball-valves": {
    nameJa: "鍛鋼ボールバルブ", nameKo: "단조 볼 밸브",
    descJa: "高圧・高温用途向けの鍛鋼ボールバルブです。二体式・三体式、フランジ・ねじ・溶接接続に対応します。",
    descKo: "고압·고온 용도의 단조 볼 밸브입니다. 2피스·3피스, 플랜지·나사·용접 연결을 지원합니다.",
    fJa: ["鍛造ボディ", "二体式・三体式", "高圧対応", "フランジ/ねじ/溶接接続"],
    fKo: ["단조 바디", "2피스·3피스", "고압 대응", "플랜지/나사/용접 연결"],
    mJa: ["鍛造炭素鋼", "鍛造ステンレス鋼316"],
    mKo: ["단조 탄소강", "단조 스테인리스강 316"],
    aJa: ["石油・ガス", "石油化学", "発電", "蒸気用途"],
    aKo: ["석유·가스", "석유화학", "발전", "증기 용도"],
  },
  "flanged-multi-way-ball-valves": {
    nameJa: "フランジ三方・四方ボールバルブ", nameKo: "플랜지 3방향·4방향 볼 밸브",
    descJa: "流れの切替・混合・分配に対応するフランジ多口ボールバルブです。三方・四方構造に対応します。",
    descKo: "유로 전환·혼합·분배에 대응하는 플랜지 다중포트 볼 밸브입니다. 3방향·4방향 구조를 지원합니다.",
    fJa: ["三方L型・T型", "四方構造", "ANSI/DIN/JISフランジ", "コンパクト多口設計"],
    fKo: ["3방향 L형·T형", "4방향 구조", "ANSI/DIN/JIS 플랜지", "컴팩트 다중포트 설계"],
    mJa: ["ステンレス鋼304", "ステンレス鋼316", "炭素鋼"],
    mKo: ["스테인리스강 304", "스테인리스강 316", "탄소강"],
    aJa: ["流れの切替", "媒体混合", "タンクファームマニホールド", "プロセス制御"],
    aKo: ["유로 전환", "매체 혼합", "탱크 팜 매니폴드", "공정 제어"],
  },
  "hard-soft-seal-ball-valves": {
    nameJa: "ハード・ソフトシールボールバルブ", nameKo: "하드·소프트 실 볼 밸브",
    descJa: "金属対金属ハードシールとPTFEソフトシールのボールバルブです。高温・研磨性媒体から一般流体まで対応します。",
    descKo: "금속 대 금속 하드실과 PTFE 소프트실 볼 밸브입니다. 고온·연마성 매체부터 일반 유체까지 대응합니다.",
    fJa: ["金属対金属ハードシール", "PTFE/RPTFEソフトシール", "フローティング・トラニオン式", "広範な材質互換"],
    fKo: ["금속 대 금속 하드실", "PTFE/RPTFE 소프트실", "플로팅·트러니언식", "폭넓은 재질 호환"],
    mJa: ["ステンレス鋼", "超硬コーティングボール", "PTFE/RPTFEシート"],
    mKo: ["스테인리스강", "초경 코팅 볼", "PTFE/RPTFE 시트"],
    aJa: ["高温プロセス", "研磨性スラリー", "化学処理", "一般工業"],
    aKo: ["고온 공정", "연마성 슬러리", "화학 처리", "일반 산업"],
  },
  "electric-ball-valves": {
    nameJa: "電動ボールバルブ", nameKo: "전동 볼 밸브",
    descJa: "電動アクチュエーターを備えた自動ボールバルブです。遠隔操作・プロセス自動化に対応します。",
    descKo: "전동 액추에이터를 갖춘 자동 볼 밸브입니다. 원격 조작·공정 자동화에 대응합니다.",
    fJa: ["電動アクチュエーター駆動", "開閉・調整制御", "防爆オプション", "多電圧対応"],
    fKo: ["전동 액추에이터 구동", "개폐·조절 제어", "방폭 옵션", "다양한 전압"],
    mJa: ["ステンレス鋼304", "ステンレス鋼316", "炭素鋼"],
    mKo: ["스테인리스강 304", "스테인리스강 316", "탄소강"],
    aJa: ["プロセス自動化", "遠隔操作", "水処理", "薬液注入"],
    aKo: ["공정 자동화", "원격 조작", "수처리", "약액 주입"],
  },
  "pneumatic-ball-valves": {
    nameJa: "空気作動ボールバルブ", nameKo: "공압 볼 밸브",
    descJa: "空気作動アクチュエーターを備えたボールバルブです。高速・高信頼の自動流量制御に対応します。",
    descKo: "공압 액추에이터를 갖춘 볼 밸브입니다. 빠르고 신뢰성 높은 자동 유량 제어에 대응합니다.",
    fJa: ["複動・スプリングリターン", "ラックアンドピニオン", "NAMUR電磁弁インターフェース", "高速開閉"],
    fKo: ["복동·스프링 리턴", "랙 앤 피니언", "NAMUR 솔레노이드 인터페이스", "고속 개폐"],
    mJa: ["ステンレス鋼304", "ステンレス鋼316", "炭素鋼"],
    mKo: ["스테인리스강 304", "스테인리스강 316", "탄소강"],
    aJa: ["圧縮空気システム", "自動化生産ライン", "化学処理", "食品・飲料"],
    aKo: ["압축 공기 시스템", "자동화 생산 라인", "화학 처리", "식품·음료"],
  },
};

// Read files
let products = readFileSync("src/data/products.ts", "utf8");
let categories = readFileSync("src/data/categories.ts", "utf8");

// 1. Add nameJa/nameKo to products
for (const [slug, n] of Object.entries(names)) {
  const re = new RegExp(`(slug: "${slug}"[\\s\\S]*?nameRu: "[^"]*")`, "g");
  if (!re.test(products)) {
    // Try without nameRu
    const re2 = new RegExp(`(slug: "${slug}"[\\s\\S]*?nameZh: "[^"]*")`, "g");
    products = products.replace(re2, `$1, nameJa: "${n.ja}", nameKo: "${n.ko}"`);
  } else {
    products = products.replace(re, `$1, nameJa: "${n.ja}", nameKo: "${n.ko}"`);
  }
}

// 2. Add ja/ko shortDescription/description/features/materials/applications to products
for (const [catSlug, cd] of Object.entries(catJaKo)) {
  const prefix = `categorySlug: "${catSlug}"`;
  // shortDescription ja/ko
  const reSD = new RegExp(`(${prefix}[\\s\\S]*?shortDescriptionRu: "[^"]*")`, "g");
  products = products.replace(reSD, `$1, shortDescriptionJa: "${cd.descJa}", shortDescriptionKo: "${cd.descKo}"`);
  // description ja/ko
  const reD = new RegExp(`(${prefix}[\\s\\S]*?descriptionRu: "[^"]*")`, "g");
  products = products.replace(reD, `$1, descriptionJa: "${cd.descJa}", descriptionKo: "${cd.descKo}"`);
  // features ja/ko
  const reF = new RegExp(`(${prefix}[\\s\\S]*?)(featuresRu: \\[[^\\]]*?\\])`, "g");
  products = products.replace(reF, `$1$2, featuresJa: ${JSON.stringify(cd.fJa)}, featuresKo: ${JSON.stringify(cd.fKo)}`);
  // materials ja/ko
  const reM = new RegExp(`(${prefix}[\\s\\S]*?)(materialsRu: \\[[^\\]]*?\\])`, "g");
  products = products.replace(reM, `$1$2, materialsJa: ${JSON.stringify(cd.mJa)}, materialsKo: ${JSON.stringify(cd.mKo)}`);
  // applications ja/ko
  const reA = new RegExp(`(${prefix}[\\s\\S]*?)(applicationsRu: \\[[^\\]]*?\\])`, "g");
  products = products.replace(reA, `$1$2, applicationsJa: ${JSON.stringify(cd.aJa)}, applicationsKo: ${JSON.stringify(cd.aKo)}`);
  // packaging ja/ko
  const reP = new RegExp(`(${prefix}[\\s\\S]*?)(packagingRu: "[^"]*")`, "g");
  products = products.replace(reP, `$1$2, packagingJa: "標準輸出段ボール梱包。", packagingKo: "표준 수출 상자 포장."`);
  // seo ja/ko
  const reT = new RegExp(`(${prefix}[\\s\\S]*?)(seoTitleRu: "[^"]*")`, "g");
  products = products.replace(reT, `$1$2, seoTitleJa: "管継手・バルブ | CHANTI", seoTitleKo: "배관 피팅·밸브 | CHANTI"`);
  const reSD2 = new RegExp(`(${prefix}[\\s\\S]*?)(seoDescriptionRu: "[^"]*")`, "g");
  products = products.replace(reSD2, `$1$2, seoDescriptionJa: "中国温州の管継手・バルブメーカー。OEM/ODM対応。", seoDescriptionKo: "중국 원저우의 배관 피팅·밸브 제조업체. OEM/ODM 지원."`);
}

// 3. Add ja/ko to categories
for (const [catSlug, cd] of Object.entries(catJaKo)) {
  const prefix = `slug: "${catSlug}"`;
  const reN = new RegExp(`(${prefix}[\\s\\S]*?nameRu: "[^"]*")`, "g");
  categories = categories.replace(reN, `$1, nameJa: "${cd.nameJa}", nameKo: "${cd.nameKo}"`);
  const reSD = new RegExp(`(${prefix}[\\s\\S]*?shortDescriptionRu: "[^"]*")`, "g");
  categories = categories.replace(reSD, `$1, shortDescriptionJa: "${cd.descJa}", shortDescriptionKo: "${cd.descKo}"`);
  const reD = new RegExp(`(${prefix}[\\s\\S]*?descriptionRu: "[^"]*")`, "g");
  categories = categories.replace(reD, `$1, descriptionJa: "${cd.descJa}", descriptionKo: "${cd.descKo}"`);
  const reF = new RegExp(`(${prefix}[\\s\\S]*?)(featuresRu: \\[[^\\]]*?\\])`, "g");
  categories = categories.replace(reF, `$1$2, featuresJa: ${JSON.stringify(cd.fJa)}, featuresKo: ${JSON.stringify(cd.fKo)}`);
  const reM = new RegExp(`(${prefix}[\\s\\S]*?)(materialsRu: \\[[^\\]]*?\\])`, "g");
  categories = categories.replace(reM, `$1$2, materialsJa: ${JSON.stringify(cd.mJa)}, materialsKo: ${JSON.stringify(cd.mKo)}`);
  const reA = new RegExp(`(${prefix}[\\s\\S]*?)(applicationsRu: \\[[^\\]]*?\\])`, "g");
  categories = categories.replace(reA, `$1$2, applicationsJa: ${JSON.stringify(cd.aJa)}, applicationsKo: ${JSON.stringify(cd.aKo)}`);
}

writeFileSync("src/data/products.ts", products);
writeFileSync("src/data/categories.ts", categories);
console.log("✅ Added Japanese/Korean translations to products and categories");
