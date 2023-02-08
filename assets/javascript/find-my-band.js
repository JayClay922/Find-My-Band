
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

        if (userCountryInput == "UK") {
            var UKregExp = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$/;
                if( UKregExp.test( userAddress ) ){
                    generateConcertData();
                    addressSearch(userInputs[1], userInputs[3]);
            } else {
                $("#missing-postcode-modal").modal("show");
            }
            } else if (userCountryInput == "US"){
                var USregExp = /^(\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d)$/;
                if ( USregExp.test( userAddress ) ) {
                    generateConcertData();
                    addressSearch(userInputs[1], userInputs[3]);
                } else {
                    $("#missing-postcode-modal").modal("show");
                }
            } else if (userCountryInput == "Canada"){
                var CANregExp = /^(([ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ])\ ?([0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]))$/;
                if ( CANregExp.test( userAddress ) ) {
                    generateConcertData();
                    addressSearch(userInputs[1], userInputs[3]);
                } else {
                    $("#missing-postcode-modal").modal("show");
                }
            } else if(userCountryInput == "Australia"){
                var AUSregExp = /^(?:(?:[2-8]\d|9[0-7]|0?[28]|0?9(?=09))(?:\d{2}))$/;
                if ( AUSregExp.test( userAddress ) ) {
                    generateConcertData();
                    addressSearch(userInputs[1], userInputs[3]);
                } else {
                    $("#missing-postcode-modal").modal("show");
                }
            } else if(userCountryInput == "Germany" || userCountryInput == "Italy" ){
                var GERORITAregExp = /^\d{5}$/;
                if ( GERORITAregExp.test( userAddress ) ) {
                    generateConcertData();
                    addressSearch(userInputs[1], userInputs[3]);
                } else {
                    $("#missing-postcode-modal").modal("show");
                }
            } else if(userCountryInput == "France"){
                var FRAregExp = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
                if ( FRAregExp.test( userAddress ) ) {
                    generateConcertData();
                    addressSearch(userInputs[1], userInputs[3]);
                } else {
                    $("#missing-postcode-modal").modal("show");
                }
            } else if(userCountryInput == "Spain"){
                var ESPregExp = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
                if ( ESPregExp.test( userAddress ) ) {
                    generateConcertData();
                    addressSearch(userInputs[1], userInputs[3]);
                } else {
                    $("#missing-postcode-modal").modal("show");
                }
            } else if(userCountryInput == "Netherlands (the)"){
                var NLDregExp = /^(?:NL-)?(?:[1-9]\d{3} ?(?:[A-EGHJ-NPRTVWXZ][A-EGHJ-NPRSTVWXZ]|S[BCEGHJ-NPRTVWXZ]))$/i;
                if ( NLDregExp.test( userAddress ) ) {
                    generateConcertData();
                    addressSearch(userInputs[1], userInputs[3]);
                } else {
                    $("#missing-postcode-modal").modal("show");
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
    var directionBtn = clickBtn.includes('direction');

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
        directionIndex = parseInt(clickBtn);
        eventLatLong = [savedEvents[directionIndex].latitude, savedEvents[directionIndex].longitude];
        userLatLong = [savedEvents[directionIndex].userLat, savedEvents[directionIndex].userLong];
        $('#my-map').addClass('hide')
        $('#view-directions').addClass('hide')
        generateMap();
        calcDistanceAndTime();
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