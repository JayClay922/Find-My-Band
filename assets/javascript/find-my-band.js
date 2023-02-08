
var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
var userInputs = [];

// window.onload = createCountryDropdown();

$("#search-button").on("click", function(event){
    event.preventDefault();
    var userArtistInput = $("#artist-name-search").val();
    var userAddress = $("#address-search").val();
    var userCountryInput = $("#country-selector").val();
    console.log(userCountryInput);

    var countryIndex = countryListAllIsoData.findIndex(e => e.name == userCountryInput);

    if(userArtistInput === "" || userArtistInput === undefined){ //Validation for empty fields
        console.log("Missing Artist Input");
        $("#missing-artist-modal").modal("show");
        return;
    }
    else if(userAddress === "" || userAddress === undefined){
        console.log("Missing Postcode");
        $("#missing-postcode-modal").modal("show");
        return;
    }
    else if(userCountryInput == "Please select country"){
        console.log("No country");
        $("#missing-country-modal").modal("show");
        return;
    }
    else{
        
        var userCountryCode = countryListAllIsoData[countryIndex].code.toLowerCase();
        userInputs = [userArtistInput, userAddress, userCountryInput, userCountryCode];
        console.log(userInputs);

        if (userCountryInput == "United Kingdom of Great Britain and Northern Ireland (the)") {
            var UKregExp = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$/;
                if( UKregExp.test( userAddress ) ){
                    generateConcertData();
                    addressSearch(userInputs[1], userInputs[3]);
            } else {
                alert("Postcode is invalid.");
            }
            } else if (userCountryInput == "United States of America (the)"){
                var USregExp = /^(\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d)$/;
                if ( USregExp.test( userAddress ) ) {
                    generateConcertData();
                    addressSearch(userInputs[1], userInputs[3]);
                } else {
                    alert("Zipcode is invalid.");
                }
            } else if (userCountryInput == "Canada"){
                var CANregExp = /^(([ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ])\ ?([0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]))$/;
                if ( CANregExp.test( userAddress ) ) {
                    generateConcertData();
                    addressSearch(userInputs[1], userInputs[3]);
                } else {
                    alert("Postcode is invalid.");
                }
            } else {
                generateConcertData();
                addressSearch(userInputs[1], userInputs[3]); 
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