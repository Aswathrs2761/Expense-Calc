let addbtn = document.getElementById("add-btn")
const updateButton = document.getElementById("update-btn")

document.querySelectorAll('input[name="filters"]').forEach(radio => {
  radio.addEventListener('change', filter);  // ✅ pass the function, don't call it
});

let selectedId

let income = 0;
let expense = 0;
let edit = false

buttonChange()

updateButton.addEventListener("click", () => {

    const desc = document.getElementById("desc-box").value
    const amnt = Number(document.getElementById("amnt-box").value)
    const selected = document.querySelector('input[name="groupName"]:checked').value

    let local = JSON.parse(localStorage.getItem("purse"))

    local.map((item)=>{
        if(item.transactionId == selectedId){
            item.desc = desc
            item.type = selected
            item.amount = amnt
        }
        
    })

    
    localStorage.setItem("purse", JSON.stringify(local))
    filter()
    reset()
    edit = false

buttonChange()
setTotal()


})

function buttonChange (){
    if(edit){
    updateButton.style.display = "block"
    addbtn.style.display = "none"
}
else{
    updateButton.style.display = "none"
    addbtn.style.display = "block"
}
}


function reset() {
    document.getElementById("desc-box").value = ""
    document.getElementById("amnt-box").value = ""
}

document.getElementById("reset").addEventListener("click", reset)
addbtn.addEventListener("click", () => {

    let descbox = document.getElementById("desc-box").value
    let amtbox = Number(document.getElementById("amnt-box").value)
    let totalincome = document.querySelector("#total-inc h1")
    let totalexpense = document.querySelector("#total-exp h1")
    let totalbalance = document.querySelector("#total-bal h1")



    const selected = document.querySelector('input[name="groupName"]:checked').value


    let local = JSON.parse(localStorage.getItem("purse"))

    console.log(local, typeof (local), "lllll");

    if (!local) {
        local = []
        local.push({
            desc: descbox,
            type: selected,
            amount: amtbox,
            transactionId:1
        });
    }
    else {
        // local = JSON.parse(local)
        let id = local[local.length-1]?.transactionId
        local.push({
            desc: descbox,
            type: selected,
            amount: amtbox,
            transactionId:(id || 0)+1

        });
    }


    localStorage.setItem("purse", JSON.stringify(local))

    // if (selected === "Income") {
    //     income += amtbox
    //     totalincome.innerHTML = `₹ ${income}`

    // }
    // else {
    //     expense += amtbox
    //     totalexpense.innerHTML = `₹ ${expense}`
    // }

    // let netbalance = income - expense

    // totalbalance.innerHTML = `₹ ${netbalance}`



    // local.map((item) => {
    //     // console.log("okiuytr", item)

    // })
    setTotal()
    filter()
    reset()
})


function transactions(data){
 // Step 1: Select the dummy-trans container
let dummyTrans = document.querySelector(".dummy-trans");

// Step 2: Create the main-trans-entry div
let mainTransEntry = document.createElement("div");
mainTransEntry.classList.add("main-trans-entry");

// Step 3: Create the tans-entry div
let tansEntry = document.createElement("div");
tansEntry.classList.add("tans-entry");

// Step 4: Create h3 and h5 elements
let h3 = document.createElement("h3");
h3.textContent = data.desc;

let h5 = document.createElement("h5");
h5.textContent = data.amount;

// Append h3 and h5 to tans-entry
tansEntry.appendChild(h3);
tansEntry.appendChild(h5);

// Step 5: Create Edit button
let editBtn = document.createElement("button");
editBtn.id = data.transactionId;
editBtn.classList.add("btn-edit");
editBtn.textContent = "Edit";

editBtn.addEventListener("click", () => {
 edit = true
 document.getElementById("desc-box").value = data.desc
 document.getElementById("amnt-box").value = data.amount
 buttonChange()
 selectedId = data.transactionId
 
});

// Step 6: Create Delete button
let deleteBtn = document.createElement("button");
deleteBtn.id = data.transactionId;
deleteBtn.classList.add("btn-delete");
deleteBtn.textContent = "Delete";

deleteBtn.addEventListener("click", () => {
  deleteButtonHandler(data.transactionId);  // <-- pass the ID
});

// Step 7: Append everything to main-trans-entry
mainTransEntry.appendChild(tansEntry);
mainTransEntry.appendChild(editBtn);
mainTransEntry.appendChild(deleteBtn);

// Step 8: Append main-trans-entry to dummy-trans
dummyTrans.appendChild(mainTransEntry);
}




function filter(){
   const selectedType = document.querySelector('input[name="filters"]:checked').value

    let local = JSON.parse(localStorage.getItem("purse"))

    document.querySelector(".dummy-trans").innerHTML = "";


    local?.filter(item => selectedType == "All" || item.type == selectedType ).map((data) => (
        transactions(data)
    ))


// console.log(local,typeof(local));


}

filter()


function deleteButtonHandler(id){

    let local = JSON.parse(localStorage.getItem("purse")).filter(item => item.transactionId != id )

    localStorage.setItem("purse",JSON.stringify(local))
    filter()
    setTotal()
}


function setTotal(){
    let totalincome = document.querySelector("#total-inc h1")
    let totalexpense = document.querySelector("#total-exp h1")
    let totalbalance = document.querySelector("#total-bal h1")
    let netBal = JSON.parse(localStorage.getItem("purse"))
    // console.log(netBal)

    let totalBal = 0
    let totalIncome = 0
    let totalExp = 0



    netBal.map((item)=>{
        console.log(item)
        if(item.type === "Income"){
            totalIncome = item.amount + totalIncome 
        }
        else{
         totalExp = item.amount + totalExp   
        }

    })

    totalBal = totalIncome - totalExp

    totalincome.innerHTML = totalIncome
    totalexpense.innerHTML = totalExp
    totalbalance.innerHTML = totalBal
    
}

setTotal()

