$.lightbox = function(htmlObject, params){
    htmlObject = htmlObject.get(0);
    var html = htmlObject.innerHTML;
    var outerDivParams = "";
    if(htmlObject.id !== 'undefined' && htmlObject.id != ''){
        outerDivParams += ' id="' + htmlObject.id  + '"';
    }
    if(htmlObject.className !== 'undefined' && htmlObject.className != ''){
        outerDivParams += ' class="' + htmlObject.className + '"';
    }
    if(htmlObject.style.cssText !== 'undefined' && htmlObject.style.cssText != ''){
        outerDivParams += ' style="' + htmlObject.style.cssText + '"';
    }
    var html = '<div' + outerDivParams + '">' + html + '</div>';

    var p = {};
    p.width = params.width;
    p.height = params.height;
    p.onClosed = params.onClose;
    p.scrolling = false;
    p.html = html;

    $.colorbox(p);
}
