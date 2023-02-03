var userInputs = [];

$("#search-button").on("click", function(event){
    event.preventDefault();
    var userArtistInput = $("#artist-name-search").val();
    var userAddress = $("#address-search").val();
    var userCountryInput = $("#country-search").val();
    
    userInputs = [userArtistInput, userAddress, userCountryInput]; //Use this array to get any of the user inputs where needed

    console.log(userInputs);

    //Run functions here
    window.location.href = "results.html";
});

