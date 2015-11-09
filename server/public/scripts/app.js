/**
 * Created by Thomas on 11/8/15.
 */
$(document).ready(function(){
    console.log("hello ");



    $("#messageForm").submit(function(event){
         event.preventDefault();

         var values = {};

         $.each($(this).serializeArray(), function(i, field){
         values[field.name] = field.value;
         });
        $("#messageForm").find('input').val("");
         addMessage(values);
         console.log(values);

     });


    getData();

});

function addMessage(values){

    $.ajax({
        type: "POST",
        url: "/data",
        data: values,
        success: function (data) {

            updateDOM(data);
            console.log("post success", data)
        }
    });
}









//
function getData() {
    //event.preventDefault();
    //var values = {};
    //
    //
    //
    //$.each($(this).serializeArray(), function (i, field) {
    //    values[field.name] = field.value;
    //
    //});

    //console.log("is this working", values);
        $.ajax({
            type: "GET",
            url: "/data",
            //data: values,
            success: function (data) {
                updateDOM(data);
                console.log("success", data)
            }
        });

}





//Add a new message to the board
function updateDOM(data){
    console.log("put on DOM");
    event.preventDefault();

    for(var i = 0; i < data.length; i++){
        var el = "<div class='newMessage well col-md-6'>" +
            "<p>" + data[i].name + "</p>" +
            "<p>" + data[i].message + "</p>" +
        "</div>";

        $(".messageContainer").append(el);
    }
}