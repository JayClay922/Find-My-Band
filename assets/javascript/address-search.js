var userLatLong = [];

addressSearch = function(address) {
    // let address = $("#artist-name-search").val()
    // let geoApi = "3c6d56a038644a538656d5ec2ff10a55";
    
    $.ajax({
       url: "https://api.geoapify.com/v1/geocode/search?text=" + address + "&apiKey=" + geoapifyKey,
       method: "GET",
       success: function(response) {
        var userLong = response.features[0].properties.lon
        var userLat = response.features[0].properties.lat

        userLatLong = [userLong, userLat];
       }
    });
};