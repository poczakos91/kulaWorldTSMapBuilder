/// <reference path="mapbuilder.ts"/>
/// <reference path="../../libs/ts/colorbox/jquery.colorbox.d.ts"/>
/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
var mapBuilder;
function init() {
    mapBuilder = new MapBuilder();
    $("#saveButton").on("click touchstart", onSave);
    $.ajax("res/templates/mainMenu.html").done(function (data) {
        console.log("Downloading 'mainMenu.html' DONE");
        //adding the html template to the body
        $('body').append(data);
    }).fail(function (response) {
        console.log("FAILED TO LOAD mainMenu.html TEMPLATE: ");
        console.log(response);
    });
}
function onSave() {
    $.ajax("res/templates/saveMenu.html").done(function (data) {
        console.log("Downloading 'saveMenu.html' DONE");
        //adding the html template to the body
        $('body').append(data);
    }).fail(function (response) {
        console.log("FAILED TO LOAD saveMenu.html TEMPLATE: ");
        console.log(response);
    });
}
$(init);
//# sourceMappingURL=menu.js.map