
var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
var userInputs = [];

// window.onload = createCountryDropdown();

$("#search-button").on("click", function(event){
    event.preventDefault();
    var userArtistInput = $("#artist-name-search").val();
    var userAddress = $("#address-search").val();
    var userCountryInput = $("#country-search").val();
    
    userInputs = [userArtistInput, userAddress, userCountryInput]; //Use this array to get any of the user inputs where needed

    console.log(userInputs);

    for(var i = 0; i < userInputs.length; i++){
        if(userInputs[i] === "" || userInputs[i] === undefined){ //Validation for empty fields
            console.log("Missing input");
        }
        else{
            getCountryCode(userInputs[2]);

            generateConcertData();
            addressSearch(userInputs[1]);
        }
    }
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
        location.reload();
    }

    if (directionBtn === true) {
        console.log("Directions button clicked");
    }
});

$("#back-button-main").on("click", function(){
    $("#results").attr("class", "hide");
    $("#main-search-box").removeClass("hide");
});

createCountryDropdown = function(){
    for(var i = 0; i < countryListAllIsoData.length; i++){

        var countryName = countryListAllIsoData[i].name;
        var countrySelectionElement = $("<option>").text(countryName);
    
        $("#country-selector").append(countrySelectionElement);
    }
}

createCountryDropdown();