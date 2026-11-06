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



const repairList = document.getElementById("repair-list");
const repairCount = document.getElementById("repair-count");

function renderRepairs(repairs) {
  repairList.textContent = "" ;


  repairCount.textContent = "Nombre de demandes : " + repairs.length ;

  for (let i = 0 ; i < repairs.length ; i++) {
    const repair = repairs[i] ;

    let statusText = "Recu" ;

    if (repair.status === "en_cours") {
      statusText = "En cours" ;
    } else if (repair.status === "termine") {
      statusText = "Terminé" ;
    }

    const listItem = document.createElement("li") ;

    listItem.textContent = repair.device + " - " + statusText ;

    repairList.appendChild(listItem);
  }
}

renderRepairs(initialRepairs) ;