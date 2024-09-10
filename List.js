const them = document.querySelector(".them");
const hourglass = document.querySelector(".hourglass");
const calender = document.querySelector(".calender");
const task = document.querySelector("#task");
const left = document.querySelector(".left");
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");
const nothing = document.querySelector(".nothing");
const addbtn = document.querySelector(".addbtn");
const Add = document.querySelector(".add");
const leftway = document.querySelector(".leftway");
const num = document.querySelector(".num");
const filtering = document.querySelector(".filtering");
const all = document.querySelector("#all");
const active = document.querySelector("#active");
const completed = document.querySelector("#completed");


//..........mood.....................................................................................

let m=1;
function mood(){
    if(m==1){
        hourglass.style.color="black";
        calender.style.color="black";
        task.style.color="black";
        document.body.className = "light";
        all.style.color="black";
        m=0;
    }
    else if(m==0){
        hourglass.style.color="white";
        calender.style.color="white";
        task.style.color="white";
        document.body.className = "";
        all.style.color="white";
        m=1;
    }
}

them.addEventListener('click' , mood);


// ..........ThemColor...........................................
let n=1;
function nothingThem(){
    if(n==0 && m==0){
    hourglass.style.color="black";
    calender.style.color="black";
    task.style.color="black";
   
    }
    else if(n==0 && m==1){
    hourglass.style.color="white";
    calender.style.color="white";
    task.style.color="white";
    }
    n=1;
}
function redThem(){
    hourglass.style.color="#912222";
    calender.style.color="#912222";
    task.style.color="#912222";
    n=0;
}
function blueThem(){
    hourglass.style.color="#22009f";
    calender.style.color="#22009f";
    task.style.color="#22009f";
    n=0;
}
function greenThem(){
    hourglass.style.color="#01482a";
    calender.style.color="#01482a";
    task.style.color="#01482a";
    n=0;
}
function yellowThem(){
    hourglass.style.color="#797d02";
    calender.style.color="#797d02";
    task.style.color="#797d02";
    n=0;
}
red.addEventListener('click' , redThem);
blue.addEventListener('click' , blueThem);
green.addEventListener('click' , greenThem);
yellow.addEventListener('click' , yellowThem);
nothing.addEventListener('click' , nothingThem);

//...add..........................................................................................
function main(){
    if(!Add.value){
        add(JSON.parse(localStorage.getItem("Tasks")));
    }
}

function add(todoArr){
    if(!todoArr){
        return null;
    }

    todoArr.forEach(todoObj => {
        //creat elements
        const item = document.createElement("p");
        const checkbox = document.createElement("input");
        const delet=document.createElement("input");
        const list = document.createElement("div");


        //add classes
        item.className="item";
        checkbox.className="checkbox";
        delet.className = "delet";
        list.className="list";

        //add atribute
        item.textContent = todoObj.item;
        checkbox.type="checkbox";
        delet.type = "button";
        list.setAttribute("draggable" , true);

        //stay on atribute in loading
        if(todoObj.isCompleted){
            list.classList.add("checked");
            checkbox.setAttribute("checked" , "checked");
        }

        //append
        list.append(item);
        list.append(checkbox);
        list.append(delet);
        checkbox.after(item);
        item.after(delet);
        leftway.appendChild(list);


        //event delet
        delet.addEventListener("click" , (e)=>{
            e.target.classList.add = "checked";
            const currentlist = delet.parentElement;
            currentlist.classList.add("fall");
            const indexofcurent = [...document.querySelectorAll(".leftway .list")].indexOf(currentlist);
            remove(indexofcurent);







            //animation to remove
            currentlist.addEventListener("animationend" , ()=>{
                setTimeout(() =>{
                    currentlist.remove();
                },100);
            });
        });


        //set classname to checked
        checkbox.addEventListener('click' , (e)=>{
            const curentlist = checkbox.parentElement;
            const ischeck = checkbox.checked ;
            const indexofcurent = [...document.querySelectorAll(".leftway .list")].indexOf(curentlist);
            stateTodo(indexofcurent , ischeck );

            ischeck ? curentlist.classList.add("checked"): curentlist.classList.remove("checked");


            //number of left tasks
            num.textContent = document.querySelectorAll(
                ".leftway .list:not(.checked)"
            ).length;

        });

        //events dragg
        list.addEventListener("dragstart" ,()=>{
            list.classList.add("dragging");
        });
        list.addEventListener("dragend" ,()=>{
            list.classList.remove("dragging");
        });
        list.addEventListener("dragover",(e)=>{
            e.preventDefault();
            if(e.target.classList.contains("list") &&
            !e.target.classList.contains("dragging")){
                const dragging = document.querySelector(".dragging");
                const lists = [...leftway.querySelectorAll(".list")];
                const currentPos = lists.indexOf(dragging);
                const newpos = lists.indexOf(e.target);
                if(currentPos > newpos){
                    leftway.insertBefore(dragging,e.target);
                }
                else if (currentPos < newpos){
                    leftway.insertBefore(dragging,e.target.nextSibling);
                }
                const tasks = JSON.parse(localStorage.getItem("Tasks"));
                const removed = tasks.splice(currentPos , 1);
                tasks.splice(newpos,0,removed[0]);
                localStorage.setItem("Tasks" , JSON.stringify(tasks));
            }        
        });
    });



    num.textContent = document.querySelectorAll(
        ".leftway .list:not(.checked)"
    ).length;
}



//add...LocalStorage...
function addlocal(e){
    e.preventDefault();
    if(Add.value.trim() != ""){
        const ITEM = Add.value.trim();
        const Tasks= !localStorage.getItem("Tasks")?[]:JSON.parse(localStorage.getItem("Tasks"));
        const currectTask={
            item :ITEM ,
            isCompleted:false
        };
        Tasks.push(currectTask);
        localStorage.setItem("Tasks",JSON.stringify(Tasks));
        add([currectTask]);
        Add.value = "";
    }
}



function remove(index){
    const Tasks =JSON.parse(localStorage.getItem("Tasks"));
    Tasks.splice(index ,1);
    localStorage.setItem("Tasks" , JSON.stringify(Tasks));

}

function stateTodo(index , isComplete){
    const Tasks =JSON.parse(localStorage.getItem("Tasks"));
    Tasks[index].isCompleted = isComplete;
    localStorage.setItem("Tasks" , JSON.stringify(Tasks));
}


document.addEventListener("DOMContentLoaded" , main);
addbtn.addEventListener("click" , addlocal);

//keyBoard
Add.addEventListener("keypress" , (e)=>{
    if(e.key == "enter"){
        addbtn.addEventListener("click" , addlocal);   
    }
});

filtering.addEventListener("click" ,(e)=>{
    const id=e.target.id;
    if(id){
        document.querySelector(".on").classList.remove("on");
        document.getElementById(id).classList.add("on");
        document.querySelector(".leftway").className = `leftway ${id}`;

    }
});