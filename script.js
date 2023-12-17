

let taskList = document.getElementById('taskList'); //li list
let searchText = document.getElementById('searchText');
const addButton = document.getElementById('zapiszButton');
const inputTask = document.getElementById('inputAddRow');
let date = document.getElementById("dateItem");
let todayDate = new Date();

let taskArray =[];

//localStorage array
 // 0 -task val,  1- task date, 2- ticked/unticked
function updateTaskArray(){

    let lis = document.getElementById("taskList").getElementsByTagName("li");
    lis = Array.from(lis);
    let index = 0;
    console.debug(lis);
    let taskVals = document.getElementsByClassName("task");
    let dateVals = document.getElementsByClassName("date");
    console.debug(taskVals);
    lis.forEach((item)=>{
        console.debug(item);
        console.debug(index);
        let classVal = item.className;
        taskArray[index] = {task: taskVals[index].textContent,date: dateVals[index].textContent,tick: classVal};
        ++index;
    });
   
}

function addItem() {
    if (inputTask.value === '') {
        alert("Wpisz zadanie do wykonania!");
    } else if (inputTask.value.length < 3 || inputTask.value > 255) {
        alert("Zadanie musi mieć od 3 do 255 znaków!");
    } else if (date.value < todayDate.toISOString().slice(0, 10)) {
        alert("Data nie może być późniejsza niż dzisiaj!");
    } else {
        let li = document.createElement("li");
        let taskSpan = document.createElement("span");
        taskSpan.spellcheck="false";
        taskSpan.innerHTML = inputTask.value;
        taskSpan.contentEditable = "true";
        taskSpan.className = "task";

   
        li.appendChild(taskSpan);
        
        let dateSpan = document.createElement("span");
        dateSpan.innerHTML = date.value;
        dateSpan.className = "date";
        dateSpan.addEventListener('dblclick', enableDateEditing);
        li.appendChild(dateSpan);

        let img = document.createElement("img");
        
        img.src = "remove.png";
      
        li.appendChild(img);
        taskArray.push({task: inputTask.value,date: date.value,tick: li.className});
        taskList.appendChild(li);
         
    }
    inputTask.value = "";
    store();
}

function updateRow(event) {
    let target = event.target;
    //zamiana tick i untick
    if (target.tagName === "LI") {
        if (target.classList.value === "tick") {
            target.classList.value = "";
            store();
        } else {
            target.classList.value = "tick";
            store();
        }
    } else if (target.tagName === "IMG") {
        event.target.parentElement.remove(); //parentElement
        store();
    }
}
function storeoriginal(){
    localStorage.setItem("dataList", taskList.innerHTML);
}
function store(){
  /*  jsonArray = [];
    taskArray.forEach(element => {
        jsonArray.push(JSON.stringify(element,null,2))
    });*/
    updateTaskArray()
    console.debug(taskArray);
    localStorage.setItem("dataList", JSON.stringify(taskArray));
   // localStorage.setItem("dataList",jsonArray);
   // localStorage.setItem("dataList", JSON.stringify(taskArray,null,2));
}

function restoreoriginal(){
    taskList.innerHTML = localStorage.getItem("dataList");
}

function restore(){
    let storedData = localStorage.getItem("dataList");
    console.debug(storedData);
    localArray = [];
    if (storedData) {
        localArray = JSON.parse(storedData);
        // storedData.forEach(data =>{
        // localArray.push(JSON.parse(data));
    }
        
    //localArray = localStorage.getItem("dataList");
    //array1.forEach((element) => console.log(element));
    localArray.forEach(element => {
        let localLi = document.createElement("li");
        localLi.className = element.tick;
        let taskSpanLocal = document.createElement("span");
        taskSpanLocal.spellcheck="false";
        taskSpanLocal.className="task";
        taskSpanLocal.innerHTML = element.task;
        taskSpanLocal.contentEditable = "true";
        localLi.appendChild(taskSpanLocal);
        
        let dateSpanLocal = document.createElement("span");
        dateSpanLocal.innerHTML = element.date;
        dateSpanLocal.className = "date";

        dateSpanLocal.addEventListener('dblclick', enableDateEditing);
        localLi.appendChild(dateSpanLocal);

        let imgLocal = document.createElement("img");
        
        imgLocal.src = "remove.png";
      
        localLi.appendChild(imgLocal);
        taskList.append(localLi);
    });
    }
    

function filter(){

    searchText = document.getElementById('searchText');
    let filter = searchText.value.trim().toLowerCase();

    let liList = taskList.getElementsByTagName("li");
    if(filter.length>=2 ) {

        for (let i = 0; i < liList.length; i++) {
            liList[i].classList.remove("highlighted");

            if (liList[i].innerText.toString().toLowerCase().includes(filter)) {
                liList[i].classList.toggle("highlighted");
                console.log(liList[i]);

               // const mark = document.createElement("mark");
               // mark.textContent = filter;
                //liList[i].innerHTML = liList[i].innerText.toLowerCase().replace(filter, mark.outerHTML);

            } else {
                liList[i].classList.remove("highlighted");

                //restore();
            }
        }

    }
    else {
        for (let i = 0 ; i < liList.length; i++ ){
            liList[i].classList.remove("highlighted");

            //restore();
        }
    }

}

function enableDateEditing(event) {
    const target = event.target;
    if (target.tagName === "SPAN") {
        const currentText = target.innerText;
        const input = document.createElement("input");
        input.type = "date";
        input.value = currentText;

        input.addEventListener("blur", () => {
            const newDate = input.value;
            target.innerText = newDate;
            input.replaceWith(target);
            store();
        });

        target.replaceWith(input);
        input.focus();
    }
}


taskList.addEventListener('click', updateRow);
addButton.addEventListener('click',addItem);

searchText.addEventListener('keyup', filter);
taskList.addEventListener('dblclick', enableDateEditing);

restore();




