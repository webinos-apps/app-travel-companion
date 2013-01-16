



function showWikiInfo (data){
    var article=null;
    for(var number in data.articles){
        article=data.articles[number];
        var latlng = new L.LatLng(article.lat, article.lng);
        geoTools.user=L.marker(latlng);
        geoTools.user.addTo(geoTools.map).bindPopup(article.title);
        $("#content").append('<iframe src="' + article.mobileurl + '"></iframe>');
    }
 }

function findNearestPOI(){
    $.ajax({
        url: 'http://api.wikilocation.org/articles?lat=' + geoTools.latitude + '&lng=' + geoTools.longitude +'&limit=8&jsonp=?',
        type: 'GET',
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        jsonpCallback: 'wiki',
        success: showWikiInfo
    });
}