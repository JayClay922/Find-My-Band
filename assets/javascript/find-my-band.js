// Artists Events Tracker --------------------------------------------------------------------------------

$("#search-button").on("click", function(){
    console.log("Finding artist information");
    
    // var userArtistInput = $("#artist-input").val(); //Takes user inputted artist/band
    // userArtistInput.split(' ').join('%20'); //Replaces spaces

    // API Response code not being used for now.

    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://concerts-artists-events-tracker.p.rapidapi.com/artist?name="+userArtistInput+"&page=1",
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
});