var clear_completed = document.getElementById('clear_completed');
var input_bar = document.getElementById('input_bar');

var todoStorage = [
  { id: 1, title: 'apple', completed: false },
  { id: 2, title: 'banana', completed: false },
  { id: 3, title: '', completed: false },
  { id: 4, title: '', completed: false },
  { id: 5, title: '', completed: false },
  { id: 6, title: '', completed: false },
  { id: 7, title: '', completed: false },
  { id: 8, title: '', completed: false },
]

/*
var todoStorage = [
    {id: 1, title: '', completed: false},
]
*/

var id_num = 0;


clear_completed.onclick = function(){
    //todoStorage[0].title = "kiss";
    //alert(todoStorage[0]['title']);
    alert("clear the completed!");
}

input_bar.onkeydown = function(){
    if(event.keyCode == 13){
        todoStorage[id_num].id = id_num + 1;
        todoStorage[id_num].title = input_bar.value;
        todoStorage[id_num].completed = false;
        id_num++;   
    }
}