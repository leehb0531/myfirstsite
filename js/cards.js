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
let words = [
  '자산 (Asset)',
  '자본 (Capital)',
  '비용 (Liability)',
  '수익 (Revenue)',
  '이익 (Profit)',
  '유동자산 (Current Asset)',
  '비유동자산 (Fixed Asset)',
  '재무상태표 (a statement of financial position)',
  '손익계산서 (Income statement)'];
let meaning = [
  '미래! 경제적 효익을 주는것', 
  '자산-부채', 
  '미래! 경제적 희생이 되는것',
  '일정기간! 경제적 효익의 유입',
  '수익 - 비용 == 순수익',
  '1년 이내 경제적 효익을 주는것',
  '1년 이후 경제적 효익을 주는것',
  '일정 시점! 회사의 자산, 부채, 자본을 정리한 표',
  '일정 기간! 수익과 비용을 집계한 표'];
let index = -1;

const cards=[];
for(let i = 0 ; i < words.length; i++){
  cards.push(new Card(words[i],meaning[i]));
}

let card_front = document.getElementById('card_front');
let card_back = document.getElementById('card_back');
let card_meaning = document.getElementById('word_def');
let card_exp = document.getElementById('word_exp');
let left_btn = document.getElementById('leftBtnWrapper');

function flipCard(){
  if(card_back.innerHTML != "Click"){
    card_back.innerHTML= "Click";
    card_back.style.opacity = 0.5;
    card_front.style.opacity = 1;
  } else {
    card_front.style.opacity = 0.5;
    card_back.innerHTML = cards[index].m;
    card_back.style.opacity = 1;
  }
}

function preCard(){
  index -= 1;
  if (index < 0){
    index = words.length-1;
  }
  card_front.innerHTML = cards[index].w;
  card_back.innerHTML = "Click";
  card_front.style.opacity = 1;
  card_back.style.opacity = 0.5;
}

function nextCard(){
  index += 1;
  if(index > cards.length-1){
    index = 0;
  }
  card_front.innerHTML = cards[index].w;
  card_front.style.opacity = 1;
  card_back.innerHTML = "Click";
  card_back.style.opacity = 0.5;
}