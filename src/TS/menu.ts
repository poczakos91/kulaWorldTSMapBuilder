/// <reference path="mapbuilder.ts"/>
//TODO save button

var mapBuilder: MapBuilder;

function init() {
    mapBuilder = new MapBuilder();
    $("#createNew").on("click touchstart", onClickNewMapButton);
    $("#loadExisting").on("click touchstart", onClickExistingMapButton);
    $("saveButton").on("click touchstart", onSave);
}

function onClickNewMapButton() {
    loadMap("empty.json", mapBuilder.showMap, mapBuilder);
    hideMenu();
}

function onClickExistingMapButton() {
    getMapList(showMapList);
}

function onSave() {

}

function showMapList(data: string) {
    var mapList = data.split(',');
    var listHolder = $("#mapList");
    for(var i=0;i<mapList.length;i++) {
        var listItem = $("<div class='listItem' data='"+mapList[i]+"'>"+mapList[i]+"</div>");
        listItem.on("click touchstart", onClickListItem);
        listHolder.append(listItem);
    }
    listHolder.show();
}

function onClickListItem(e) {
    loadMap(e.currentTarget.innerText, mapBuilder.showMap, mapBuilder);
    hideMenu();
}

function hideMenu() {
    $("#menu").hide();
    $("#saveButton").show();
}

$(init);