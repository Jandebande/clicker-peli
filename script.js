"use strict";
let roubles=0,clickPower=1,tier1=false,tier2=false,tier3=false,eventActive=false,eventEnd=0;
const eventDuration=10000,bitcoinReward=500000;
function randomDelay(){return 30000+Math.random()*60000}
let nextEvent=Date.now()+randomDelay();
function updateDisplay(){
 document.getElementById("roubles").textContent=Math.floor(roubles).toLocaleString("en-US")+" ₽";
 document.getElementById("buy1").disabled=tier1||roubles<50;
 document.getElementById("buy2").disabled=tier2||roubles<250;
 document.getElementById("buy3").disabled=tier3||roubles<1000;
 const box=document.getElementById("eventBox");
 if(eventActive){const seconds=Math.max(0,(eventEnd-Date.now())/1000);document.getElementById("eventTitle").textContent="₿ BITCOIN EVENT AKTIIVINEN!";document.getElementById("eventInfo").textContent="Jokainen klikkaus antaa 500 000 ₽!";document.getElementById("timer").textContent=seconds.toFixed(1)+" sekuntia jäljellä";box.classList.add("active")}
 else{document.getElementById("eventTitle").textContent="₿ Bitcoin Event";document.getElementById("eventInfo").textContent="Odota harvinaista tapahtumaa...";document.getElementById("timer").textContent="";box.classList.remove("active")}
}
function clickRouble(){roubles+=eventActive&&Date.now()<eventEnd?bitcoinReward:clickPower;updateDisplay()}
function buyUpgrade(tier,cost,power){if(roubles<cost)return;roubles-=cost;clickPower+=power;if(tier===1)tier1=true;if(tier===2)tier2=true;if(tier===3)tier3=true;updateDisplay()}
document.getElementById("clickButton").addEventListener("click",clickRouble);
document.getElementById("buy1").addEventListener("click",()=>buyUpgrade(1,50,1));
document.getElementById("buy2").addEventListener("click",()=>buyUpgrade(2,250,5));
document.getElementById("buy3").addEventListener("click",()=>buyUpgrade(3,1000,25));
document.getElementById("resetButton").addEventListener("click",()=>{if(!confirm("Haluatko varmasti aloittaa uuden pelin?"))return;roubles=0;clickPower=1;tier1=tier2=tier3=false;eventActive=false;eventEnd=0;nextEvent=Date.now()+randomDelay();updateDisplay()});
function gameLoop(){const now=Date.now();if(!eventActive&&now>=nextEvent){eventActive=true;eventEnd=now+eventDuration}if(eventActive&&now>=eventEnd){eventActive=false;nextEvent=now+randomDelay()}updateDisplay();requestAnimationFrame(gameLoop)}
updateDisplay();requestAnimationFrame(gameLoop);
