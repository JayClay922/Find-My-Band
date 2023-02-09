// Artists Events Tracker --------------------------------------------------------------------------------
var validCountryVenuesData = []; //Empty array to store relevant API data temporarily based on user input
var eventLatLong = []; //Empty array to store temp even coordinate data used in mapping function

generateConcertData = function(){
    console.log("Finding artist information");
    
    var userArtistInputNoSpace = userInputs[0].split(' ').join('%20'); //Replaces spaces with %20 (required for API call url)
    var userCountryInput = userInputs[2]; //Takes user inputted country

    //---------TEST DATA--------------
    
    // var response = concertEventsTrackerTestResponse;
    // var userCountryInput = "New Zealand";

    //---------TEST DATA--------------

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://concerts-artists-events-tracker.p.rapidapi.com/artist?name="+userArtistInputNoSpace+"&page=1",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": concertEventsTrackerKey,
            "X-RapidAPI-Host": "concerts-artists-events-tracker.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.data === undefined || response.data.length === 0){ //Checks if artist exists
            console.log("Artist not found");
            $("#artist-not-found").modal("show");
            return;
        }
        else{
            var tempArtistPerformanceData = []; //Temporary array for artist venues
            var tempArtistInfoData = {}; //Temporary Object for artist data
    
            tempArtistInfoData["artist"] = response.data[0].name;
            tempArtistInfoData["image"] = response.data[0].image;
    
            var artistImg = $("<img>").attr("class", "artistImg");
            artistImg.attr("src", response.data[0].image); //Creates artist bio using artist name and image
            var artistName= $("<h2>").attr("class", "artistName");
            artistName.text(response.data[0].name);

            $("#artist-bio").append(artistImg);
            $("#artist-bio").append(artistName);
            
    
            for (var i = 0; i < response.data.length; i++){
                var tempDataObject = {}; //Temporary Object for venue data
        
                tempDataObject["description"] = response.data[i].description;
                tempDataObject["venue"] = response.data[i].location.name;
                tempDataObject["address"] = response.data[i].location.address;
                tempDataObject["latitude"] = response.data[i].location.geo.latitude;
                tempDataObject["longitude"] = response.data[i].location.geo.longitude;
                tempDataObject["startdate"] = response.data[i].startDate;
        
                tempArtistPerformanceData.push(tempDataObject); //Adds temp object to temp array
            }
    
            validateCountryInput(tempArtistPerformanceData, userCountryInput); //Checks if the venue data contains user inputted country
            getRequiredVenues(tempArtistPerformanceData, userCountryInput); //Creates new array containing only instances of venues in user's inputted country
            
            $("#back-button-main").removeClass("hide");
            console.log(validCountryVenuesData);
    
            for (var i = 0; i < validCountryVenuesData.length; i++){ //Loops through tempt data and creates a card for each venue
         
                var eventCarousel = $("<div>").attr("class", "carousel-item");
                var eventCard = $("<div>").attr("class", "card");
                var eventCardContentMain = $("<div>").attr("class", "card-body");
                var eventCardContentButton = $("<div>").attr("class", "card-body btn-toolbar");
                var venueName = $("<h2>").text(validCountryVenuesData[i].venue);
                var eventDate = $("<h2>").text(validCountryVenuesData[i].startdate);
                var address = $("<p>").text("Located at: "+
                    validCountryVenuesData[i].address.streetAddress+ " "+
                    validCountryVenuesData[i].address.addressLocality+ ", "+
                    validCountryVenuesData[i].address.postalCode+ ", "+
                    validCountryVenuesData[i].address.addressCountry);
                var description = $("<p>").text(validCountryVenuesData[i].description);
                var viewDirections = $("<a>").attr({
                    class: "btn btn-primary",
                    "data-id": i+ "-directions"}); //The Save and direction buttons are all given a unique id which corresponds to the index in which their card data is stored
                viewDirections.text("Directions");
                var saveEvent = $("<a>").attr({
                    class: "btn btn-primary",
                    "data-id": i+ "-saveEvent"});
                saveEvent.text("Save");
    
                eventCardContentMain.append(venueName);
                eventCardContentMain.append(eventDate);
                eventCardContentMain.append(description);
                eventCardContentMain.append(address);
                eventCardContentButton.append(viewDirections);
                eventCardContentButton.append(saveEvent);
                eventCard.append(eventCardContentMain);
                eventCard.append(eventCardContentButton);
                eventCarousel.append(eventCard);
    
                $("#events-carousel").append(eventCarousel); //Cards are appended to carousel
                $('.carousel-item').first().addClass('active'); //Sets first card to be active to enable the carousel to work
            }

            $("#main-search-box").addClass("hide"); //Hides search box and displays results
            $("#results").removeClass("hide");
    
            $("a").on("click", function(){
                var clickBtn = $(this).data('id'); //Returns ID of event card clicked

                let saveBtn = clickBtn.includes('saveEvent'); //Checks if clicked button is for save or directions
                let directionBtn = clickBtn.includes('directions');

                if (saveBtn === true) { 
                    console.log("Save button clicked");
                    saveIndex = parseInt(clickBtn); //Takes Event ID from button
                    saveEventLocal(validCountryVenuesData[saveIndex]); //Runs save function
                }
                if (directionBtn === true) {
                    console.log("Directions button clicked");
                    directionIndex = parseInt(clickBtn); //Takes Event ID from button
                    eventLatLong = [validCountryVenuesData[directionIndex].latitude, validCountryVenuesData[directionIndex].longitude]; //Sets coordinates from selected event to be used in map function
                    $('#placeholder-map').addClass('hide');
                    $('#my-map').addClass('hide');
                    $('#view-directions').addClass('hide');
                    generateMap(); //Generates map
                    calcDistanceAndTime(); //Calculates the distance to the event from the user's location as well as the time it will take to drive
                }
                
            });
        }
    });
}

validateCountryInput = function(arr, str){
    const i = arr.findIndex(e => e.address.addressCountry === str); //Checks if the user's inputted country is found in the artist's upcoming events
    if (i > -1) {
        console.log("Reponse contains inputted country at index "+ i);
    }
    else{
        console.log("No events found for specified country");
        $("#missing-event-in-country-modal").modal("show");
        return;
    }
}

getRequiredVenues = function(arr, str){ //Function to return only venues located in user's country
    validCountryVenuesData = arr.filter(function(e){
        return e.address.addressCountry === str;
    })
}

saveEventLocal = function(obj){

    obj["userLat"] = userLatLong[1]; //Adds user's inputted location to temporary data object
    obj["userLong"] = userLatLong[0];
    
    savedEvents.push(obj); //Pushes object to local storage array
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents)); //Saves to local storage
    console.log("Event saved");
    $("#event-saved").modal("show");
}

displaySavedEvents = function(){ //Function which displays data from local storage
    if (savedEvents === undefined || savedEvents.length == 0){
        $("#placeholder").removeClass("hide");
        console.log("No saved events found");
    }
    else{
        $("#placeholder").attr("class", "hide");

        for (var i = 0; i < savedEvents.length; i++){ //Loops through tempt data and creates a card for each venue
    
            var eventCard = $("<div>").attr("class", "card");
            var eventCardContentMain = $("<div>").attr("class", "card-body");
            var eventCardContentButton = $("<div>").attr("class", "card-body btn-toolbar");
            var venueName = $("<h2>").text(savedEvents[i].venue);
            var eventDate = $("<h2>").text(savedEvents[i].startdate.replace(/\T/g, ' at '));
            var address = $("<p>").text("Located at: "+
                savedEvents[i].address.streetAddress+ " "+
                savedEvents[i].address.addressLocality+ ", "+
                savedEvents[i].address.postalCode+ ", "+
                savedEvents[i].address.addressCountry);
            var description = $("<p>").text(savedEvents[i].description);
            var viewDirections = $("<a>").attr({
                class: "btn btn-primary",
                "data-id": i+ "-direction"});
            viewDirections.text("Directions");
            var saveEvent = $("<a>").attr({
                class: "btn btn-primary",
                "data-id": i+ "-deleteEvent"});
            saveEvent.text("Delete");
    
            eventCardContentMain.append(venueName);
            eventCardContentMain.append(eventDate);
            eventCardContentMain.append(description);
            eventCardContentMain.append(address);
            eventCardContentButton.append(viewDirections);
            eventCardContentButton.append(saveEvent);
            eventCard.append(eventCardContentMain);
            eventCard.append(eventCardContentButton);
    
            $("#saved-events").append(eventCard);
        }
    }
}