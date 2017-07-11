var clear_completed = document.getElementById('clear_completed');
var input_bar = document.getElementById('input_bar');
var show_all = document.getElementById('show_all');
var show_active = document.getElementById('show_active');
var show_completed = document.getElementById('show_completed');
var todo_list = document.querySelector('.todo_list');
var all_click = document.getElementById('all_click');
var btn_div = document.querySelector('.btn_div');
var item_count = document.getElementById('item_count');


var todoStorage = [
  { id: 1, title: '', completed: false },
  { id: 2, title: '', completed: false },
  { id: 3, title: '', completed: false },
  { id: 4, title: '', completed: false },
  { id: 5, title: '', completed: false },
  { id: 6, title: '', completed: false },
  { id: 7, title: '', completed: false },
  { id: 8, title: '', completed: false },
  { id: 9, title: '', completed: false },
  { id:10, title: '', completed: false },
]

var id_num = 0;
var total_id_count = todoStorage.length;
var active_id_count = 0;
var completed_id_count = 0;


clear_completed.onclick = function(){
    alert("clear the completed!");
}

input_bar.onkeydown = function(){
    if(event.keyCode == 13){
        if(input_bar.value != ''){
            todoStorage[id_num].id = id_num + 1;
            todoStorage[id_num].title = input_bar.value;
            todoStorage[id_num].completed = false;
            var p = document.createElement('li');
            p.innerHTML = todoStorage[id_num].title;
            todo_list.appendChild(p);
            id_num++;
            block_none();
            count_active_completed();
        }else{
        }
    }
}

show_active.onclick = function(){
    alert("show_active");
}

show_all.onclick = function(){
    alert("show_all");
}

show_completed.onclick = function(){
    alert("show_completed");
}

//브라우져에 보여주고 안보여주고를 결정하는 Function
function block_none(){
    item_count.innerHTML = id_num + " items left";
    if(id_num != 0){
        all_click.style.display = "block";
        btn_div.style.display = "block";
    }else if(id_num == 0){
        all_click.style.display = "none";
        btn_div.style.display = "none";
    }
}

//Active list와 Completed list를 Count
function count_active_completed(){
    active_id_count = 0;
    completed_id_count = 0;
    for(var i = 0; i < todoStorage.length; i++){
        if(todoStorage[i].title == ''){
        }else{
            if(todoStorage[i].completed == false){
                active_id_count++;
            }else if(todoStorage[i].completed == true){
                completed_id_count++;
            }
        }
    }
}

/*
        var p = document.createElement('li');
        p.innerHTML = todoStorage[0].title;
        document.body.appendChild(p);
*/