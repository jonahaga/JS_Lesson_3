$(document).ready(function(){
    var formSubmitButton = $("#form_submit");
    var itemFormSubmit = $("#item_form_submit");

    // To-Do Lists Form
    formSubmitButton.on("click", function(event){
        event.preventDefault(); // prevent the browser form submission from happening
        $.ajax({
            url: "/",
            method: "POST",
            data: $("form#todo_list_form").serialize(),
        }).done(function(data){
            $('#todo-list')[0].innerHTML = data;
        }).fail(function(){
            alert("fail!!!");
        });
    });

    // Gets updated to-do list from server and changes HTML
    var getListsFromServer = function() {
        $.ajax({
            url:'/todo_lists/poll',
            method: "GET"
        }).done(function(data){
            $('#todo-list').html(data);
        });
    };

    // To-Do Items Form
    itemFormSubmit.on("click", function(event){
        event.preventDefault();
        $.ajax({
            url: window.location.pathname,
            method: "POST",
            data: $("form#todo-item-form").serialize(),
        }).done(function(data){
            $('#todo-list')[0].innerHTML = data;
        }).fail(function(){
            alert("fail!!!");
        });
    });

    // Items Load Without Page Refresh
    $(".todo-list a").on("click", function(event){
        event.preventDefault();
        $.ajax({
            url: $(this).attr("href"),
            method: "GET",
        }).done(function(data){
            $("body")[0].innerHTML = data;
        });
    });


});