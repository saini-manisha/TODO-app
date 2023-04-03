let task,addTask,deleteallTask,todoTasks,taskObj,saveTask;
showtasks();
task=document.getElementById("task");
addTask=document.getElementById("addTask");
deleteallTask=document.getElementById("deleteallTask");
todoTasks=document.getElementById("todoTasks");


addTask.addEventListener('click',input=>{
   
    let addtasksinputval=task.value;
    if (addtasksinputval.trim()!=0) {
        let webtask=localStorage.getItem("localtask");
        if(webtask==null){
            taskObj=[];
        }
        else{
            taskObj=JSON.parse(webtask);
        }
        taskObj.push(addtasksinputval);
        localStorage.setItem("localtask",JSON.stringify(taskObj));
    }
    
    showtasks();
    task.value='';
    

})
function showtasks(){
    let webtask=localStorage.getItem("localtask");
    if(webtask==null){
        taskObj=[];
    }
    else{
        taskObj=JSON.parse(webtask);
    }
    let html='';
    let tasks=document.getElementById("tasks");
    taskObj.forEach((element,index) => {
       
        html+=` <tr>
        <th>${index+1}</th>
        <td>${element}</td>
        <td><button type="button" onclick="edit(${index})" ><i>Edit</i></button></td>
        <td><button type="button" onClick="deleteitem(${index})"><i>Delete</i></button></td>               
    </tr>`;

    });
    tasks.innerHTML=html;
    
   
}
function edit(index){
    let saveindex=document.getElementById("saveindex");
    saveTask=document.getElementById("savetask");
    saveindex.value=index;
    let webtask=localStorage.getItem("localtask");   
    taskObj=JSON.parse(webtask);
    task.value=taskObj[index];
    addTask.style.display="none";
    saveTask.style.display="inline";  
    
    
    
}
saveTask=document.getElementById("savetask");
console.log('hi');
saveTask.addEventListener("click",()=>{
    

    console.log('hello');
     let webtask=localStorage.getItem("localtask");
     taskObj=JSON.parse(webtask);
     let saveindex=document.getElementById("saveindex").value;
     taskObj[saveindex]=task.value;
     localStorage.setItem("localtask",JSON.stringify(taskObj));
     console.log(task.value);
     showtasks();
     addTask.style.display="inline";
     saveTask.style.display="none";
     task.value="";

})

function deleteitem(index){
    let webtask=localStorage.getItem("localtask");
    taskObj=JSON.parse(webtask);
    taskObj.splice(index,1);
    localStorage.setItem("localtask",JSON.stringify(taskObj));
    showtasks();
}

deleteallTask.addEventListener("click",()=>{
    console.log('delete');
    let webtask=localStorage.getItem("localtask");
    let taskObj=JSON.parse(webtask);
    // for(let key in taskObj) 
    let length=taskObj.length;
    taskObj.splice(0,length);
    console.log(taskObj);
    localStorage.setItem("localtask",JSON.stringify(taskObj));
    showtasks();
    task.value='';
    addTask.style.display="inline";
     saveTask.style.display="none";
})

let Search=document.getElementById("search");
Search.addEventListener("input",()=>{
    console.log('search');
    let trlist=document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let searchedtext=item.getElementsByTagName("td")[0].innerText;
        let searchval=Search.value;
        let re= new RegExp(searchval,'gi');
        if(searchedtext.match(re)){
            item.style.display="block";
        }
        else{
            item.style.display="none";
        }
    })
})

