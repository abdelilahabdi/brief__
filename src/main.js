import { initialRepairs  } from "./data.js";

//console.log(initialRepairs[1].device) ;

function getRepair(repairs, id) {
  for(let i = 0 ; i < repairs.length ; i++) {
    if(repairs[i].id === id) {
      return repairs[i] ;
    }
  }

  return null ;
}

const repair = getRepair(initialRepairs , "R2") ;

if(repair !== null) {
  console.log(repair.device) ;
}else {
  console.log("reparation introuvable") ;
}