addressSearch = function() {
    let address = $("#artist-name-search").val()
    let geoApi = "3c6d56a038644a538656d5ec2ff10a55";
    
    $.ajax({
       url: "https://api.geoapify.com/v1/geocode/search?text=" + address + "&apiKey=" + geoApi,
       method: "GET",
       success: function(response) {
        let long2 = response.features[0].porperties.lon
        let lat2 = response.features[0].properties.lat

        let fromWaypoint = [long2, lat2]
       }
    });




};