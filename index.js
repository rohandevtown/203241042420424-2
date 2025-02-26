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
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-primary mr-2" name=${id}>
                    <i class="fas fa-pencil-alt" name=${id}></i>
                </button>
                  <button type="button" class="btn btn-outline-danger mr-2" name=${id}>
                    <i class="fas fa-trash-alt" name=${id}></i>
                </button>
            </div>
            <div class="card-body">
            ${
                url && 
                `<img src=${url} alt="card image cap" class="card-img-top md-3 rounded-lg" />`
            }
            <h4 class="card-title">${title}</h4>
            <p class="trim-3-lines text-muted">${description}</p>
            <div class="tags text-white d-flex flex-wrap">
                <span class="badge text-bg-primary m-1">${type}</span>
            </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
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
                 url && 
                `<img src=${url} alt="card image cap" class="img-fluid mb-3" />`
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
    const localStorageCopy = JSON.parse(localStorage.tasks);

    if(localStorageCopy) state.taskList = localStorageCopy.tasks
    
    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML()
    })
}