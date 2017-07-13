var input_bar = document.querySelector(".new-todo");


input_bar.onkeydown = function(){
    if(event.keyCode == 13){
        input_bar.value = '';
    }
}