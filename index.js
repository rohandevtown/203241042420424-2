// console.log("Hello World!");

// const state = {
//     taskList: [
//         {
//             url: "",
//             title: "",
//             description: "",
//             tag: ""
//         },
//          {
//             url: "",
//             title: "",
//             description: "",
//             tag: ""
//         },
//          {
//             url: "",
//             title: "",
//             description: "",
//             tag: ""
//         }
//     ]
// }

const state = {
    taskList: []
}


// DOM
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");


// console.log(taskContents);
// console.log(taskModal);


const htmlTaskContent = ({id, title, description, type, url}) => `
    <div class="col-md-6 col-lg-4 mt-3 " id=${id} key=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header gap-2">
                <button type="button" class="btn btn-outline-primary mr-2" name=${id} onclick="editTask.apply(this, arguments)">
                    <i class="fas fa-pencil-alt" name=${id}></i>
                </button>
                  <button type="button" class="btn btn-outline-danger mr-2" name=${id} onclick="deleteTask.apply(this, arguments)">
                    <i class="fas fa-trash-alt" name=${id}></i>
                </button>
            </div>
            <div class="card-body">
            ${
                url ?
                `<img src=${url} alt="card image cap" class="card-img-top md-3 rounded-lg" />`
                :
                `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9z2LrUn3xzemQCrcV3bOatGG73RZ-3clGHTGktZZjHKOk2KX&s" alt="card image cap" class="card-img-top md-3 rounded-lg" />`
            }
            <h4 class="card-title">${title}</h4>
            <p class="trim-3-lines text-muted">${description}</p>
            <div class="tags text-white d-flex flex-wrap">
                <span class="badge text-bg-primary m-1">${type}</span>
            </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" id=${id} onclick='openTask.apply(this, arguments)'>Open Task</button>
            </div>
        </div>
    </div>
    </div>
`


const htmlModalContent = ({id, title, description, url}) => {
    const date = new Date(parseInt(id));
    return `
        <div id=${id}>
            ${
                 url ?
                `<img src=${url} alt="card image cap" class="img-fluid mb-3" />`
            :
                `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9z2LrUn3xzemQCrcV3bOatGG73RZ-3clGHTGktZZjHKOk2KX&s" alt="card image cap" class="img-fluid mb-3" />`
            }
            <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
            <h2 class="my-3">${title}</h2>
            <p class="lead">${description}</p>
        </div>
    `
}


const updateLocalStorage = () => {
    localStorage.setItem('task', JSON.stringify({
        tasks: state.taskList
    }))
}


const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

    if(localStorageCopy) state.taskList = localStorageCopy.tasks
    
    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate))
    })
}

const handleSubmit = () => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById('imageUrl').value,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        type: document.getElementById('tags').value,
    };


    if(input.title == "" || input.description == "" || input.type == ""){
        return alert("Please fill out the necessary fields!")
    }
    
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({
        ...input,
        id,
    }))

    state.taskList.push({...input, id});
    updateLocalStorage();

}

const openTask = (e) => {
    if(!e) e = window.event;

    const getTask = state.taskList.find(({id}) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask)
}

const deleteTask = (e) => {
    if(!e) e = window.event;

    const targetID = e.target.getAttribute("name");
    const type = e.target.tagName;
    // console.log(type);

    const removeTask = state.taskList.filter(({id})=> id !== targetID)
    // console.log(removeTask);
    state.taskList= removeTask;

    updateLocalStorage();

    if(type === "BUTTON"){
        console.log(e.target.parentNode.parentNode.parentNode)
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        )
    }
    return   e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode.parentNode
        );

}


const editTask = (e) => {
    if(!e) e = window.event;

    const targetID = e.target.id;
    const type = e.target.tagName;

    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;


    if(type==="BUTTON"){
        parentNode = e.target.parentNode.parentNode;
    }else{
        parentNode = e.target.parentNode.parentNode.parentNode
    }

    taskTitle = parentNode.childNodes[3].childNodes[3];
    taskDescription = parentNode.childNodes[3].childNodes[5];
    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    // console.log(taskType)

    submitButton = parentNode.childNodes[5].childNodes[1];

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");

    submitButton.setAttribute('onclick', "saveEdit.apply(this, arguments)");
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");
    submitButton.innerHTML = "Save Changes";
}    



const saveEdit = (e) => {
    if(!e) e = window.event;

    const targetId = e.target.id;
    const parentNode = e. target.parentNode.parentNode;
    // console.log(parentNode.childNodes)

    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[5];
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    const submitButton = parentNode.childNodes[5].childNodes[1];

    const updateData = {
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML
    };

    let stateCopy = state.taskList;

    stateCopy = stateCopy.map((task)=> task.id === targetId ? {
        id: task.id,
        title: updateData.taskTitle,
        description: updateData.taskDescription,
        type: updateData.taskType,
        url: task.url
    } : task);

    state.taskList = stateCopy;
    updateLocalStorage();


    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");

    submitButton.setAttribute('onclick', "openTask.apply(this, arguments)");
    submitButton.setAttribute("data-bs-toggle", "modal");
    submitButton.setAttribute("data-bs-target", "#showTask");
    submitButton.innerHTML = "Open Task";

}



const searchTask = (e) => {
    if(!e) e = window.event;

    while(taskContents.firstChild){
        taskContents.removeChild(taskContents.firstChild)
    }

    const resultData = state.taskList.filter(({title}) => title.includes(e.target.value));

    console.log(resultData);

    resultData.map((cardData)=> {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData))
    })
}    
