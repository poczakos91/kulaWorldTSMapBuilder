/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="jquery.colorbox.d.ts"/>
//Image gallery
var gallery = $('a.gallery').colorbox({ rel: 'gal' });
// Ajax usage
var jQueryElement = jQuery("a#login").colorbox();
// Programmatic use
var result1 = jQuery.colorbox({ href: "thankyou.html" });
var result2 = jQuery.colorbox({ html: "<h1>Welcome</h1>" });
var result3 = $("a.gallery").colorbox({
    rel: 'gal',
    title: function () {
        var url = $(this).attr('href');
        return '<a href="' + url + '" target="_blank">Open In New Window</a>';
    }
});
// Helpers
jQuery.colorbox.close();
jQuery.colorbox.next();
jQuery.colorbox.prev();
var result4 = jQuery.colorbox.element();
jQuery.colorbox.remove();
jQuery.colorbox.resize();
jQuery.colorbox.resize({ height: 500, width: 300 });
//# sourceMappingURL=jquery.colorbox-tests.js.map