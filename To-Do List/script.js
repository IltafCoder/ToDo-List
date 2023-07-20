
let taskCount = 0
let localKey = 0

function mainFunction() {

    let no_task_lbl = document.getElementById("no-task-info")
    let div = document.createElement("div")

    setTimeout(function () {
        div.style.opacity = '1'
    }, 10)

    let left_div = document.createElement("div")
    let right_div = document.createElement("div")
    let inp = document.createElement("input")
    let lbl = document.createElement("label")
    let edit_icon = document.createElement("i")
    let del_icon = document.createElement("i")

    let lbltext = document.createTextNode(a)
    a = document.getElementById("task-entry-txt").value = ""
    lbl.appendChild(lbltext)
    inp.type = "checkbox"
    inp.className = "check-node"
    div.className = "task-node"
    div.classList.add("task-node-animation")
    left_div.className = "task-left"
    right_div.className = "task-right"
    edit_icon.className = "fa fa-pencil-square-o"
    del_icon.className = "fa fa-trash-o"
    del_icon.classList.add("del-ico")
    edit_icon.classList.add("edit-ico")

    let parent_1 = document.getElementsByClassName("task-list")
    let parent_2 = parent_1[0].appendChild(div)
    parent_2.appendChild(left_div)
    left_div.appendChild(inp)
    left_div.appendChild(lbl)
    parent_2.appendChild(right_div)
    right_div.appendChild(edit_icon)
    right_div.appendChild(del_icon)
    taskCount = taskCount + 1

    let lbl_old = lbl.textContent
    let lbl_very_old = lbl.textContent
    edit_icon.addEventListener("click", function () {

        let temp_inp = document.createElement("input")
        temp_inp.style.marginLeft = "10px"

        lbl.style.display = "none"
        temp_inp.value = lbl.textContent
        left_div.appendChild(temp_inp)
        temp_inp.focus()

        temp_inp.addEventListener("blur", function () {

            if (temp_inp.value == "") {

                lbl.textContent = lbl_old
                temp_inp.remove()
                lbl.style.display = "block"

            }
            else {

                lbl.textContent = temp_inp.value
                lbl_old = temp_inp.value
                temp_inp.remove()
                lbl.style.display = "block"

                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i)
                    const itemValue = localStorage.getItem(key)

                    if (lbl_very_old == itemValue) {
                        localStorage.setItem(key, lbl.textContent)
                        break
                    }
                }

            }

        })

    })

    del_icon.addEventListener("click", function () {

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            const itemValue = localStorage.getItem(key)

            if (lbl.textContent == itemValue) {
                localStorage.removeItem(key)

                parent_2.remove()

                taskCount = taskCount - 1
                if (taskCount == 0) {
                    no_task_lbl.style.display = "block"
                }
                break
            }
        }
    })

    inp.addEventListener("change", function () {

        if (this.checked) {
            const item = parent_2
            setTimeout(() => {
                if (taskCount == 1) {
                    no_task_lbl.style.display = "block"
                }
                item.remove()
                taskCount = taskCount - 1

                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i)
                    const itemValue = localStorage.getItem(key)
                    var newKey = key

                    if (lbl.textContent == itemValue) {
                        localStorage.removeItem(key)
                        localStorage.setItem(newKey + "(completed)", itemValue)
                        break
                    }
                }

            }, 200)
        }
    })

}

function addTask() {

    a = document.getElementById("task-entry-txt").value
    if (a == "") {
        let x = document.getElementById("task-entry-txt")
        x.style.animation = "blinkingBackground 1s"

        setTimeout(() => {
            x.style.removeProperty("animation")
        }, 1000)
    }
    else {

        let no_task_lbl = document.getElementById("no-task-info")
        if (no_task_lbl) {
            no_task_lbl.style.display = "none"
        }

        // handling localStorage
        allKeys = [0]
        for (let i = 0; i < localStorage.length; i++) {
            if (!localStorage.key(i).endsWith("(completed)")) {
                allKeys.push(localStorage.key(i))
            }
        }
        const maxKey = Math.max(...allKeys)
        localKey = maxKey + 1
        localStorage.setItem(localKey, a)
        mainFunction()
    }
}

function onDocumentReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback)
    } else {
        callback()
    }
}

function indexPageFunction() {

    let active_tab = document.getElementById("tab-index")
    setTimeout(function () {
        active_tab.className = "active-tab"
    }, 10)

    let no_task_lbl = document.getElementById("no-task-info")

    let lengthCount = 0
    for (let i = 0; i < localStorage.length; i++) {
        if (!localStorage.key(i).endsWith("(completed)")) {
            lengthCount = lengthCount + 1
        }
    }

    if (lengthCount != 0) {
        if (no_task_lbl) {
            no_task_lbl.style.display = "none"
        }
    }

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.endsWith("(completed)")) {
            continue
        }
        let itemValue = localStorage.getItem(key)
        a = itemValue

        mainFunction()

    }
}

let pendingCount = 0
function pendingPageFunction() {

    let active_tab = document.getElementById("tab-pend")
    setTimeout(function () {
        active_tab.className = "active-tab"
    }, 10)

    let div_holder = document.getElementsByClassName("task-list")
    let info = document.getElementById("no-task-info")

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.endsWith("(completed)")) {
            continue
        }
        const itemValue = localStorage.getItem(key)
        let div = document.createElement("div")

        setTimeout(function () {
            div.style.opacity = '1'
        }, 10)

        let clock_ico = document.createElement("i")
        clock_ico.className = "fa fa-clock-o"
        clock_ico.style.marginLeft = "15px"
        clock_ico.style.alignSelf = "center"
        clock_ico.style.transform = "scale(2)"
        let lbl = document.createElement("label")
        lbl.textContent = itemValue
        lbl.style.marginLeft = "13px"
        div.appendChild(clock_ico)
        div.appendChild(lbl)
        div_holder[0].appendChild(div)
        div.className = "task-node"
        div.style.justifyContent = "flex-start"
        pendingCount = 1
    }

    if (pendingCount == 0) {
        info.style.display = "block"
    }
    else {
        info.style.display = "none"
    }

}

let completeCount = 0
function completePageFunction() {

    let active_tab = document.getElementById("tab-complete")
    setTimeout(function () {
        active_tab.className = "active-tab"
    }, 10)


    let div_holder = document.getElementsByClassName("task-list")
    let info = document.getElementById("no-task-info")

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.endsWith("(completed)")) {
            continue
        }
        const itemValue = localStorage.getItem(key)

        let div = document.createElement("div")
        setTimeout(function () {
            div.style.opacity = '1'
        }, 10)
        
        let lbl = document.createElement("label")
        let inp = document.createElement("input")
        inp.type = "checkbox"
        inp.checked = "true"
        inp.className = "check-node"
        inp.style.pointerEvents = "none"
        lbl.textContent = itemValue
        div.appendChild(inp)
        div.appendChild(lbl)
        div_holder[0].appendChild(div)
        div.className = "task-node"
        div.style.justifyContent = "flex-start"

        completeCount = 1

    }

    if (completeCount == 0) {
        info.style.display = "block"
    }
    else {
        info.style.display = "none"
    }
}

function dropMenu () {
    let menu = document.getElementsByClassName("menu-nav-bar")
    menu[0].style.display = "flex"
    
    setTimeout(function () {
        menu[0].style.opacity = '1'
    }, 10)
}

function dropMenuBlur () {
    let menu = document.getElementsByClassName("menu-nav-bar")
    setTimeout(function () {
        menu[0].style.display = "none"
        menu[0].style.opacity = '0'
    }, 10)
}

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = document.title
    if (currentPage === 'Todo List') {
        onDocumentReady(indexPageFunction)
    } else if (currentPage === 'Pending Tasks') {
        onDocumentReady(pendingPageFunction)
    } else if (currentPage === 'Completed Tasks') {
        onDocumentReady(completePageFunction)
    }
})