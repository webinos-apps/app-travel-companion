var twitterTools = {};
twitterTools.latlng = null;

twitterTools.searchTwitter = function (article, position) {
    //validate geoinfo is different from the previous  marker
    if (!twitterTools.latlng || twitterTools.latlng
        && (Math.abs(twitterTools.latlng.lat - position.lat) + Math.abs(twitterTools.latlng.lng - position.lng) > 3)) {
        var searchKeyWord=article.title;
        twitterTools.latlng = new L.LatLng(position.lat, position.lng);
        var geocode = position.lat + "," + position.lng + ",25mi";

        $.ajax({
            url: 'http://search.twitter.com/search.json?q=' + searchKeyWord + '&geocode=' + geocode + '&result_type=recent&rpp=10',
            type: 'GET',
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            //jsonpCallback: 'tweet',
            success: function (data){
                twitterTools.showTweet(data,article);
            }
        });

    }
}

twitterTools.showTweet =function (a,article) {

    var marker = L.marker(twitterTools.latlng);
    marker.addTo(geoTools.map);
    var popup = new TwitterPopUp(a.results);
    marker.on('click', function (e) {
        //open popup;
        popup.setLatLng(e.target._latlng)
            .openOn(geoTools.map);

    });
}

function TwitterPopUp(opt) {

    if (!opt || !opt.length) {
        this.setContent("No tiene tweets");
    } else {
        this.count = opt.length;
        this.crnt = 0;
        this.id = TwitterPopUp.tweets.push(this);
        this.aTweets = opt;
        var strTweet = this.buildTwitterHTML(opt[0]);
        this.setContent(strTweet);
    }
}

TwitterPopUp.prototype = new L.popup();
TwitterPopUp.tweets = [];


TwitterPopUp.prototype.buildTwitterHTML = function (twt) {
    var str;
    if (twt.from_user_name) {
        str = "<span><img style='float: left' src='" + twt.profile_image_url + "' />" +
            "<b>" + twt.from_user_name + "</b><br/><a href ='http://twitter.com/"
            + twt.from_user + "'>@" + twt.from_user + "</a><br/> "
            + twt.location + "</span>"
            + "<p>" + twt.text + "</p>";

        if (this.count > 1) {

            str += "<span style='absolute; bottom: 0; right: 0px; width:80px'>";
            if (this.crnt != 0) str += "<a href='javascript:TwitterPopUp.tweets[" + (this.id - 1) + "].prev();'>&lt;</a> ";
            str += (this.crnt + 1) + " of " + this.count;
            if (this.crnt < (this.count - 1)) str += "<a href='javascript:TwitterPopUp.tweets[" + (this.id - 1) + "].next();'>&gt;</a> ";
            str += "</span>"
        }
    } else {
        str = "The 25 Miles radius around this point did not message this value";
    }
    return str;
}
TwitterPopUp.prototype.next = function () {
    this.setContent(this.buildTwitterHTML(this.aTweets[++this.crnt]));
    //this.openOn(this.map);
    return false;
}

TwitterPopUp.prototype.prev = function () {
    this.setContent(this.buildTwitterHTML(this.aTweets[--this.crnt]));
    //this.openOn(this.map);
    return false;

}