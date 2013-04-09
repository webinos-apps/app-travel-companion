/**
 *
 * User: Juan David Millan
 * Date: 12/02/13
 * Time: 08:55
 *
 */
GeoSearch.results = [];
function GeoSearch(options) {
    this.initialize(options);
}
GeoSearch.prototype.initialize = function (options) {
    this._config = {};
    this.setConfig(options);
}
GeoSearch.prototype.setConfig = function (options) {
    this._config = {
        'country': options.country || '',
        'provider': options.provider,

        'searchLabel': options.searchLabel || 'search for address...',
        'notFoundMessage': options.notFoundMessage || 'Sorry, that address could not be found.',
        'messageHideDelay': options.messageHideDelay || 3000,
        'zoomLevel': options.zoomLevel || 18
    };
}

GeoSearch.prototype.geosearch = function (qry) {
    var provider = this._config.provider;
    var url = provider.GetServiceUrl(qry);
    var self = this;
    var json = $.ajax({
        dataType: "json",
        url: url,
        async: false
    }).responseText;
    var results = $.parseJSON(json);
    return results;


}
function GeoSearchProvider() {

}


function GeoSearchProviderOpenStreetMap() {
    options: {

    }

}


GeoSearchProviderOpenStreetMap.prototype.GetServiceUrl = function (qry) {
    http://nominatim.openstreetmap.org/search?q=fraunhofer+fokus+berlin
        var query='http://nominatim.openstreetmap.org/search?q='
            + qry + '&format=json&polygon=1&addressdetails=1';
        return query;
}
