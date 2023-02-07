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
});

$("#saved-events-button").on("click", function(event){
    location.href = "saved-events.html"
});


if (savedEvents === undefined || savedEvents.length == 0){ //Checks if any previous search data exists in local storage
    console.log("No saved events found.");
}
else{
    if($("body").is(".saved-event-page")){
        displaySavedEvents();
        console.log("Loaded saved events");
    }
}