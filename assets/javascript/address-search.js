var userLatLong = [];

addressSearch = function(address, countrycode) {
    // let address = $("#artist-name-search").val()
    // let geoApi = "3c6d56a038644a538656d5ec2ff10a55";
    
    $.ajax({
       url: "https://api.geoapify.com/v1/geocode/search?text=" + address + "&type=postcode&filter=countrycode:"+ countrycode+"&apiKey=" + geoapifyKey,
       method: "GET",
       success: function(response) {
        if (response.features.length == 0) {
            $("#address-not-found").modal("show");
            return;
        } else {
        var userLong = response.features[0].properties.lon
        var userLat = response.features[0].properties.lat

        userLatLong = [userLong, userLat];
        console.log(userLatLong);
       }
       }
    });
};