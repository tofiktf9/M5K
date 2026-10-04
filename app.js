
const ID_ALIASES = {
  questionNumber: ["questionNumber", "qNumber", "counter"],
  quizTitle: ["quizTitle", "modeTitle"],
  questionText: ["questionText", "question"],
  difficulty: ["difficulty", "qCat", "diff"],
  scoreNow: ["scoreNow", "score"],
  answers: ["answers"],
  feedback: ["feedback", "answerMsg"],
  timeLeft: ["timeLeft", "timer"],
  timeBar: ["timeBar", "progress"],
  resultTitle: ["resultTitle"],
  resultText: ["resultText"],
  resultScore: ["resultScore"]
};

const $ = id => {
  const ids = ID_ALIASES[id] || [id];
  for (const name of ids) {
    const el = document.getElementById(name);
    if (el) return el;
  }
  return null;
};

const modes = {
  quiz: {name:"🧠 من يعرف أكثر؟", desc:"أسئلة معلومات عامة بثلاث درجات صعوبة.", time:15},
  speed:{name:"⚡ تحدي السرعة", desc:"أسئلة سريعة، والوقت القصير يزيد التحدي.", time:7},
  guess:{name:"🎯 خمنها", desc:"خمن الشيء أو الشخص أو المكان من التلميح.", time:15},
  imageguess:{name:"🖼️ خمن الصورة", desc:"شاهد المنتج بعد إخفاء اسم الشركة واختر الإجابة.", time:18},
  password:{name:"🔐 كلمة السر", desc:"اكتشف الكلمة المطلوبة من عدة تلميحات.", time:18},
  tf:{name:"صح أو خطأ", desc:"احكم على المعلومة: صحيحة أم خاطئة.", time:8},
  mixed:{name:"🧩 أسئلة متنوعة وعشوائية", desc:"مزيج عشوائي من جميع الألعاب.", time:15}
};

const questions = [
/* من يعرف أكثر */
{m:"quiz",d:"سهل",q:"ما عاصمة الجزائر؟",a:["الجزائر","وهران","قسنطينة","عنابة"],x:0},
{m:"quiz",d:"سهل",q:"ما الكوكب المعروف بالكوكب الأحمر؟",a:["المشتري","المريخ","الزهرة","عطارد"],x:1},
{m:"quiz",d:"سهل",q:"كم عدد أيام الأسبوع؟",a:["5","6","7","8"],x:2},
{m:"quiz",d:"سهل",q:"ما أكبر محيط في العالم؟",a:["الأطلسي","الهندي","الهادئ","المتجمد"],x:2},
{m:"quiz",d:"سهل",q:"كم عدد أرجل العنكبوت؟",a:["6","8","10","12"],x:1},
{m:"quiz",d:"سهل",q:"ما عاصمة مصر؟",a:["القاهرة","دمشق","الرباط","طرابلس"],x:0},
{m:"quiz",d:"سهل",q:"ما العضو الذي يضخ الدم؟",a:["الرئة","القلب","الكبد","المعدة"],x:1},
{m:"quiz",d:"سهل",q:"كم دقيقة في الساعة؟",a:["30","45","60","90"],x:2},
{m:"quiz",d:"سهل",q:"ما لون الزمرد؟",a:["أحمر","أزرق","أخضر","أصفر"],x:2},
{m:"quiz",d:"سهل",q:"ما الحيوان المعروف بسفينة الصحراء؟",a:["الجمل","الحصان","الفيل","الغزال"],x:0},
{m:"quiz",d:"متوسط",q:"ما عاصمة أستراليا؟",a:["سيدني","ملبورن","كانبيرا","بيرث"],x:2},
{m:"quiz",d:"متوسط",q:"ما الغاز الأكثر وفرة في الغلاف الجوي؟",a:["الأكسجين","النيتروجين","الهيدروجين","ثاني أكسيد الكربون"],x:1},
{m:"quiz",d:"متوسط",q:"من رسم الموناليزا؟",a:["بيكاسو","ليوناردو دا فينشي","فان غوخ","رامبرانت"],x:1},
{m:"quiz",d:"متوسط",q:"ما أصغر عدد أولي؟",a:["0","1","2","3"],x:2},
{m:"quiz",d:"متوسط",q:"ما وحدة شدة التيار الكهربائي؟",a:["فولت","واط","أمبير","أوم"],x:2},
{m:"quiz",d:"متوسط",q:"ما العملية التي تصنع بها النباتات غذاءها؟",a:["التنفس","البناء الضوئي","الهضم","التخمر"],x:1},
{m:"quiz",d:"متوسط",q:"ما أكبر دولة في العالم من حيث المساحة؟",a:["الصين","كندا","روسيا","البرازيل"],x:2},
{m:"quiz",d:"صعب",q:"ما العنصر الذي عدده الذري 79؟",a:["الفضة","الذهب","البلاتين","الزئبق"],x:1},
{m:"quiz",d:"صعب",q:"ما اسم مجرتنا؟",a:["أندروميدا","درب التبانة","المثلث","سومبريرو"],x:1},
{m:"quiz",d:"صعب",q:"من وضع قوانين الحركة الثلاثة؟",a:["نيوتن","أينشتاين","غاليليو","كبلر"],x:0},
{m:"quiz",d:"صعب",q:"ما أكبر قمر لكوكب زحل؟",a:["أوروبا","تيتان","غانيميد","تريتون"],x:1},
{m:"quiz",d:"صعب",q:"ما وحدة المقاومة الكهربائية؟",a:["أوم","أمبير","فولت","جول"],x:0},
{m:"quiz",d:"صعب",q:"ما أصغر عظمة في جسم الإنسان؟",a:["الركاب","الفخذ","الزند","القص"],x:0},

/* تحدي السرعة */
{m:"speed",d:"سهل",q:"⚡ بسرعة: 7 + 5 = ؟",a:["10","11","12","13"],x:2},
{m:"speed",d:"سهل",q:"⚡ بسرعة: ما عاصمة فرنسا؟",a:["مدريد","باريس","روما","برلين"],x:1},
{m:"speed",d:"سهل",q:"⚡ بسرعة: كم شهرًا في السنة؟",a:["10","11","12","13"],x:2},
{m:"speed",d:"متوسط",q:"⚡ بسرعة: 12 × 4 = ؟",a:["36","48","52","44"],x:1},
{m:"speed",d:"متوسط",q:"⚡ بسرعة: 100 ÷ 4 = ؟",a:["20","25","30","40"],x:1},
{m:"speed",d:"متوسط",q:"⚡ بسرعة: كم ضلعاً للمربع؟",a:["3","4","5","6"],x:1},
{m:"speed",d:"صعب",q:"⚡ بسرعة: 15² = ؟",a:["125","200","225","250"],x:2},
{m:"speed",d:"صعب",q:"⚡ بسرعة: ما عاصمة اليابان؟",a:["كيوتو","طوكيو","أوساكا","ناغويا"],x:1},
{m:"speed",d:"صعب",q:"⚡ بسرعة: 144 ÷ 12 = ؟",a:["10","11","12","13"],x:2},

/* خمنها */
{m:"guess",d:"سهل",q:"🎯 خمنها: أنا بلد عربي عاصمتي الجزائر ولدي ساحل على البحر المتوسط.",a:["الجزائر","تونس","ليبيا","المغرب"],x:0},
{m:"guess",d:"سهل",q:"🎯 خمنها: أنا الكوكب الأزرق الذي نعيش عليه.",a:["الأرض","المريخ","زحل","عطارد"],x:0},
{m:"guess",d:"سهل",q:"🎯 خمنها: أنا حيوان كبير أملك خرطوماً وأذنين كبيرتين.",a:["الزرافة","الفيل","وحيد القرن","الجمل"],x:1},
{m:"guess",d:"متوسط",q:"🎯 خمنها: عالم ارتبط بقوانين الحركة والجاذبية.",a:["نيوتن","داروين","باستور","أرسطو"],x:0},
{m:"guess",d:"متوسط",q:"🎯 خمنها: مدينة إيطالية مشهورة بالقنوات المائية.",a:["روما","ميلانو","البندقية","تورينو"],x:2},
{m:"guess",d:"متوسط",q:"🎯 خمنها: شركة صنعت PlayStation.",a:["Microsoft","Sony","Nintendo","Sega"],x:1},
{m:"guess",d:"صعب",q:"🎯 خمنها: حضارة قديمة اشتهرت بالكتابة المسمارية في بلاد الرافدين.",a:["السومريون","الإنكا","الفايكنغ","الإغريق"],x:0},
{m:"guess",d:"صعب",q:"🎯 خمنها: عالم وضع نظرية النسبية.",a:["نيوتن","أينشتاين","ماكسويل","داروين"],x:1},

/* خمن الصورة */
{m:"imageguess",d:"سهل",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["Apple","Samsung","Sony","Nintendo"],x:0,img:"phone"},
{m:"imageguess",d:"سهل",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["Pepsi","Coca-Cola","Fanta","Sprite"],x:1,img:"cola"},
{m:"imageguess",d:"سهل",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["Nike","Adidas","Puma","Reebok"],x:0,img:"shoe"},
{m:"imageguess",d:"متوسط",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["Sony","Microsoft","Nintendo","Sega"],x:2,img:"console"},
{m:"imageguess",d:"متوسط",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["Samsung","LG","Apple","Huawei"],x:0,img:"tv"},
{m:"imageguess",d:"متوسط",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["Ferrari","Porsche","Lamborghini","BMW"],x:2,img:"car"},
{m:"imageguess",d:"متوسط",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["Canon","Nikon","Sony","Fujifilm"],x:0,img:"camera"},
{m:"imageguess",d:"صعب",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["Microsoft","Apple","Dell","Lenovo"],x:1,img:"laptop"},
{m:"imageguess",d:"صعب",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["Adidas","Nike","Puma","Under Armour"],x:1,img:"cap"},
{m:"imageguess",d:"صعب",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["Sony","Bose","JBL","Sennheiser"],x:2,img:"headphones"},
{m:"imageguess",d:"صعب",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["Rolex","Casio","Seiko","Omega"],x:1,img:"watch"},
{m:"imageguess",d:"صعب",q:"ما الشركة التي ينتمي إليها هذا المنتج؟",a:["McDonald's","Burger King","KFC","Subway"],x:2,img:"box"},

/* كلمة السر */
{m:"password",d:"سهل",q:"🔐 كلمة السر: شيء له عقارب ونستخدمه لمعرفة الوقت.",a:["ساعة","كتاب","مصباح","كرسي"],x:0},
{m:"password",d:"سهل",q:"🔐 كلمة السر: شيء نستخدمه لفتح باب مقفل.",a:["مفتاح","قلم","مرآة","حذاء"],x:0},
{m:"password",d:"سهل",q:"🔐 كلمة السر: أداة نكتب بها على الورق.",a:["قلم","ملعقة","مفتاح","مرآة"],x:0},
{m:"password",d:"متوسط",q:"🔐 كلمة السر: جهاز يحفظ الطعام بارداً.",a:["فرن","ثلاجة","غسالة","مكيف"],x:1},
{m:"password",d:"متوسط",q:"🔐 كلمة السر: جهاز نستخدمه للاتصال وإرسال الرسائل.",a:["هاتف","ثلاجة","تلفاز","مصباح"],x:0},
{m:"password",d:"متوسط",q:"🔐 كلمة السر: مكان نشاهد فيه مباريات كرة القدم.",a:["ملعب","مكتبة","متحف","مطار"],x:0},
{m:"password",d:"صعب",q:"🔐 كلمة السر: مادة شفافة تستخدم كثيراً في النوافذ.",a:["زجاج","حديد","خشب","قطن"],x:0},
{m:"password",d:"صعب",q:"🔐 كلمة السر: شبكة عالمية تربط ملايين الأجهزة.",a:["الإنترنت","البلوتوث","الراديو","GPS"],x:0},

/* صح أو خطأ */
{m:"tf",d:"سهل",q:"الشمس نجم.",a:["صح","خطأ"],x:0},
{m:"tf",d:"سهل",q:"الماء يتجمد عند 0 درجة مئوية في الظروف القياسية.",a:["صح","خطأ"],x:0},
{m:"tf",d:"سهل",q:"القاهرة هي عاصمة الجزائر.",a:["صح","خطأ"],x:1},
{m:"tf",d:"سهل",q:"العنكبوت له ثماني أرجل.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"الذهب رمزه الكيميائي Au.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"الخفاش من الثدييات.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"الأخطبوط لديه ثلاثة قلوب.",a:["صح","خطأ"],x:0},
{m:"tf",d:"صعب",q:"الصوت ينتقل في الفراغ.",a:["صح","خطأ"],x:1},
{m:"tf",d:"صعب",q:"البرق يمكن أن يكون أسخن من سطح الشمس.",a:["صح","خطأ"],x:0},
{m:"tf",d:"صعب",q:"الخفاش من الطيور.",a:["صح","خطأ"],x:1},
{m:"tf",d:"سهل",q:"القطط من الثدييات.",a:["صح","خطأ"],x:0},
{m:"tf",d:"سهل",q:"الشمس تدور حول الأرض.",a:["صح","خطأ"],x:1},
{m:"tf",d:"سهل",q:"الماء يمكن أن يوجد في الحالة الصلبة والسائلة والغازية.",a:["صح","خطأ"],x:0},
{m:"tf",d:"سهل",q:"عدد أشهر السنة 12 شهراً.",a:["صح","خطأ"],x:0},
{m:"tf",d:"سهل",q:"القمر كوكب.",a:["صح","خطأ"],x:1},
{m:"tf",d:"سهل",q:"الجزائر تقع في قارة أفريقيا.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"كوكب المشتري أكبر من كوكب الأرض.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"الحديد أخف من الريش.",a:["صح","خطأ"],x:1},
{m:"tf",d:"متوسط",q:"الإنسان البالغ لديه عادة 206 عظمة تقريباً.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"البحر المتوسط أكبر من المحيط الهادئ.",a:["صح","خطأ"],x:1},
{m:"tf",d:"متوسط",q:"النباتات تحتاج إلى الضوء لصنع غذائها في عملية البناء الضوئي.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"الذهب رمزه الكيميائي Ag.",a:["صح","خطأ"],x:1},
{m:"tf",d:"صعب",q:"كوكب الزهرة هو أقرب كوكب إلى الشمس.",a:["صح","خطأ"],x:1},
{m:"tf",d:"صعب",q:"سرعة الضوء أكبر من سرعة الصوت.",a:["صح","خطأ"],x:0},
{m:"tf",d:"صعب",q:"الحمض النووي DNA يوجد في خلايا الكائنات الحية.",a:["صح","خطأ"],x:0},
{m:"tf",d:"صعب",q:"قارة أفريقيا هي أصغر قارات العالم مساحةً.",a:["صح","خطأ"],x:1},
{m:"tf",d:"صعب",q:"البرمجة بلغة HTML وحدها تكفي لإنشاء قاعدة بيانات.",a:["صح","خطأ"],x:1},
{m:"tf",d:"صعب",q:"المحيط الأطلسي أصغر من المحيط الهادئ.",a:["صح","خطأ"],x:0}
];

let selectedMode = "quiz";
let round = [];
let current = 0;
let score = 0;
let timer = null;
let timeLeft = 0;
let answered = false;
let hintCharges = 1;
let correctCount = 0;
let friendMode = false;
let friendPlayers = [];
let friendScores = {};
let friendTurn = 0;
let friendQuestionIndex = 0;
let friendCorrectCounts = {};

const el = id => document.getElementById(id);

function show(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const page = el(id);
  if(page) page.classList.add("active");
  if(id === "profile") updateStats();
  if(id === "leaders") updateLeaders();
}

function startFriendsSetup(){
  show("friendsSetup");
}

function startFriendsGame(){
  const raw = (el("friendNames")?.value || "").split(/[،,\n]+/).map(x=>x.trim()).filter(Boolean);
  const names = [...new Set(raw)].slice(0,6);
  if(names.length < 2){
    alert("أدخل اسم لاعبين على الأقل.");
    return;
  }
  friendPlayers = names;
  friendScores = {};
  names.forEach(n => friendScores[n] = 0);
  friendTurn = 0;
  friendQuestionIndex = 0;
  friendCorrectCounts = {};
  names.forEach(n => friendCorrectCounts[n] = 0);
  friendMode = true;
  selectedMode = "quiz";
  const wanted = parseInt(el("friendQCount")?.value,10) || 10;
  const pool = shuffle(questions.filter(q => q.m === "quiz" || q.m === "mixed"));
  const seen = new Set();
  round = pool.filter(q => !seen.has(q.q) && (seen.add(q.q), true)).slice(0, Math.min(wanted, pool.length));
  if(!round.length){ alert("لا توجد أسئلة لتحدي الأصدقاء."); return; }
  current = 0; score = 0; hintCharges = 1; correctCount = 0; answered = false;
  updateHintButton();
  show("quiz");
  renderQuestion();
}

function chooseMode(mode){
  if(!modes[mode]) mode = "quiz";
  selectedMode = mode;
  friendMode = false;
  const saved = localStorage.getItem("m5kPlayerName") || "";
  const name = el("gameName");
  const player = el("playerName");
  if(player) player.value = saved;
  if(name) name.value = modes[mode].name;
  if(el("qCount")) el("qCount").value = "10";
  show("create");
}

function shuffle(array){
  const a = [...array];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function buildRound(){
  const pool = selectedMode === "mixed"
    ? questions
    : questions.filter(q => q.m === selectedMode);

  const unique = [];
  const seen = new Set();
  for(const q of shuffle(pool)){
    if(!seen.has(q.q)){
      seen.add(q.q);
      unique.push(q);
    }
  }

  let wanted = parseInt(el("qCount")?.value, 10) || 10;
  wanted = Math.max(1, wanted);
  round = unique.slice(0, Math.min(wanted, unique.length));
}

function startGame(){
  clearInterval(timer);
  const name = (el("playerName")?.value || "").trim().slice(0,20);
  if(!name){
    alert("اكتب اسمك أولاً حتى تظهر نتيجتك في المتصدرين 🏆");
    el("playerName")?.focus();
    return;
  }
  localStorage.setItem("m5kPlayerName", name);

  buildRound();
  if(!round.length){
    alert("لا توجد أسئلة لهذه اللعبة.");
    return;
  }

  current = 0;
  score = 0;
  hintCharges = 1;
  correctCount = 0;
  friendMode = false;
  answered = false;
  updateHintButton();
  show("quiz");
  renderQuestion();
}

function productSVG(type){
  const base = {phone:"#16161f",cola:"#1a1a20",shoe:"#20202a",console:"#181820",tv:"#15151d",car:"#171720",camera:"#202028",laptop:"#17171f",cap:"#202029",headphones:"#15151d",watch:"#1b1b24",box:"#20202a"}[type] || "#181820";
  const accent = {phone:"#9b7cff",cola:"#ef4444",shoe:"#f8f8fb",console:"#5ee7ff",tv:"#60a5fa",car:"#ef4444",camera:"#a78bfa",laptop:"#94a3b8",cap:"#f8fafc",headphones:"#8b5cf6",watch:"#cbd5e1",box:"#f59e0b"}[type] || "#8b5cf6";
  let shape = "";
  if(type==="phone") shape=`<rect x="155" y="25" width="190" height="330" rx="28" fill="${base}" stroke="${accent}" stroke-width="5"/><rect x="170" y="70" width="160" height="235" rx="8" fill="#101018"/><circle cx="250" cy="47" r="5" fill="#777"/>`;
  if(type==="cola") shape=`<rect x="190" y="35" width="120" height="300" rx="35" fill="${accent}"/><ellipse cx="250" cy="35" rx="60" ry="12" fill="#aaa"/><ellipse cx="250" cy="335" rx="60" ry="12" fill="#111"/>`;
  if(type==="shoe") shape=`<path d="M110 260 Q180 245 205 175 L260 205 Q280 245 355 270 Q385 282 370 320 L105 320 Q80 300 110 260Z" fill="${accent}"/><path d="M210 180 L275 225" stroke="#555" stroke-width="8"/>`;
  if(type==="console") shape=`<rect x="115" y="100" width="270" height="180" rx="25" fill="${base}" stroke="${accent}" stroke-width="5"/><circle cx="170" cy="190" r="24" fill="#333"/><circle cx="330" cy="190" r="24" fill="#333"/>`;
  if(type==="tv") shape=`<rect x="80" y="70" width="340" height="220" rx="18" fill="${base}" stroke="${accent}" stroke-width="5"/><rect x="110" y="100" width="280" height="160" fill="#09090f"/><path d="M220 290 L190 340 M280 290 L310 340" stroke="#888" stroke-width="8"/>`;
  if(type==="car") shape=`<path d="M80 250 L125 160 Q145 125 190 125 L315 125 Q355 130 375 170 L420 250 L405 300 L95 300Z" fill="${accent}"/><circle cx="145" cy="290" r="35" fill="#09090f"/><circle cx="355" cy="290" r="35" fill="#09090f"/>`;
  if(type==="camera") shape=`<rect x="105" y="115" width="290" height="190" rx="25" fill="${base}" stroke="${accent}" stroke-width="5"/><circle cx="250" cy="210" r="65" fill="#0a0a10" stroke="#777" stroke-width="8"/><circle cx="250" cy="210" r="28" fill="${accent}"/>`;
  if(type==="laptop") shape=`<rect x="120" y="65" width="260" height="180" rx="12" fill="${base}" stroke="${accent}" stroke-width="5"/><path d="M70 270 L430 270 L470 325 L30 325Z" fill="#777"/>`;
  if(type==="cap") shape=`<path d="M125 210 Q135 95 250 85 Q365 95 375 210 Q320 185 250 185 Q180 185 125 210Z" fill="${accent}"/><path d="M250 185 Q350 185 410 235 Q330 255 250 220Z" fill="${accent}"/>`;
  if(type==="headphones") shape=`<path d="M125 220 A125 125 0 0 1 375 220" fill="none" stroke="${accent}" stroke-width="30"/><rect x="105" y="205" width="65" height="120" rx="25" fill="${base}" stroke="${accent}" stroke-width="6"/><rect x="330" y="205" width="65" height="120" rx="25" fill="${base}" stroke="${accent}" stroke-width="6"/>`;
  if(type==="watch") shape=`<rect x="210" y="25" width="80" height="80" rx="20" fill="#777"/><rect x="160" y="90" width="180" height="180" rx="45" fill="${base}" stroke="${accent}" stroke-width="7"/><rect x="210" y="270" width="80" height="80" rx="20" fill="#777"/>`;
  if(type==="box") shape=`<path d="M120 150 L250 80 L380 150 L250 220Z" fill="${accent}"/><path d="M120 150 L120 300 L250 370 L250 220Z" fill="#b87516"/><path d="M380 150 L380 300 L250 370 L250 220Z" fill="#d68b19"/>`;
  return `<div class="product-image"><svg viewBox="0 0 500 390" role="img" aria-label="صورة منتج بدون اسم الشركة"><defs><filter id="blurName"><feGaussianBlur stdDeviation="7"/></filter></defs><rect width="500" height="390" rx="24" fill="#0b0b12"/>${shape}<rect x="150" y="150" width="200" height="65" rx="12" fill="#0a0a0f" opacity=".9"/><text x="250" y="190" text-anchor="middle" fill="#777" font-size="18" font-family="Arial" filter="url(#blurName)">اسم الشركة مخفي</text><text x="250" y="365" text-anchor="middle" fill="#a98aff" font-size="15" font-family="Arial">خمن العلامة</text></svg></div>`;
}

function renderQuestion(){
  clearInterval(timer);

  if(current >= round.length){
    finishGame();
    return;
  }

  const q = round[current];
  const game = modes[q.m] || modes.quiz;
  answered = false;

  el("qNumber").textContent = friendMode
    ? `دور: ${friendPlayers[friendTurn]} — السؤال ${current + 1} / ${round.length}`
    : `السؤال ${current + 1} / ${round.length}`;
  el("qCat").textContent = q.m === "guess" ? "🎯 خمنها" :
                           q.m === "imageguess" ? "خمن الصورة" :
                           q.m === "password" ? "🔐 كلمة السر" :
                           q.m === "tf" ? "صح أو خطأ" :
                           q.m === "speed" ? "⚡ سرعة" : "🧠 منوعات";

  let imageBox = document.getElementById("imageGuessBox");
  if(!imageBox){
    imageBox = document.createElement("div");
    imageBox.id = "imageGuessBox";
    const qt = el("questionText");
    qt.parentNode.insertBefore(imageBox, qt);
  }
  if(q.m === "imageguess") {
    imageBox.style.display = "block";
    imageBox.innerHTML = productSVG(q.img);
  } else {
    imageBox.style.display = "none";
    imageBox.innerHTML = "";
  }
  el("questionText").textContent = q.q;
  el("scoreNow").textContent = friendMode ? friendScores[friendPlayers[friendTurn]] : score;

  let hintInfo = document.getElementById("hintInfo");
  if(!hintInfo){
    hintInfo = document.createElement("div");
    hintInfo.id = "hintInfo";
    hintInfo.style.cssText = "margin:12px auto 0;max-width:720px;text-align:center;color:#bca8ff;font-size:14px";
    const quizBox = document.querySelector(".quiz-box");
    if(quizBox) quizBox.parentNode.insertBefore(hintInfo, quizBox);
  }
  hintInfo.textContent = friendMode
    ? `💡 كل 3 إجابات صحيحة تمنحك تلميحًا إضافيًا. لديك الآن ${hintCharges} تلميح.`
    : `💡 كل 3 إجابات صحيحة تمنحك تلميحًا إضافيًا. لديك الآن ${hintCharges} تلميح.`;

  const diff = q.d === "سهل" ? "🌱 سهل" : q.d === "متوسط" ? "⚡ متوسط" : "🔥 صعب";
  // qCat is used by this HTML for the visible category; keep the question itself visible regardless.

  const answers = el("answers");
  answers.innerHTML = "";
  q.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => submitAnswer(index, button));
    answers.appendChild(button);
  });

  el("answerMsg").textContent = "";
  el("answerMsg").style.color = "";

  const limit = selectedMode === "speed"
    ? 7
    : selectedMode === "tf"
      ? 8
      : selectedMode === "imageguess"
        ? 18
      : q.d === "صعب" ? 20 : q.d === "متوسط" ? 16 : 13;

  timeLeft = limit;
  el("timer").textContent = timeLeft;
  el("progress").style.width = "100%";

  timer = setInterval(() => {
    timeLeft--;
    el("timer").textContent = timeLeft;
    el("progress").style.width = `${Math.max(0, (timeLeft / limit) * 100)}%`;
    if(timeLeft <= 0) submitAnswer(-1, null);
  }, 1000);
}

function updateHintButton(){
  const button = document.querySelector(".hint-btn");
  if(!button) return;
  button.disabled = hintCharges <= 0;
  button.textContent = hintCharges > 0 ? `🔮 تلميح (${hintCharges})` : "🔒 لا يوجد تلميح";
}

function useNextHint(){
  if(hintCharges <= 0 || answered || !round[current]) return;
  hintCharges--;
  updateHintButton();

  const q = round[current];
  const buttons = [...document.querySelectorAll(".answer-btn")];
  const wrong = buttons.map((b,i)=>({b,i})).filter(x=>x.i !== q.x && !x.b.disabled);
  if(wrong.length){
    const picked = wrong[Math.floor(Math.random()*wrong.length)];
    picked.b.disabled = true;
    picked.b.textContent += "  ✖";
  }
  const msg = el("answerMsg");
  if(msg){
    const correct = String(q.a[q.x] ?? "");
    const first = correct.trim().charAt(0);
    msg.textContent = first ? `💡 تلميح: الإجابة تبدأ بحرف «${first}» — وتم حذف اختيار خاطئ.` : "💡 تلميح: تم حذف اختيار خاطئ.";
    msg.style.color = "#c5aaff";
  }
}

function submitAnswer(choice, button){
  if(answered) return;
  answered = true;
  clearInterval(timer);

  const q = round[current];
  const correct = choice === q.x;
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((b,i)=>{ b.disabled=true; if(i===q.x) b.classList.add("correct"); if(i===choice && !correct) b.classList.add("wrong"); });

  const msg = el("answerMsg");
  let earned = 0;
  if(correct){
    const base = q.d === "صعب" ? 300 : q.d === "متوسط" ? 200 : 100;
    const bonus = Math.max(0,timeLeft*5);
    earned = base + bonus;
    if(friendMode){
      const player = friendPlayers[friendTurn];
      friendScores[player] += earned;
      friendCorrectCounts[player] = (friendCorrectCounts[player] || 0) + 1;
      el("scoreNow").textContent = friendScores[player];
      if(friendCorrectCounts[player] % 3 === 0){
        hintCharges++;
        updateHintButton();
        msg.textContent = `صحيح! +${earned} نقطة — حصل ${player} على تلميح جديد بعد 3 إجابات صحيحة.`;
      }else{
        msg.textContent = `صحيح! +${earned} نقطة`;
      }
    }else{
      score += earned;
      correctCount++;
      el("scoreNow").textContent = score;
      if(correctCount % 3 === 0){
        hintCharges++;
        updateHintButton();
        msg.textContent = `صحيح! +${earned} نقطة — حصلت على تلميح جديد بعد 3 إجابات صحيحة.`;
      }else{
        msg.textContent = `صحيح! +${earned} نقطة`;
      }
    }
    msg.style.color="#4ade80";
  }else{
    msg.textContent = choice === -1 ? "⏰ انتهى الوقت!" : "❌ إجابة خاطئة";
    msg.style.color="#fb7185";
  }

  setTimeout(()=>{
    if(friendMode){
      friendTurn = (friendTurn + 1) % friendPlayers.length;
    }
    current++;
    renderQuestion();
  },900);
}

function finishGame(){
  clearInterval(timer);
  if(friendMode){
    const ranking = Object.entries(friendScores).sort((a,b)=>b[1]-a[1]);
    const winner = ranking[0];
    const history = JSON.parse(localStorage.getItem("m5kHistory") || "[]");
    ranking.forEach(([player, playerScore]) => {
      history.unshift({name:player, mode:"friends", score:playerScore, date:new Date().toLocaleDateString("ar-DZ")});
    });
    localStorage.setItem("m5kHistory", JSON.stringify(history.slice(0,100)));
    el("resultTitle").textContent = "🏆 انتهى تحدي الأصدقاء!";
    el("resultText").innerHTML = `الفائز: <b>${escapeHtml(winner[0])}</b><br>` + ranking.map((r,i)=>`${i+1}. ${escapeHtml(r[0])} — ${r[1]} نقطة`).join("<br>");
    el("resultScore").textContent = winner[1];
    show("result");
    return;
  }
  const name = localStorage.getItem("m5kPlayerName") || "لاعب";
  const modeName = modes[selectedMode]?.name || "اللعبة";
  const history = JSON.parse(localStorage.getItem("m5kHistory") || "[]");
  history.unshift({name,mode:selectedMode,score,date:new Date().toLocaleDateString("ar-DZ")});
  localStorage.setItem("m5kHistory",JSON.stringify(history.slice(0,50)));
  const best = Number(localStorage.getItem("m5kBest") || 0);
  if(score > best) localStorage.setItem("m5kBest",String(score));
  el("resultTitle").textContent="🏆 انتهت اللعبة!";
  el("resultText").textContent=`${name}، نتيجتك في ${modeName} هي ${score} نقطة.`;
  el("resultScore").textContent=score;
  show("result");
}

function playAgain(){
  if(friendMode){
    friendTurn=0; friendScores={}; friendCorrectCounts={}; friendPlayers.forEach(n=>{friendScores[n]=0;friendCorrectCounts[n]=0;}); current=0; hintCharges=1; correctCount=0; answered=false; round=shuffle(round); show("quiz"); renderQuestion();
  }else{ startGame(); }
}

function updateStats(){
  const history = JSON.parse(localStorage.getItem("m5kHistory") || "[]");
  const games = history.length;
  const points = history.reduce((sum, x) => sum + (Number(x.score) || 0), 0);
  const best = Math.max(0, ...history.map(x => Number(x.score) || 0));

  if(el("profileGames")) el("profileGames").textContent = games;
  if(el("profileWins")) el("profileWins").textContent = history.filter(x => Number(x.score) > 0).length;
  if(el("profilePoints")) el("profilePoints").textContent = points;
  if(el("profileTokens")) el("profileTokens").textContent = hintCharges;
  if(el("bestScore")) el("bestScore").textContent = best;
}

function updateLeaders(){
  const history = JSON.parse(localStorage.getItem("m5kHistory") || "[]");
  const best = {};
  history.forEach(x => {
    best[x.name] = Math.max(best[x.name] || 0, Number(x.score) || 0);
  });

  const rows = Object.entries(best)
    .sort((a,b) => b[1] - a[1])
    .slice(0,10);

  const board = document.querySelector(".leaderboard");
  if(!board) return;
  board.innerHTML = rows.length
    ? rows.map((r,i) => `<div class="leader ${i===0 ? "first" : ""}"><b>${i+1}</b><i>${escapeHtml(r[0].charAt(0) || "ل")}</i><span>${escapeHtml(r[0])}</span><strong>${r[1]}</strong></div>`).join("")
    : "<p>العب أول جولة لتظهر نتائجك هنا.</p>";
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[ch]));
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("m5kPlayerName") || "";
  if(el("playerName")) el("playerName").value = saved;
  updateHintButton();
});
