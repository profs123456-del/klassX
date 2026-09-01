/* =========================
   ✅ FIREBASE CONFIG
   ========================= */
const firebaseConfig = {
  apiKey: "AIzaSyCy1BxjUfD9IBHbLaAs2jp8P3qL8MwQeUk",
  authDomain: "klassx-ran.firebaseapp.com",
  databaseURL: "https://klassx-ran-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "klassx-ran",
  storageBucket: "klassx-ran.firebasestorage.app",
  messagingSenderId: "546674133667",
  appId: "1:546674133667:web:6176cc4a97bc7c557a8d16"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* ✅ SERVER TIME SYNC (fix +12 sec issues) */
let serverOffset = 0;
let serverReady = false;

db.ref(".info/serverTimeOffset").on("value", snap => {
  serverOffset = snap.val() || 0;
  serverReady = true;
});

/* =========================
   ✅ SETTINGS
   ========================= */
const HISTORY_LIMIT = 400;     // show last 200 logs
const ADMIN_PIN = "kamatis";      // change this

let inputLock = false;
document.addEventListener("focusin", e => { if (e.target.type === "datetime-local") inputLock = true; });
document.addEventListener("focusout", e => { if (e.target.type === "datetime-local") inputLock = false; });

/* =========================
   ✅ CHANNELS
   channel: 1, 2, 3  -> real in-game channels (Dark Swordsman Jr./ Etherial Fist / Ninja Knife )
   channel: 0        -> "CHANNEL 0" (no in-game channel — spawns on their own timer)
   ========================= */
const CHANNELS = [
  { key: 0, label: "CHANNEL 0" },
  { key: 1, label: "CHANNEL 1" },
  { key: 2, label: "CHANNEL 2" },
  { key: 3, label: "CHANNEL 3" },
];

const bosses = [
  {id:"1",name:"MP HOLE",fullName:"CH-0 MP HOLE Ds Jr.",channel:0,respawn:60},
  {id:"2",name:"PH HOLE",fullName:"CH-0 PH HOLE Ds Jr.",channel:0,respawn:60},
  {id:"3",name:"SG CAMPUS",fullName:"CH-0 SG CAMPUS Ds Jr.",channel:0,respawn:60},
  {id:"4",name:"MP CAMPUS",fullName:"CH-0 MP CAMPUS Ds Jr.",channel:0,respawn:60},
  {id:"5",name:"PH CAMPUS",fullName:"CH-0 PH CAMPUS Ds Jr.",channel:0,respawn:60},
  {id:"6",name:"Etherial MP",fullName:"CH-0 Etherial MP.",channel:0,respawn:120},
  {id:"7",name:"Etherial PH",fullName:"CH-0 Etherial PH.",channel:0,respawn:120},
  {id:"8",name:"Etherial SG",fullName:"CH-0 Etherial SG.",channel:0,respawn:120},
  {id:"9",name:"Ninja Knife",fullName:"CH-0 Ninja Knife.",channel:0,respawn:120},
  {id:"10",name:"DARK SWORDSMAN",fullName:"CH-0 Dark swordsman.",channel:0,respawn:120},
  {id:"11",name:"DARK ART MASTER",fullName:"CH-0 DARK ART MASTER",channel:0,respawn:360},
  {id:"12",name:"MP HOLE",fullName:"CH-1 MP HOLE Ds Jr.",channel:1,respawn:60},
  {id:"13",name:"PH HOLE",fullName:"CH-1 PH HOLE Ds Jr.",channel:1,respawn:60},
  {id:"14",name:"SG CAMPUS",fullName:"CH-1 SG CAMPUS Ds Jr.",channel:1,respawn:60},
  {id:"15",name:"MP CAMPUS",fullName:"CH-1 MP CAMPUS Ds Jr.",channel:1,respawn:60},
  {id:"16",name:"PH CAMPUS",fullName:"CH-1 PH CAMPUS Ds Jr.",channel:1,respawn:60},
  {id:"17",name:"Etherial MP",fullName:"CH-1 Etherial MP.",channel:1,respawn:120},
  {id:"18",name:"Etherial PH",fullName:"CH-1 Etherial PH.",channel:1,respawn:120},
  {id:"19",name:"Etherial SG",fullName:"CH-1 Etherial SG.",channel:1,respawn:120},
  {id:"20",name:"Ninja Knife",fullName:"CH-1 Ninja Knife.",channel:1,respawn:120},
  {id:"21",name:"DARK SWORDSMAN",fullName:"CH-1 Dark swordsman.",channel:1,respawn:120},
  {id:"22",name:"DARK ART MASTER",fullName:"CH-1 DARK ART MASTER",channel:1,respawn:360},
  {id:"23",name:"MP HOLE",fullName:"CH-2 MP HOLE Ds Jr.",channel:2,respawn:60},
  {id:"24",name:"PH HOLE",fullName:"CH-2 PH HOLE Ds Jr.",channel:2,respawn:60},
  {id:"25",name:"SG CAMPUS",fullName:"CH-2 SG CAMPUS Ds Jr.",channel:2,respawn:60},
  {id:"26",name:"MP CAMPUS",fullName:"CH-2 MP CAMPUS Ds Jr.",channel:2,respawn:60},
  {id:"27",name:"PH CAMPUS",fullName:"CH-2 PH CAMPUS Ds Jr.",channel:2,respawn:60},
  {id:"28",name:"Etherial MP",fullName:"CH-2 Etherial MP.",channel:2,respawn:120},
  {id:"29",name:"Etherial PH",fullName:"CH-2 Etherial PH.",channel:2,respawn:120},
  {id:"30",name:"Etherial SG",fullName:"CH-2 Etherial SG.",channel:2,respawn:120},
  {id:"31",name:"Ninja Knife",fullName:"CH-2 Ninja Knife.",channel:2,respawn:120},
  {id:"32",name:"DARK SWORDSMAN",fullName:"CH-2 Dark swordsman.",channel:2,respawn:120},
  {id:"33",name:"DARK ART MASTER",fullName:"CH-2 DARK ART MASTER",channel:2,respawn:360},
  {id:"34",name:"MP HOLE",fullName:"CH-3 MP HOLE Ds Jr.",channel:3,respawn:60},
  {id:"35",name:"PH HOLE",fullName:"CH-3 PH HOLE Ds Jr.",channel:3,respawn:60},
  {id:"36",name:"SG CAMPUS",fullName:"CH-3 SG CAMPUS Ds Jr.",channel:3,respawn:60},
  {id:"37",name:"MP CAMPUS",fullName:"CH-3 MP CAMPUS Ds Jr.",channel:3,respawn:60},
  {id:"38",name:"PH CAMPUS",fullName:"CH-3 PH CAMPUS Ds Jr.",channel:3,respawn:60},
  {id:"39",name:"Etherial MP",fullName:"CH-3 Etherial MP.",channel:3,respawn:120},
  {id:"40",name:"Etherial PH",fullName:"CH-3 Etherial PH.",channel:3,respawn:120},
  {id:"41",name:"Etherial SG",fullName:"CH-3 Etherial SG.",channel:3,respawn:120},
  {id:"42",name:"Ninja Knife",fullName:"CH-3 Ninja Knife.",channel:3,respawn:120},
  {id:"43",name:"DARK SWORDSMAN",fullName:"CH-3 Dark swordsman.",channel:3,respawn:120},
  {id:"44",name:"DARK ART MASTER",fullName:"CH-3 DARK ART MASTER",channel:3,respawn:360},
];

/* Map of boss-name substring -> background image file.
   (Replaces the long chain of duplicated if-statements from the original file.) */
const BOSS_BG_MAP = [
  ["MP HOLE", "ds jr.png"],
  ["PH HOLE", "ds jr.png"],
  ["SG CAMPUS", "ds jr.png"],
  ["MP CAMPUS", "ds jr.png"],
  ["PH CAMPUS", "ds jr.png"],
  ["Etherial MP", "EF.png"],
  ["Etherial PH", "EF.png"],
  ["Etherial SG", "EF.png"],
  ["Ninja Knife", "NK.png"],
  ["DARK SWORDSMAN", "DS.png"],
  ["DARK ART MASTER", "dam.png"],
];

function getBossBg(name){
  const hit = BOSS_BG_MAP.find(([key]) => name.includes(key));
  return hit ? hit[1] : null;
}

const channelsWrapper = document.getElementById("channelsWrapper");
const sound = document.getElementById("sound");
const sortBtn = document.getElementById("sortBtn");
const soundBtn = document.getElementById("soundBtn");
const nextBossTimer = document.getElementById("nextBossTimer");

let autoSort = true;
let alarmOn = true;
let alerted = {};
let warnedTenMin = {};
let lastBeepSecond = null;

function speak(text){
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 1;
    u.volume = 1;
    speechSynthesis.speak(u);
  }catch(e){}
}

/* =========================
   ✅ BUILD CHANNEL SECTIONS + CARDS
   ========================= */
function isChannelCollapsed(ch){
  try{ return localStorage.getItem("channel-collapsed-" + ch) === "1"; }catch(e){ return false; }
}

function toggleChannel(ch){
  const section = document.getElementById("channel-" + ch + "-section");
  section.classList.toggle("collapsed");
  try{
    localStorage.setItem("channel-collapsed-" + ch, section.classList.contains("collapsed") ? "1" : "0");
  }catch(e){}
}

CHANNELS.forEach(({key, label}) => {
  const section = document.createElement("div");
  section.className = "channel-section";
  section.id = "channel-" + key + "-section";
  if (isChannelCollapsed(key)) section.classList.add("collapsed");

  section.innerHTML = `
    <div class="channel-header" onclick="toggleChannel(${key})">
      <div class="channel-toggle">▾</div>
      <div class="channel-title">${label}</div>
    </div>
    <div class="channel-body" id="channel-${key}-body"></div>
  `;
  channelsWrapper.appendChild(section);
});

bosses.forEach(b => {
  const card = document.createElement("div");
  card.className = "card";
  card.id = b.id + "-card";

  const bg = getBossBg(b.name);
  if (bg) card.style.backgroundImage = `url('${bg}')`;

  card.innerHTML = `
    <h2>${b.name}</h2>
    <div class="timer" id="${b.id}-timer">--:--:--</div>
    <div id="${b.id}-next">Next Spawn: --</div>

    <div class="calendar-panel">
      <div class="calendar-display">Select Date & Time</div>
      <input
      type="datetime-local"
      class="datetime-input"
      id="${b.id}-input"
      step="1">
    </div>

    <button class="set-manual" onclick="manual('${b.id}',${b.respawn})">Set Manual</button>
    <button class="killed-now" onclick="now('${b.id}',${b.respawn})">Killed Now</button>
  `;
  document.getElementById("channel-" + b.channel + "-body").appendChild(card);
});

/* =========================
   ✅ TOP BUTTONS
   ========================= */
sortBtn.onclick = () => {
  autoSort = !autoSort;
  sortBtn.textContent = "AUTO SORT: " + (autoSort ? "ON" : "OFF");
  sortBtn.classList.toggle("off", !autoSort);
};

soundBtn.onclick = () => {
  alarmOn = !alarmOn;
  soundBtn.textContent = "ALARM: " + (alarmOn ? "ON" : "SILENT");
  soundBtn.classList.toggle("off", !alarmOn);
};

/* =========================
   ✅ HISTORY
   ========================= */
function renderHistory(items){
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  if(!items || items.length === 0){
    const empty = document.createElement("div");
    empty.className = "history-item";
    empty.textContent = "No logs yet. Click Killed Now.";
    historyList.appendChild(empty);
    return;
  }

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.textContent = `${item.name} killed - ${new Date(item.killedAt).toLocaleString()}`;
    historyList.appendChild(div);
  });
}

function refreshHistory(){
  db.ref("history").limitToLast(HISTORY_LIMIT).once("value").then(snapshot => {
    const data = snapshot.val();
    if(!data) return renderHistory([]);
    const items = Object.values(data).sort((a,b) => b.killedAt - a.killedAt);
    renderHistory(items);
  });
}

function clearHistory(){
  const pinInput = document.getElementById("pinInput");
  const pinError = document.getElementById("pinError");
  const pin = (pinInput.value || "").trim();

  if(pin !== ADMIN_PIN){
    pinError.style.color = "#ff3b3b";
    pinError.textContent = "❌ Wrong PIN";
    return;
  }

  if(!confirm("Clear ALL kill history?")) return;

  db.ref("history").remove().then(() => {
    pinError.style.color = "#00ff9c";
    pinError.textContent = "✅ History Cleared!";
    pinInput.value = "";
  }).catch(() => {
    pinError.style.color = "#ff3b3b";
    pinError.textContent = "❌ Error clearing history";
  });
}

db.ref("history").limitToLast(HISTORY_LIMIT).on("value", snapshot => {
  const data = snapshot.val();
  if(!data) return renderHistory([]);
  const items = Object.values(data).sort((a,b) => b.killedAt - a.killedAt);
  renderHistory(items);
});

/* =========================
   ✅ TIMER STORAGE (FIREBASE)
   ========================= */
let firebaseBosses = {};

db.ref("bosses").on("value", snapshot => {
  firebaseBosses = snapshot.val() || {};
});

/* =========================
   ✅ SET NEXT (MANUAL)
   ========================= */
function setNext(id,mins,k){
  const nextTime = k.getTime() + mins * 60000;
  db.ref("bosses/" + id).set(nextTime);
  alerted[id] = false;
  warnedTenMin[id] = false;
}

/* =========================
   ✅ BUTTON ACTIONS
   ========================= */
function now(id,mins){
  // prevent clicking before server time is ready
  if(!serverReady){
    const pinError = document.getElementById("pinError");
    if(pinError){
      pinError.style.color = "#ffd700";
      pinError.textContent = "⏳ Wait 1 second (syncing server time)...";
      setTimeout(() => { pinError.textContent = ""; }, 1500);
    }
    return;
  }

  const serverNow = Date.now() + serverOffset;
  const nextTime = serverNow + mins * 60000;

  db.ref("bosses/" + id).set(nextTime);
  alerted[id] = false;
  warnedTenMin[id] = false;

  const boss = bosses.find(b => b.id === id);
  db.ref("history").push({
    bossId: id,
    name: boss ? boss.fullName : ("BOSS " + id),
    killedAt: serverNow
  });
}

function manual(id,mins){
  const v = document.getElementById(id + "-input").value;
  if(!v) return alert("Enter time");
  setNext(id, mins, new Date(v));
}

function resetAll(){
  if(!confirm("Reset ALL timers?")) return;
  alerted = {};
  warnedTenMin = {};
  lastBeepSecond = null;
  db.ref("bosses").remove();
}

/* =========================
   ✅ MAIN UPDATE LOOP
   ========================= */
function update(){
  if(inputLock) return;
  let soonest = null, soonId = null;
  const sortDataByChannel = { 0:[], 1:[], 2:[], 3:[] };

  bosses.forEach(b => {
    const t = firebaseBosses[b.id];
    const timer = document.getElementById(b.id + "-timer");
    const next = document.getElementById(b.id + "-next");
    const card = document.getElementById(b.id + "-card");
    card.classList.remove("next");

    if (Object.keys(firebaseBosses).length === 0) {
      document.getElementById("nextBossName").textContent = "---";
      document.getElementById("nextBossTimer").textContent = "--:--:--";
      document.getElementById("nextBossTime").textContent = "---";
      document.getElementById("nextBossTimer").classList.remove("danger");
    }

    if (!t) {
      timer.textContent = "--:--:--";
      next.textContent = "Next Spawn: --";
      sortDataByChannel[b.channel].push({ id: b.id, time: Infinity });
      return;
    }

    // ✅ server-time countdown
    const nowServer = Date.now() + serverOffset;
    const d = t - nowServer;

    if(d <= 0){
      timer.textContent = "SPAWNED!";
      next.textContent = "NOW";
      warnedTenMin[b.id] = false;
      if(!alerted[b.id]){
        if(alarmOn){
          sound.currentTime = 0;
          sound.play().catch(() => {});
          speak(b.name + " has spawned");
        }
        alerted[b.id] = true;
      }
      sortDataByChannel[b.channel].push({id:b.id, time:0});
      return;
    }

    if(d <= 10*60*1000 && d > 9*60*1000 && !warnedTenMin[b.id]){
      if(alarmOn){
        sound.currentTime = 0;
        sound.play().catch(() => {});
        setTimeout(() => {
          speak(b.name + " will spawn in 10 minutes");
        }, 250);
      }
      warnedTenMin[b.id] = true;
    }

    if(d > 10*60*1000){
      warnedTenMin[b.id] = false;
    }

    sortDataByChannel[b.channel].push({id:b.id, time:d});
    if(soonest === null || d < soonest){ soonest = d; soonId = b.id; }

    const hh = String(Math.floor(d/3600000)).padStart(2,"0");
    const mm = String(Math.floor(d%3600000/60000)).padStart(2,"0");
    const ss = String(Math.floor(d%60000/1000)).padStart(2,"0");
    timer.textContent = `${hh}:${mm}:${ss}`;
    next.textContent = "Next: " + new Date(t).toLocaleString();
  });

  if(autoSort){
    Object.keys(sortDataByChannel).forEach(ch => {
      const arr = sortDataByChannel[ch];
      arr.sort((a,b) => a.time - b.time);
      const body = document.getElementById("channel-" + ch + "-body");
      if(body) arr.forEach(o => body.appendChild(document.getElementById(o.id + "-card")));
    });
  }

  if(soonId){
    document.getElementById(soonId + "-card").classList.add("next");
    const b = bosses.find(x => x.id === soonId);
    document.getElementById("nextBossName").textContent = "CH " + b.channel + " - " + b.name;
    document.getElementById("nextBossTimer").textContent = document.getElementById(soonId + "-timer").textContent;

    const soonTs = firebaseBosses[soonId];
    document.getElementById("nextBossTime").textContent = soonTs
      ? ("Spawns at: " + new Date(soonTs).toLocaleString())
      : "---";

    if(soonest <= 10000 && soonest > 0){
      const sec = Math.ceil(soonest/1000);
      if(lastBeepSecond !== sec){
        if(alarmOn){
          sound.currentTime = 0;
          sound.play().catch(() => {});
        }
        lastBeepSecond = sec;
      }
    }else{ lastBeepSecond = null; }

    if(soonest <= 5*60*1000){
      nextBossTimer.classList.add("danger");
    }else{
      nextBossTimer.classList.remove("danger");
    }
  }
}

setInterval(update, 1000);
