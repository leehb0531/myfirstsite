'use strict'

class Card {
  constructor(w,m){
    this.w = w;
    this.m = m;
  }
  get w() {
    return this._w;
  }
  get m() {
    return this._m;
  }
  set w(value) {
    this._w = value;
  }
  set m(value) {
    this._m = value;
  }
}
let words = ['자산(Asset)','자본(Capital)','비용(liability)'];
let meaning = ['미래! 경제적 효익을 주는것', '자산-부채', '미래! 경제적 희생이 되는것'];
let index = 0;

const cards=[];
for(let i = 0 ; i < words.length; i++){
  cards.push(new Card(words[i],meaning[i]));
}

let card_front = document.getElementById('card_front');
let card_back = document.getElementById('card_back');
let card_meaning = document.getElementById('word_def');
let card_exp = document.getElementById('word_exp');

function flipCard(){
  
  if(card_back.style.visibility==='hidden'){
    card_back.style.visibility ='visible';
    card_front.style.visibility = 'hidden';
  } else {
    card_back.style.visibility ='hidden';
    card_front.style.visibility = 'visible';
  }
}

function preCard(){
  card_back.innerHTML = cards[index].m;
  card_front.innerHTML = cards[index].w;
  index -= 1;
  if (index < 0){
    index = words.length-1;
  }
  card_back.style.visibility ='hidden';
  card_front.style.visibility = 'visible';
}
function nextCard(){
  card_back.innerHTML = cards[index].m;
  card_front.innerHTML = cards[index].w;
  index += 1;
  if(index > cards.length-1){
    index = 0;
  }
  card_back.style.visibility ='hidden';
  card_front.style.visibility = 'visible';
}