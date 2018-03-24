var newAnimal = ""
var animalButtons = ["dog", "cat", "bird"];
var addAnimal = function(event) {
    event.preventDefault();
    newAnimal = $("#animal-to-add").val().trim();
    animalButtons.push(newAnimal);
    console.log(animalButtons);
    generateButtons();
    $("#animal-to-add").val("");
};
var generateButtons = function() {
    console.log("aaa");
    $("#button-section").empty();
    for (var i = 0; i < animalButtons.length; i++) {
        console.log(animalButtons[i]);
        var buttonTag = $("<button id='gif-generator' class='btn btn-success'>");
        buttonTag.html(animalButtons[i]);
        buttonTag.attr("data-animal",animalButtons[i]);
        $("#button-section").append(buttonTag)
    }
};
var gifGenerate = function () {
    var animal = $(this).attr("data-animal");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURL);
            console.log(response);
            var results = response.data;
            console.log(results.length)
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div class='col-md-4'>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var animalImage = $("<img id='gif-img' class='img-fluid'>");
                animalImage.attr("src", results[i].images.fixed_width_still.url);
                animalImage.attr("data-still", results[i].images.fixed_width_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_width.url);
                animalImage.attr("animation-state", "still");
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#gif-section").prepend(animalDiv);
            }
        });
};


generateButtons();
$(document).on("click", "#gif-generator", gifGenerate);
$("#add-animal").on("click", addAnimal)
$(document).on("click", "#gif-img", function(){
    console.log("clicking gif");
    var stillImage = $(this).attr("data-still");
    var animateImage = $(this).attr("data-animate");
    if ($(this).attr("animation-state") === "still") {
        $(this).attr("animation-state","animated");
        $(this).attr("src",animateImage);
    }
    else {
        $(this).attr("animation-state","still");
        $(this).attr("src",stillImage);        
    }
});