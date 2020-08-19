'use strict';

function toggleButton(id){
  let target = document.getElementById(id);
  if(target.style.display === "none"){
    target.style.display = "block";
  } else {
    target.style.display = "none";
  }
}