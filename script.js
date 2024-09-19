"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const testPlayer = {
    position: "PG",
    twoPercent: 42,
    threePercent: 35,
    points: 30,
};
const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter/";
function getPlayers(player) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(player),
            });
            if (!res.ok) {
                throw new Error("network error");
            }
            const data = yield res.json();
            console.log(res.status);
            return data;
        }
        catch (error) {
            console.log(error);
        }
    });
}
// range show numbers
//להציג את המספר של הרנג
function updateTextInput(val, lbl) {
    const lbll = document.getElementById(lbl);
    lbll.textContent = val.toString();
}
// selectors
const tbody = document.querySelector("tbody");
const form = document.querySelector("form");
document.querySelector("DOM");
// document.body.onload = function () {
//   renderer();
// };
//lister + func
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    SearchPlayer();
}));
//function
function SearchPlayer() {
    return __awaiter(this, void 0, void 0, function* () {
        const currentposition = document.querySelector("#position-input").value;
        const currenttwoPercent = document.querySelector("#two-percent-input").value;
        const currentthreePercent = document.querySelector("#three-percent-input").value;
        const currentpoints = document.querySelector("#points-input").value;
        const playerSearched = {
            position: currentposition,
            twoPercent: Number(currenttwoPercent),
            threePercent: Number(currentthreePercent),
            points: Number(currentpoints),
        };
        const ListPlayers = yield getPlayers(playerSearched);
        tbody.textContent = "";
        if (ListPlayers) {
            ListPlayers.forEach((plyr) => {
                var _a;
                const tr = document.createElement("tr");
                const tdplayer = document.createElement("td");
                if (plyr.playerName !== undefined) {
                    tdplayer.textContent = plyr.playerName;
                }
                const tdposition = document.createElement("td");
                tdposition.textContent = plyr.position;
                const tdtwoPercent = document.createElement("td");
                tdtwoPercent.textContent = plyr.twoPercent.toString();
                const tdthreePercent = document.createElement("td");
                tdthreePercent.textContent = plyr.threePercent.toString();
                const tdpoints = document.createElement("td");
                tdpoints.textContent = plyr.points.toString();
                const ChooseBtn = document.createElement("button");
                ChooseBtn.textContent = `Add ${(_a = plyr.playerName) === null || _a === void 0 ? void 0 : _a.split(" ")[0]} to team`;
                ChooseBtn.addEventListener("click", () => addToTeam(plyr));
                tr.append(tdplayer, tdposition, tdtwoPercent, tdthreePercent, tdpoints, ChooseBtn);
                tbody.append(tr);
            });
        }
    });
}
//  להוסיף את השחקן לרשימה של השחקנים
function addToTeam(plyr) {
    const cards = document.querySelectorAll(".card");
    const name = document.createElement("h4");
    if (plyr.playerName)
        name.textContent = plyr.playerName;
    const threePercent = document.createElement("p");
    if (plyr.threePercent)
        threePercent.textContent = `three percent: ${plyr.threePercent.toString()}%`;
    const twoPercent = document.createElement("p");
    if (plyr.twoPercent)
        twoPercent.textContent = `two percenet: ${plyr.twoPercent.toString()}%`;
    const points = document.createElement("p");
    if (plyr.points)
        points.textContent = `points :${plyr.points.toString()}`;
    switch (plyr.position) {
        case "PG":
            cards[0].innerHTML = " ";
            cards[0].innerHTML = "<h3>point-guard<h3>";
            cards[0].append(name, threePercent, twoPercent, points);
            break;
        case "SG":
            cards[1].innerHTML = " ";
            cards[1].innerHTML = "<h3>shooting-guard<h3>";
            cards[1].append(name, threePercent, twoPercent, points);
            break;
        case "SF":
            cards[2].innerHTML = " ";
            cards[2].innerHTML = "<h3>small-forward<h3>";
            cards[2].append(name, threePercent, twoPercent, points);
            break;
        case "PF":
            cards[3].innerHTML = " ";
            cards[3].innerHTML = "<h3>power-forward<h3>";
            cards[3].append(name, threePercent, twoPercent, points);
            break;
        case "C":
            cards[4].innerHTML = " ";
            cards[4].innerHTML = "<h3>center<h3>";
            cards[4].append(name, threePercent, twoPercent, points);
            break;
        default:
            break;
    }
}
