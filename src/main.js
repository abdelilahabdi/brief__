import { initialRepairs  } from "./data.js";
let repairs = loadRepairs() ;
//let repairs = initialRepairs.slice() ;
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
    
    if (repair.status !== "termine") {
      const finishButton = document.createElement("button");

      finishButton.type = "button" ;
      finishButton.textContent = "Terminer" ;

      finishButton.addEventListener("click", function () {
        finishRepair(repair.id);
      });
      listItem.appendChild(finishButton);
    }

    repairList.appendChild(listItem);
  }
}

renderRepairs(repairs);
 //renderRepairs(initialRepairs) ;
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


//statusFilter.addEventListener("change" , function () {
function updateDisplay() {
  const selectedStatus = statusFilter.value ;

  const visibleRepairs = filterRepairs(repairs, selectedStatus);

  renderRepairs(visibleRepairs);
}

statusFilter.addEventListener("change", updateDisplay);



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



function addRepair(repairs , device) {
  const deviceName = device.trim() ;

  if(deviceName === "") {
    return null ;
  }

  const newRepair = {
    id: crypto.randomUUID() ,
    device: deviceName,
    status: "recu" 
  };

  const newRepairs = repairs.slice() ;
  newRepairs.push(newRepair) ;


  return newRepairs ;
}

const testRepairs = addRepair(initialRepairs, " Ecran ") ;

console.log(testRepairs) ;
console.log(testRepairs.length);
console.log(initialRepairs.length) ;
console.log(addRepair(initialRepairs, " ")) ;


const repairForm = document.getElementById("repair-form");
const deviceInput = document.getElementById("device-input");


repairForm.addEventListener("submit", function (event){
  event.preventDefault() ;

  const newRepairs = addRepair(repairs, deviceInput.value);

  if(newRepairs === null) {
    alert("veuillez saisir un appareil");
    return;
  }

  repairs = newRepairs;
  saveRepairs(repairs);

  updateDisplay() ;

  deviceInput.value = "" ;
});




function changeStatus(repairs, id, newStatus) {
  if(
    newStatus !== "recu" && newStatus !== "en_cours" && newStatus !== "termine"
  ) {
    console.log("Statut non autorisé");
    return null;
  }

  const repairToChange = getRepair(repairs, id) ;

  if(repairToChange === null) {
    console.log("reparation introuvable") ;
    return null;
  }

  const newRepairs = [] ;

  for(let i = 0 ; i < repairs.length ; i++) {
    const repair = repairs[i] ;

    if(repair.id === id) {
      const updatedRepair = {
        id: repair.id ,
        device: repair.device,
        status: newStatus
      };

      newRepairs.push(updatedRepair);
    } else {
      newRepairs.push(repair);
    }
  }
  return newRepairs;
}

const changedRepairs = changeStatus(initialRepairs, "R2" , "termine") ;

if (changedRepairs !== null) {
  console.log(getRepair(changedRepairs, "R2").status);

  console.log(getRepair(changedRepairs, "R3").status);

  console.log(getRepair(initialRepairs, "R2").status);


  console.log(changedRepairs === initialRepairs) ;

}

console.log(changeStatus(initialRepairs, "R99", "termine"));


function finishRepair(id) {
 const newRepairs = changeStatus(repairs,id , "termine");

 if (newRepairs === null) {
  alert("impossible de terminer cette reparation");
  return ;
 }

 repairs = newRepairs;
 saveRepairs(repairs);
 updateDisplay() ;
}



function saveRepairs(repairs) {
  const repairsText = JSON.stringify(repairs) ;

  localStorage.setItem("fixit-repairs" , repairsText) ;
}

function loadRepairs() {
  const savedRepairs = localStorage.getItem("fixit-repairs");

  if(savedRepairs === null) {
    return initialRepairs.slice() ;

  }

  return JSON.parse(savedRepairs);
}





////////////////////////


// function finish(repairs, id) {
//   const repair = repairs.find(r => r.id === id);
//   repair.status = "termine" ;

//   return repairs;
// }

// const exampleRepairs = [
//   {id: "T1" , device: "Radio" , status: "en_cours"}
// ];


//const result = finish(exampleRepairs, "T1");
// const result = changeStatus(exampleRepairs, "T1", "termine");

// console.log(exampleRepairs[0].status);
// console.log(result[0].status); 
// console.log(result === exampleRepairs) ;



/////
function changeDevice (repairs, id, newDevice) {
  const deviceName = newDevice.trim();
  if (deviceName === "") {
    console.log("nom de l'appareil obligatoire");
    return null;
  }

  const repairToChange = getRepair(repairs , id) ;

  if(repairToChange === null) {
    console.log("reparation introuvable");
    return null;
  }

  const newRepairs = [] ;
  for(let i = 0 ; i < repairs.length ; i++) {

    const repair = repairs[i] ;

    if(repair.id === id) {
      const updatedRepair = {
        id: repair.id ,
        status: repair.status,
         device: deviceName
      };

      newRepairs.push(updatedRepair);
    } else {
      newRepairs.push(repair);
    }
  }
  return newRepairs;
  }

  const renamedRepairs = changeDevice (
    initialRepairs,
    "R3",
    " Imprimante canon "

  );

  if(renamedRepairs !== null) {
    console.log(getRepair(renamedRepairs, "R3").device);

    console.log(getRepair(initialRepairs, "R3").device);

    console.log(getRepair(renamedRepairs, "R3").status);
    
    console.log(renamedRepairs === initialRepairs);
  }