// Artists Events Tracker --------------------------------------------------------------------------------
var validCountryVenuesData = [];
$("#test-data-button").on("click", function(){
    console.log("Finding artist information");
    
    // var userArtistInput = $("#artist-name-search").val(); //Takes user inputted artist/band
    // var userArtistInputNoSpace = userArtistInput.split(' ').join('%20'); //Replaces spaces with %20 (required for API call url)
    // var userCountryInput = $("#country-search").val(); //Takes user inputted country

    // API Response code not being used for now.

    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://concerts-artists-events-tracker.p.rapidapi.com/artist?name="+userArtistInputNoSpace+"&page=1",
    //     "method": "GET",
    //     "headers": {
    //         "X-RapidAPI-Key": concertEventsTrackerKey,
    //         "X-RapidAPI-Host": "concerts-artists-events-tracker.p.rapidapi.com"
    //     }
    // };
    
    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });

    var response = concertEventsTrackerTestResponse; //Test data
    var userCountryInput = "New Zealand";

    if(response.data === undefined || response.data.length === 0){ //Checks if artist exsits
        console.log("Artist not found");

        // --- Write code here to display artist not found modal ---

    }
    else{
        var tempArtistPerformanceData = []; //Temporary array for artist venues
        var tempArtistInfoData = {}; //Temporary Object for artist data

        tempArtistInfoData["artist"] = response.data[0].name;
        tempArtistInfoData["image"] = response.data[0].image;

        let artistBio = $("<div>").attr("class", "artistBio"); //Creates artist bio using artist name and image
        artistBio.css("background-image", "url("+ response.data[0].image+ ")");
        let artistName = $("<p>").text(tempArtistInfoData.artist+ "'s Upcoming Events");
        artistBio.append(artistName);
        $("#artist-bio").prepend(artistBio);

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

        console.log(tempArtistPerformanceData);
        validateCountryInput(tempArtistPerformanceData, userCountryInput); //Checks if the venue data contains user inputted country
        getRequiredVenues(tempArtistPerformanceData, userCountryInput); //Creates new array containing only instances of venues in user's inputted country

        console.log(validCountryVenuesData);

        for (var i = 0; i < validCountryVenuesData.length; i++){ //Loops through tempt data and creates a card for each venue
            var eventCard = $("<div>").attr("class", "card");
            var eventCardContent =$("<div>").attr("class", "card-body");
            var venueName = $("<h2>").text(validCountryVenuesData[i].venue);
            var eventDate = $("<h2>").text(validCountryVenuesData[i].startdate);
            var address = $("<p>").text("Located at: "+
                validCountryVenuesData[i].address.streetAddress+ " "+
                validCountryVenuesData[i].address.addressLocality+ ", "+
                validCountryVenuesData[i].address.postalCode+ ", "+
                validCountryVenuesData[i].address.addressCountry);
            var viewDirections = $("<a>").attr({
                class: "btn btn-primary",
                "data-id": 1});
            viewDirections.text("View Directions");

            eventCardContent.append(venueName);
            eventCardContent.append(eventDate);
            eventCardContent.append(address);
            eventCardContent.append(viewDirections);
            eventCard.append(eventCardContent);

            $("#events-list").append(eventCard);
        }

        $("a").on("click", function(){
            var clickBtn = $(this).data('id'); //Returns ID of event card clicked
            console.log(clickBtn);
        });
    }
});

validateCountryInput = function(arr, str){
    const i = arr.findIndex(e => e.address.addressCountry === str);
    if (i > -1) {
        console.log("Reponse contains inputted country at index "+ i);
    }
    else{
        // --- Write code here to display artist not performing in country found modal ---
    }
}

getRequiredVenues = function(arr, str){
    validCountryVenuesData = arr.filter(function(e){
        return e.address.addressCountry === str;
    })
}