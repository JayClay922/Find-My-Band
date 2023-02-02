// Artists Events Tracker --------------------------------------------------------------------------------

$("#get-artist-info").on("click", function(){
    console.log("Finding artist information");
    
    var userArtistInput = $("#artist-input").val(); //Takes user inputted artist/band
    userArtistInput.split(' ').join('%20'); //Replaces spaces

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

    console.log(concertEventsTrackerTestResponse); //Test data
});