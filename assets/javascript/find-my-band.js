// Artists Events Tracker --------------------------------------------------------------------------------

$("#test-data-button").on("click", function(){
    console.log("Finding artist information");
    
    var userArtistInput = $("#artist-name-search").val(); //Takes user inputted artist/band
    var userArtistInputNoSpace = userArtistInput.split(' ').join('%20'); //Replaces spaces with %20 (required for API call url)

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

    if(response.data === undefined || response.data.length === 0){ //Checks if artist exsits
        console.log("Artist not found");

        // --- Write code here to display artist not found modal ---

    }
    else{
        var tempArtistPerformanceData = []; //Temporary Array for Artist venue data
        var tempArtistInfoData = {};

        tempArtistInfoData["artist"] = response.data[0].name;
        tempArtistInfoData["image"] = response.data[0].image;

        let artistBio = $("<div>").attr("class", "artistBio");
        artistBio.css("background-image", "url("+ response.data[0].image+ ")");
        let artistName = $("<p>").text(tempArtistInfoData.artist+ "'s Upcoming Events");
        artistBio.append(artistName);
        $("#artist-bio").prepend(artistBio);

        for (var i = 0; i < response.data.length; i++){
            var tempDataObject = {}; //Temporary Object to store instances of 
    
            tempDataObject["description"] = response.data[i].description;
            tempDataObject["venue"] = response.data[i].location.name;
            tempDataObject["address"] = response.data[i].location.address;
            tempDataObject["latitude"] = response.data[i].location.geo.latitude;
            tempDataObject["longitude"] = response.data[i].location.geo.longitude;
            tempDataObject["startdate"] = response.data[i].startDate;
    
            tempArtistPerformanceData.push(tempDataObject); //Adds temp object to temp array
        }

        console.log(tempArtistPerformanceData);

        for (var i = 0; i < tempArtistPerformanceData.length; i++){
            var eventCard = $("<div>").attr("class", "eventCard");
            var venueName = $("<h2>").text(tempArtistPerformanceData[i].venue);
            var eventDate = $("<h2>").text(tempArtistPerformanceData[i].startdate);
            var address = $("<p>").text("Located at: "+
                tempArtistPerformanceData[i].address.streetAddress+ " "+
                tempArtistPerformanceData[i].address.addressLocality+ " "+
                tempArtistPerformanceData[i].address.postalCode+ " "+
                tempArtistPerformanceData[i].address.addressCountry
                );

            eventCard.append(venueName);
            eventCard.append(eventDate);
            eventCard.append(address);

            $("#events-list").prepend(eventCard);
        }
    }
});