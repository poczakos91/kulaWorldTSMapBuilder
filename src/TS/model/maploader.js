/// <reference path="../../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="map.ts"/>
function loadMap(mapName, callback, context) {
    $.ajax({
        url: "src/PHP/mapLoader.php",
        type: "POST",
        data: { mapName: mapName },
        context: context
    }).done(callback);
}
function createMap(mapName, callback, context) {
    $.ajax({
        url: "src/PHP/createMap.php",
        type: "POST",
        data: { mapName: mapName },
        context: context
    }).done(callback);
}
function getMapList(callback) {
    $.ajax({
        url: "src/PHP/getMapList.php",
        type: "POST"
    }).done(callback).fail(function (response) {
        console.log(response);
    });
}
//# sourceMappingURL=maploader.js.map