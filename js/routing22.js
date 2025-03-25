/**
 * Created by Roope on 20.10.2020.
 */

//  window.PAGE = {FILTER: {}};
var clipBoard = new Clipboard('#copyClose');
var dataBase = "kaikki"

clipBoard.on('success', function (e) {
    $("#copyLink").css({'visibility': "hidden"});
});

var globalFuncs = {}

//   var wwidth = $(window).width();
/*
 (function() {

 'use strict';
 new Clipboard('#copyClose');
 // click events
 document.body.addEventListener('click', copy, true);

 // event handler
 function copy(e) {

 // find target element
 var
 t = e.target,
 c = t.dataset.copytarget,
 inp = (c ? document.querySelector(c) : null);

 // is element selectable?
 if (inp && inp.select) {

 // select text
 inp.select();

 try {
 // copy text
 document.execCommand('copy');
 inp.blur();

 // copied animation
 t.classList.add('copied');
 setTimeout(function() { t.classList.remove('copied'); }, 1500);
 $("#copyLink").css({'visibility': "hidden"});
 //    $("#copyLink").hide()
 }
 catch (err) {
 alert('kopioi linkki painamalla Ctrl/Cmd+C');
 }

 }

 }

 })();
 */
/*
 function shortenUrl(lurl, type) {
 var longUrl = lurl;
 var request = gapi.client.urlshortener.url.insert({
 'resource': {
 'longUrl': longUrl
 }
 });
 request.execute(function (response) {
 if (response.id != null) {
 if (type == "link") {
 if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
 return window.prompt(_('Kopioi tämä linkki'), response.id);
 } else {
 $("#copyLink").css({'visibility': "visible"});
 $("#website").val(response.id)
 }
 //     return window.prompt(_('Kopioi tämä linkki'), response.id);

 } else if (type == "mail") {
 return window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' + response.id);
 }
 }
 else {
 alert("Linkin lyhennys ei jostain syystä onnistunut. Voit poimia linkin myös suoraan osoitekentästä.");
 }

 });
 }
 function load() {
 gapi.client.setApiKey('AIzaSyAGXizBMrIfcsmFCPty5yvf7UOfF-lrsew');
 //   gapi.client.setApiKey('AIzaSyBrxxAg0gHIFlYaQ8eGLMmCfxt3GmMYGPI');
 gapi.client.load('urlshortener', 'v1', function () {
 });

 }

 window.onload = load;
 */
window.PAGE = {FILTER: {}, MAPVIEW: {}, TAGS:{}};
var pieces = location.hash.split('/');

doRouting({
    LANG: pieces[1] || null,
    VIS: pieces[2] || null,
    TERM: pieces[3] || null,
    TYPE: pieces[4] || null,
    VIEW: pieces[5] || null,
    COLOR: pieces[6] || null,
    SORT: pieces[7] || null,
    STACK: pieces[8] || null,
    FILTER: pieces[9] ? hashToFilter(pieces[9]) : {},
    MAPVIEW: pieces[10] ? hashToMap(pieces[10]) : {}/*,
     TAGS: pieces[8] ? hashToTags(pieces[8]) : {}*/
});


function filterToHash(filter) {
    var newFilter = {};
    newFilter.a = filter.TEEMA;
    newFilter.b = filter.AVUSTUSMUOTO;
    newFilter.c = filter.TOTEUTTAJA;
    newFilter.d = filter.SEKTORI;
    newFilter.e = filter.KUNTA;
    newFilter.f = filter.MAAKUNTA;
    newFilter.g = filter.VUOSI;
    //    newFilter.h = filter.KIMPPA;

    return Base64.encode(JSON.stringify(newFilter));
}

function mapToHash(filter) {
    var newFilter = {};
    newFilter.a = filter.UNIT;
    newFilter.b = filter.SUHDE;
    newFilter.c = filter.MAP;
    newFilter.d = filter.SELECTED;

    return Base64.encode(JSON.stringify(newFilter));
}

function tagsToHash(filter) {
    var newFilter = {};
    newFilter.a = filter.LAYOUT;
    newFilter.b = filter.PROJECT;

    return Base64.encode(JSON.stringify(newFilter));
}

function hashToFilter(hash) {
    //    console.log(hash)
    var oldFilter = JSON.parse(Base64.decode(hash)),
        filter = {};

    filter.TEEMA = oldFilter.a;
    filter.AVUSTUSMUOTO = oldFilter.b;
    filter.TOTEUTTAJA = oldFilter.c;
    filter.SEKTORI = oldFilter.d;
    filter.KUNTA = oldFilter.e;
    filter.MAAKUNTA = oldFilter.f;
    filter.VUOSI = oldFilter.g;
    //     filter.KIMPPA = oldFilter.h;

    return filter;
}

function hashToMap(hash) {
    //  console.log(hash)
    var oldFilter = JSON.parse(Base64.decode(hash)),
        filter = {};

    filter.UNIT = oldFilter.a;
    filter.SUHDE = oldFilter.b;
    filter.MAP = oldFilter.c;
    filter.SELECTED = oldFilter.d;

    return filter;
}

function hashToTags(hash) {
    //  console.log(hash)
    var oldFilter = JSON.parse(Base64.decode(hash)),
        filter = {};

    filter.LAYOUT = oldFilter.a;
    filter.PROJECT = oldFilter.b;

    return filter;
}

function doRouting(newLocation, doReload) {
//    getPrefLang()

    newLocation = newLocation || {
        //    VIS: 'projects' || 'new-projects',
        VIS: 'projects',
        TERM: '2021-2027',
        TYPE: 'bars',
        VIEW: 'Sektori',
    //    LANG: getPrefLang(),
        LANG: 'fi',
        COLOR: 'Avustusmuoto',
        SORT: true,
        STACK: true,
        FILTER: {
            TEEMA: [],
            AVUSTUSMUOTO: [],
            TOTEUTTAJA: [],
            SEKTORI: [],
            KUNTA: [],
            MAAKUNTA: [],
            VUOSI: []
        },
        MAPVIEW: {
            UNIT: "money",
            SUHDE: "norm",
            MAP: 'kunta',
            SELECTED: null
        }/*,
         TAGS: {
         LAYOUT: 'map',
         PROJECT: null
         }*/
    };

    doReload = doReload || false;

    //    console.log("doRouting", newLocation);

    window.PAGE = {
        //    VIS: window.PAGE.VIS || 'projects' || 'new-projects',
        VIS: window.PAGE.VIS || 'projects',
        TERM: window.PAGE.TERM || '2021-2027',
        TYPE: window.PAGE.TYPE || 'bars',
        VIEW: window.PAGE.VIEW || 'Sektori',
    //    LANG: window.PAGE.LANG || getPrefLang(),
        LANG: window.PAGE.LANG ||'fi',
        COLOR: window.PAGE.COLOR || 'Avustusmuoto',
        SORT: window.PAGE.SORT || true,
        STACK: window.PAGE.STACK || true,
        FILTER: {
            TEEMA: window.PAGE.FILTER.TEEMA || [],
            AVUSTUSMUOTO: window.PAGE.FILTER.AVUSTUSMUOTO || [],
            TOTEUTTAJA: window.PAGE.FILTER.TOTEUTTAJA || [],
            SEKTORI: window.PAGE.FILTER.SEKTORI || [],
            KUNTA: window.PAGE.FILTER.KUNTA || [],
            MAAKUNTA: window.PAGE.FILTER.MAAKUNTA || [],
            VUOSI: window.PAGE.FILTER.VUOSI || []

        },
        MAPVIEW: {
            UNIT: window.PAGE.MAPVIEW.UNIT || "money",
            SUHDE: window.PAGE.MAPVIEW.SUHDE || "norm",
            MAP: window.PAGE.MAPVIEW.MAP || 'kunta',
            SELECTED: window.PAGE.MAPVIEW.SELECTED || null
        }/*,
         TAGS: {
         LAYOUT: window.PAGE.TAGS.LAYOUT || "map",
         PROJECT: window.PAGE.TAGS.PROJECT || null
         }*/
    };

    newLocation.FILTER = newLocation.FILTER || {};
    newLocation.MAPVIEW = newLocation.MAPVIEW || {};
    //     newLocation.TAGS = newLocation.TAGS || {};

    newLocation = {
        VIS: newLocation.VIS || window.PAGE.VIS,
        TERM: newLocation.TERM || window.PAGE.TERM,
        TYPE: newLocation.TYPE || window.PAGE.TYPE,
        VIEW: newLocation.VIEW || window.PAGE.VIEW,
        LANG: newLocation.LANG || window.PAGE.LANG,
        COLOR: newLocation.COLOR || window.PAGE.COLOR,
        SORT: newLocation.SORT || window.PAGE.SORT,
        STACK: newLocation.STACK || window.PAGE.STACK,
        FILTER: {
            TEEMA: newLocation.FILTER.TEEMA || window.PAGE.FILTER.TEEMA,
            AVUSTUSMUOTO: newLocation.FILTER.AVUSTUSMUOTO || window.PAGE.FILTER.AVUSTUSMUOTO,
            TOTEUTTAJA: newLocation.FILTER.TOTEUTTAJA || window.PAGE.FILTER.TOTEUTTAJA,
            SEKTORI: newLocation.FILTER.SEKTORI || window.PAGE.FILTER.SEKTORI,
            KUNTA: newLocation.FILTER.KUNTA || window.PAGE.FILTER.KUNTA,
            MAAKUNTA: newLocation.FILTER.MAAKUNTA || window.PAGE.FILTER.MAAKUNTA,
            VUOSI: newLocation.FILTER.VUOSI || window.PAGE.FILTER.VUOSI

        },
        MAPVIEW: {
            UNIT: newLocation.MAPVIEW.UNIT || window.PAGE.MAPVIEW.UNIT,
            SUHDE: newLocation.MAPVIEW.SUHDE || window.PAGE.MAPVIEW.SUHDE,
            MAP: newLocation.MAPVIEW.MAP || window.PAGE.MAPVIEW.MAP,
            SELECTED: newLocation.MAPVIEW.SELECTED || window.PAGE.MAPVIEW.SELECTED
        }/*,
         TAGS: {
         LAYOUT: newLocation.TAGS.LAYOUT || window.PAGE.TAGS.LAYOUT,
         PROJECT: newLocation.TAGS.PROJECT || window.PAGE.TAGS.PROJECT,
         }*/
    };

    /*
     if (newLocation.VIS !== window.PAGE.VIS) {
     newLocation.FILTER = {
     TEEMA: [],
     TOTEUTTAJA: [],
     KUNTA: [],
     MAAKUNTA: [],
     AVI: [],
     VUOSI: []
     };

     newLocation.MAPVIEW = {
     TEEMA:  {"Kokoelmat": true, "Laitehankinnat": true, "Digitointi": true, "Henkilöstön osaaminen": true, "Lukemisen edistäminen": true, "Mediakasvatus": true, "Oppimisympäristö ja yhteisöllisyys": true, "Palvelujen kehittäminen": true, "Strateginen kehittäminen": true, "Tilasuunnittelu": true, "Verkkopalvelut": true},
     UNIT: "money",
     MAP: 'kunta',
     SELECTED: null
     };

     }
     */
    if (
        newLocation.LANG === 'fi' ||
        newLocation.LANG === 'en' ||
        newLocation.LANG === 'se'
    ) {
        window.PAGE.LANG = newLocation.LANG;
    }


        window.PAGE.VIS = newLocation.VIS;


    if (
        (
        newLocation.VIS === 'projects' ||
        newLocation.VIS === 'new-projects'
        ) &&
        (
        newLocation.TYPE === 'bars' ||
        newLocation.TYPE === 'circles' ||
        newLocation.TYPE === 'map' ||
        newLocation.TYPE === 'table'
        )
    ) {
        window.PAGE.TYPE = newLocation.TYPE;
    }

    if (
        newLocation.TERM === '2021-2027' ||
        newLocation.TERM === '2014-2020'
    ) {
        window.PAGE.TERM = newLocation.TERM;
    }


    if (
        newLocation.VIEW === 'total' ||
        (
        newLocation.VIS === 'projects' &&
        (
        newLocation.VIEW === 'ColSel_Teema' ||
        newLocation.VIEW === 'Avustusmuoto' ||
        newLocation.VIEW === 'ColSel_Maakunta' ||
        newLocation.VIEW === 'Kunta' ||
        newLocation.VIEW === 'Sektori' ||
        newLocation.VIEW === 'Kohderyhma' ||
        newLocation.VIEW === 'ColSel_Vuosi' ||
        newLocation.VIEW === 'OrganisationType' ||
        newLocation.VIEW === 'ColSel_Hanketyyppi'
        )
        ) ||

        (
        newLocation.VIS === 'new-projects' &&

        (
        newLocation.VIEW === 'ColSel_Teema' ||
        newLocation.VIEW === 'Avustusmuoto' ||
        newLocation.VIEW === 'ColSel_Maakunta' ||
        newLocation.VIEW === 'Kunta' ||
        newLocation.VIEW === 'Sektori' ||
        newLocation.VIEW === 'Kohderyhma' ||
        newLocation.VIEW === 'ColSel_Aluehallintovirasto' ||
        newLocation.VIEW === 'ColSel_Vuosi' ||
        newLocation.VIEW === 'OrganisationType' ||
        newLocation.VIEW === 'ColSel_Hanketyyppi'
        )
        )
    ) {
        window.PAGE.VIEW = newLocation.VIEW;
    }

    if (
        (
        newLocation.VIS === 'good-practices' &&
        (
        newLocation.COLOR === 'ColSel_Teema' ||
        newLocation.COLOR === 'ColSel_Maakunta' ||
        newLocation.COLOR === 'OrganisationType' ||
        newLocation.COLOR === 'ColSel_Vuosi'
        )
        ) ||
        (
        newLocation.VIS == 'projects' &&
        (
        newLocation.COLOR === 'ColSel_Teema' ||
        newLocation.COLOR === 'Avustusmuoto' ||
        newLocation.COLOR === 'ColSel_Maakunta' ||
        newLocation.COLOR === 'Sektori' ||
        newLocation.COLOR === 'ColSel_Aluehallintovirasto' ||
        newLocation.COLOR === 'ColSel_Vuosi' ||
        newLocation.COLOR === 'OrganisationType' ||
        newLocation.COLOR === 'ColSel_Hanketyyppi' ||
        newLocation.COLOR === 'ColSel_Kieli' ||
         newLocation.COLOR === 'Avustustyyppi'
        )
        )
    ) {
        window.PAGE.COLOR = newLocation.COLOR;
    }

    if (newLocation.FILTER) {
        window.PAGE.FILTER = newLocation.FILTER;
    }

    if (newLocation.MAPVIEW) {
        window.PAGE.MAPVIEW = newLocation.MAPVIEW;
    }
    if (newLocation.TAGS) {
        window.PAGE.TAGS = newLocation.TAGS;
    }
    if (newLocation.SORT) {
        window.PAGE.SORT = newLocation.SORT;
    }
    if (newLocation.STACK) {
        window.PAGE.STACK = newLocation.STACK;
    }



    var newHash = '#!/' +
        window.PAGE.LANG + '/' +
        window.PAGE.VIS + '/' +
        window.PAGE.TERM + '/' +
        window.PAGE.TYPE + '/' +
        window.PAGE.VIEW + '/' +
        window.PAGE.COLOR + '/' +
        window.PAGE.SORT + '/' +
        window.PAGE.STACK + '/' +
        filterToHash(window.PAGE.FILTER) + '/' +
        mapToHash(window.PAGE.MAPVIEW);/*+ '/' +
     tagsToHash(window.PAGE.TAGS);*/
//alert(1," ",newHash)
    if (window.location.hash !== newHash) {
        window.location.hash = newHash;
        //          alert.log(2," ",newHash)
//cookies

        //          console.log("cookie",Cookies.get('lang'))

        if(window.PAGE.LANG == "se" || window.PAGE.LANG == "sv") {
            //      window.top.location.href = "https://aviavustukset.fi/index.php/sv/understodvisualisering/"+newHash;
        //            window.top.location.href = "https://aviavustukset.fi/sv/understodvisualisering/"+newHash;
        } else {
            //    window.top.location.href = "https://aviavustukset.fi/index.php/visualisointi/"+newHash;
        //    window.top.location.href = "https://aviavustukset.fi/visualisointi/"+newHash;
            //      window.top.location.href = "https://beta.avi.fi/visualisointi/"+newHash;
        }

        if (doReload) {
            //         alert("reloading")
            window.location.reload();
        }
    }

}


if (window.PAGE.LANG === 'fi') {

    if(window.PAGE.TERM === '2021-2027')
    $('#erasmuslogo').attr("src", "css/images/Erasmus2127_FI.png");
    else
        $('#erasmuslogo').attr("src", "css/images/erasmus.jpg");
    //
    //  } else if (window.PAGE.LANG === 'en') {
    //    document.title = 'Finnish Public Library Project Register';
    //  document.write('<script src="i18n/en.js"><\/script>');
    document.write('<script src="i18n/erasmus_English.js"><\/script>');
} else if (window.PAGE.LANG === 'se') {
    if(window.PAGE.TERM === '2021-2027')
        $('#erasmuslogo').attr("src", "css/images/Erasmus2127_SV.png");
    else
        $('#erasmuslogo').attr("src", "css/images/erasmus.jpg");
//    alert(navigator.language)
//    document.documentElement.lang = 'fi-SV';
    document.title = 'Erasmus+ -understödvisualisering';
    document.write('<script src="i18n/se.js"><\/script>');
} else if (window.PAGE.LANG === 'en') {
    if(window.PAGE.TERM === '2021-2027')
        $('#erasmuslogo').attr("src", "css/images/Erasmus2127_EN.png");
    else
        $('#erasmuslogo').attr("src", "css/images/erasmus.jpg");
    document.title = 'Erasmus+ -project visualisation';
    document.write('<script src="i18n/en.js"><\/script>');

}


function setNull(lang, doReload) {

    doRouting({
        //    VIS: 'projects' || 'new-projects',
        //    VIS: 'projects',
        //        TYPE: 'bars',
        VIEW: 'total',
        //    LANG: getPrefLang(),
        COLOR: 'ColSel_Teema',
        SORT: true,
        STACK: true,
        FILTER: {
            TEEMA: [],
            TOTEUTTAJA: [],
            SEKTORI: [],
            KUNTA: [],
            MAAKUNTA: [],
            VUOSI: []
        },
        MAPVIEW: {
            UNIT: "money",
            SUHDE: "norm",
            MAP: 'kunta',
            SELECTED: "empty"
        },
        TAGS: {
            LAYOUT: 'map',
            PROJECT: null
        }
    }, true);
    //  }
    //   return false;
    //       if (window.PAGE.TYPE === "map")
    //       $('.arrow_box_abs').show();

}

var accessFont = false;

