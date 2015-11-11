/**
 * Created by Thomas on 11/8/15.
 */
//declares angular module
//var myApp = angular.module("myApp", []);
//console.log("is this working 1?");
//
//
//
//myApp.controller("WelcomeController", ['$scope', '$http', function($scope, $http){
//    console.log("is this working 2?");
//
//    $scope.note = {};
//    $scope.nameArray = [];
//    //$scope.nameArray = response.data;
//
//
//    //POST
//    $scope.clickButton = function(request){
//        console.log("button click",request);
//
//        $http.post('/people', request).then(function(response){
//            $scope.getPeople();
//        })
//        $scope.note = {};
//    };
//
//    //GET
//    $scope.getPeople = function(){
//        console.log("is this working 3?");
//        $http.get('/people').then(function(response){
//            $scope.nameArray = response.data;
//        });
//    };
//
//
//    $scope.getPeople();
//}]);










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

function getData() {
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