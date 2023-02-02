// Artists Events Tracker --------------------------------------------------------------------------------

$("#search-button").on("click", function(){
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

    var response = artistNotFound; //Test data

    if(response.data === undefined || response.data.length === 0){ //Checks if artist exsits
        console.log("Artist not found");

        // --- Write code here to display artist not found modal ---
        
    }
    else{
        var tempArtistData = []; //Temporary Array for Artist venue data
        var tempDataObject = {}; //Temporary Object to store instances of 
    
        for (var i = 0; i < response.data.length; i++){
            var tempDataObject = {};
    
            tempDataObject["artist"] = response.data[i].name;
            tempDataObject["description"] = response.data[i].description;
            tempDataObject["image"] = response.data[i].image;
            tempDataObject["venue"] = response.data[i].location.name;
            tempDataObject["address"] = response.data[i].location.address;
            tempDataObject["latitude"] = response.data[i].location.geo.latitude;
            tempDataObject["longitude"] = response.data[i].location.geo.longitude;
            tempDataObject["startdate"] = response.data[i].startDate;
    
            tempArtistData.push(tempDataObject); //Adds temp object to temp array
        }

        console.log(tempArtistData);
    }
});