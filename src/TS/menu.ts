/// <reference path="mapbuilder.ts"/>
/// <reference path="../../libs/ts/colorbox/jquery.colorbox.d.ts"/>
/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>

var mapBuilder: MapBuilder;

function init() {
    mapBuilder = new MapBuilder();
    $("#createNew").on("click touchstart", onClickNewMapButton);
    $("#loadExisting").on("click touchstart", onClickExistingMapButton);
    $("#saveButton").on("click touchstart", onSave);
}

function onClickNewMapButton() {
    loadMap("empty.json", mapBuilder.showMap, mapBuilder);
    hideMainMenu();
}

function onClickExistingMapButton() {
    getMapList(showMapList);
}

function onSaveWriter(e) {
    var mapName = $("#mapNameTextField");
    mapName.text(mapName.text()+String.fromCharCode(e.charCode));
}

function onSave() {
    $("#saveMenu").show();
    window.addEventListener("keypress", onSaveWriter);
    mapBuilder.keyHandler.removeListeners();
    $("#finalSaveButton").on("click touchstart", hideSaveMenu);
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
    hideMainMenu();
}

function hideMainMenu() {
    $("#mainMenu").hide();
    $("#saveButton").show();
}

function hideSaveMenu() {
    mapBuilder.keyHandler.addListeners();
    $("#finalSaveButton").off();
    $("#saveMenu").hide();
    mapBuilder.saveMap();
    $("#mapNameTextField").text("");
}

$(init);