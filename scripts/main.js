var clear_completed = document.getElementById("clear_completed");
var input_bar = document.getElementById("input_bar");
var show_all = document.getElementById("show_all");
var show_active = document.getElementById("show_active");
var show_completed = document.getElementById("show_completed");
var todo_list = document.querySelector(".todo_list");
var all_click = document.getElementById("all_click");
var btn_div = document.querySelector(".btn_div");
var item_count = document.getElementById("item_count");
var main_todo = document.querySelector(".main_todo");

var list_cb = [];
var todoStorage = [];
var btn_x = [];
var span_input = [];

var id_num = 0;
var total_id_count = todoStorage.length;
var active_id_count = 0;
var completed_id_count = 0;

all_click.onclick = function() {
    synchro();
    count_active_completed();
    if (completed_id_count == todoStorage.length) {
        for (var i = 0; i < todoStorage.length; i++) {
            todoStorage[i].completed = false;
            list_cb[i].checked = false;
        }
    } else {
        for (var i = 0; i < todoStorage.length; i++) {
            todoStorage[i].completed = true;
            list_cb[i].checked = true;
        }
    }
    synchro();
    count_active_completed();
};

clear_completed.onclick = function() {
    delete_todo();
};

input_bar.onkeydown = function() {
    if (event.keyCode == 13) {
        if (input_bar.value != "") {
            todoStorage[id_num] = document.createElement("li");
            list_cb[id_num] = document.createElement("input");
            todoTitle = document.createElement("span");
            btn_x[id_num] = document.createElement("button");
            span_input[id_num] = document.createElement("input");

            todoStorage[id_num].title = input_bar.value;
            todoStorage[id_num].completed = false;
            todoStorage[id_num].id = id_num;
            // todoStorage[id_num].innerHTML = todoStorage[id_num].title;
            todoTitle.innerText = input_bar.value;
            todoStorage[id_num].deleted = false;

            // li
            // > input, todo.title
            list_cb[id_num].type = "checkbox";
            list_cb[id_num].checked = false;
            list_cb[id_num].id = "cb_" + id_num;

            btn_x[id_num].classList = "btn btn_" + id_num;
            list_cb[id_num].classList = "listcb listcb_" + id_num;
            todoStorage[id_num].classList = "lili lili_" + id_num;
            span_input[id_num].classList = "modify modify_" + id_num;

            list_cb[id_num].addEventListener("click", function() {
                synchro();
                count_active_completed();
            });

            btn_x[id_num].addEventListener("click", function(ev) {
                //todo_list.removeChild(ev.target.parentNode);
                list_cb[ev.target.parentNode.id].checked = true;
                // synchro();
                delete_todo();
                // count_active_completed();
            });

            todoStorage[id_num].addEventListener("dblclick", function(ev) {
                if (ev.target.tagName === "SPAN") {
                    ev.target.style.display = "none";
                    ev.target.parentNode.querySelector(".modify").style.display =
                        "inline";
                    ev.target.parentNode.querySelector(".modify").value =
                        ev.target.innerHTML;
                }
            });

            todoStorage[id_num].addEventListener("mouseover", function(ev) {
                if (ev.target.tagName === "LI") {
                    ev.target.querySelector(".lili button").classList = "done";
                } else if (ev.target.tagName === "SPAN" || "INPUT") {
                    ev.target.parentNode.querySelector(".lili button").classList = "done";
                }
            });

            todoStorage[id_num].addEventListener("mouseout", function(ev) {
                if (ev.target.tagName === "LI") {
                    ev.target.querySelector(".lili button").classList = "";
                } else if (ev.target.tagName === "SPAN" || "INPUT") {
                    ev.target.parentNode.querySelector(".lili button").classList = "";
                }
            });

            todoStorage[id_num].addEventListener("keydown", function(ev) {
                if (ev.keyCode == 13) {
                    todoStorage[ev.target.parentNode.id].title = ev.target.value;
                    ev.target.parentNode.querySelector(".lili span").innerHTML =
                        ev.target.value;

                    // todoTitle[id_num].innerHTML = ev.target.value;

                    ev.target.style.display = "none";
                    ev.target.parentNode.querySelector(".lili span").style.display =
                        "inline";

                    // synchro();
                }
            });

            todo_list.appendChild(todoStorage[id_num]);
            todoStorage[id_num].appendChild(todoTitle);
            todoStorage[id_num].appendChild(list_cb[id_num]);
            todoStorage[id_num].appendChild(span_input[id_num]);
            todoStorage[id_num].appendChild(btn_x[id_num]);
            id_num++;
            count_active_completed();
            block_none();
            input_bar.value = "";
        } else {}
    }
};

show_active.onclick = function() {
    synchro();
    for (var i = 0; i < todoStorage.length; i++) {
        if (todoStorage[i].completed == false) {
            todoStorage[i].style.display = "block";
        } else {
            todoStorage[i].style.display = "none";
        }
    }
    count_active_completed();
};

show_all.onclick = function() {
    synchro();
    for (var i = 0; i < todoStorage.length; i++) {
        todoStorage[i].style.display = "block";
        // document.getElementById(i).style.display = "block";
    }
    count_active_completed();
};

show_completed.onclick = function() {
    synchro();
    for (var i = 0; i < todoStorage.length; i++) {
        if (todoStorage[i].completed == true) {
            todoStorage[i].style.display = "block";
        } else {
            todoStorage[i].style.display = "none";
        }
    }
    count_active_completed();
};

function synchro() {
    for (var i = 0; i < todoStorage.length; i++) {
        if (list_cb[i].checked == true) {
            todoStorage[i].completed = true;
        } else {
            todoStorage[i].completed = false;
        }
    }
}

//브라우져에 보여주고 안보여주고를 결정하는 Function
function block_none() {
    if (active_id_count + completed_id_count != 0) {
        all_click.style.visibility = "visible";
        btn_div.style.display = "inline-block";
        main_todo.style.display = "inline-block";
    } else if (active_id_count + completed_id_count == 0) {
        all_click.style.visibility = "hidden";
        btn_div.style.display = "none";
        main_todo.style.display = "none";
    }
}

//Active list와 Completed list를 Count
function count_active_completed() {
    active_id_count = 0;
    completed_id_count = 0;
    for (var i = 0; i < todoStorage.length; i++) {
        if (todoStorage[i].deleted != false) {} else {
            if (todoStorage[i].completed == false) {
                active_id_count++;
            } else if (todoStorage[i].completed == true) {
                completed_id_count++;
            }
        }
    }
    item_count.innerHTML = active_id_count + " items left";
    if (completed_id_count == 0) {
        clear_completed.style.visibility = "hidden";
    } else {
        clear_completed.style.visibility = "visible";
    }
}

//Clear Completed 눌렀을때 todoStorage에서 지우는 Function
function delete_todo() {
    synchro();
    for (var i = 0; i < todoStorage.length; i++) {
        if (todoStorage[i].deleted != true) {
            if (todoStorage[i].completed == true) {
                todo_list.removeChild(todoStorage[i]);
                todoStorage[i].deleted = true;
            }
        }
    }
    count_active_completed();
}