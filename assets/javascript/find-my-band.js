
var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
var userInputs = [];

$("#search-button").on("click", function(event){
    event.preventDefault();
    var userArtistInput = $("#artist-name-search").val();
    var userAddress = $("#address-search").val();
    var userCountryInput = $("#country-search").val();
    
    userInputs = [userArtistInput, userAddress, userCountryInput]; //Use this array to get any of the user inputs where needed

    console.log(userInputs);

    generateConcertData();
    addressSearch(userInputs[1]);
});

if (savedEvents === undefined || savedEvents.length == 0){ //Checks if any saved event data exists in local storage
    console.log("No saved events found.");
}

$("#saved-events-button").on("click", function(){
    location.href = "saved-events.html"
});


if($("body").is(".saved-event-page")){
    displaySavedEvents();
    console.log("Loaded saved events");

    $("#back-button").on("click", function(){
        location.href = "index.html"
    });
}

$("a").on("click", function(){
    var clickBtn = $(this).data('id'); //Returns ID of event card clicked

    var deleteBtn = clickBtn.includes('deleteEvent'); //Checks if clicked button is for sve or directions
    var directionBtn = clickBtn.includes('directions');

    if (deleteBtn === true) { 
        console.log("Delete button clicked");
        deleteIndex = parseInt(clickBtn); //Takes Event ID from button
        savedEvents.splice(deleteIndex, 1);
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
        $("#saved-events").empty();
        displaySavedEvents();
        return;
    }

    if (directionBtn === true) {
        console.log("Directions button clicked");
    }
});

$("#back-button-main").on("click", function(){
    $("#results").attr("class", "hide");
    $("#main-search-box").removeClass("hide");
});