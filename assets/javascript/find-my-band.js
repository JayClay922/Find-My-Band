var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || []; //Loads previously saved event data from local storage
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

if (savedEvents === undefined || savedEvents.length == 0){ //Checks if any saved event data exists in local storage
    console.log("No saved events found.");
}

