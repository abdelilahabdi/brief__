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

  if (repairs.length === 0) {
    const message = document.createElement("li") ;
    message.textContent = "Aucune reparation";
    repairList.appendChild(message) ;
    return ;
  }



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
//renderRepairs([]);

function filterRepairs(repairs, status) {
  const filteredRepairs = [] ;

  for (let i = 0 ; i < repairs.length ; i++) {
    const repair = repairs[i] ;

    if(status === "tous" || repair.status === status) {
      filteredRepairs.push(repair) ;
    }
  }

  return filteredRepairs ;
}

const inProgress = filterRepairs(initialRepairs, "en_cours") ;

console.log(inProgress) ;
console.log(inProgress.length) ;

const allRepairs = filterRepairs(initialRepairs, "tous") ;

console.log(allRepairs) ;
console.log(allRepairs.length) ;



const statusFilter = document.getElementById("status-filter");


statusFilter.addEventListener("change" , function () {
  const selectedStatus = statusFilter.value ;

  const visibleRepairs = filterRepairs(initialRepairs, selectedStatus);

  renderRepairs(visibleRepairs);
});


function findRepairsByDevice(repairs, device) {
  const findRepairs = [] ;

  for ( let i = 0 ; i < repairs.length ; i++) {
    const repair = repairs[i] ;

    if (repair.device === device) {
      findRepairs.push(repair) ;

      
    }
    
  }
  return findRepairs ;

  
}

console.log(findRepairsByDevice (initialRepairs , "Telephone")) ;
console.log(findRepairsByDevice (initialRepairs , "Radio"));

