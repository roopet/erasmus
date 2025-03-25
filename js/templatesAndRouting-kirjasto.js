/**
 * Created by Roope on 20.10.2020.
 */

//  window.PAGE = {FILTER: {}};
var clipBoard = new Clipboard('#copyClose');
var dataBase = "kirjasto"

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
    TYPE: pieces[3] || null,
    VIEW: pieces[4] || null,
    COLOR: pieces[5] || null,
    SORT: pieces[6] || null,
    FILTER: pieces[7] ? hashToFilter(pieces[7]) : {},
    MAPVIEW: pieces[8] ? hashToMap(pieces[8]) : {}/*,
     TAGS: pieces[8] ? hashToTags(pieces[8]) : {}*/
});


function filterToHash(filter) {
    var newFilter = {};
    newFilter.a = filter.TEEMA;
    newFilter.b = filter.TOTEUTTAJA;
    newFilter.c = filter.KUNTA;
    newFilter.d = filter.MAAKUNTA;
    newFilter.e = filter.AVI;
    newFilter.f = filter.VUOSI;
    newFilter.g = filter.ERITYIS;
    newFilter.h = filter.RAHOITTAJA;
    //    newFilter.h = filter.KIMPPA;

    return Base64.encode(JSON.stringify(newFilter));
}

function mapToHash(filter) {
    var newFilter = {};
    newFilter.a = filter.TEEMA;
    newFilter.b = filter.UNIT;
    newFilter.c = filter.SUHDE;
    newFilter.d = filter.MAP;
    newFilter.e = filter.SELECTED;

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
    filter.TOTEUTTAJA = oldFilter.b;
    filter.KUNTA = oldFilter.c;
    filter.MAAKUNTA = oldFilter.d;
    filter.AVI = oldFilter.e;
    filter.VUOSI = oldFilter.f;
    filter.ERITYIS = oldFilter.g;
    filter.RAHOITTAJA = oldFilter.h;
    //     filter.KIMPPA = oldFilter.h;

    return filter;
}

function hashToMap(hash) {
    //  console.log(hash)
    var oldFilter = JSON.parse(Base64.decode(hash)),
        filter = {};

    filter.TEEMA = oldFilter.a;
    filter.UNIT = oldFilter.b;
    filter.SUHDE = oldFilter.c;
    filter.MAP = oldFilter.d;
    filter.SELECTED = oldFilter.e;

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

    var path = window.location.pathname;
    var page = path.split("/").pop();
 //   alert( page );

    function getPrefLang() {
        var lang = Cookies.get('lang');

        if (lang === undefined) {
            lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
        }

        if (lang === undefined || lang === null) {
            return 'fi';
        }

        lang = lang.substr(0, 2);

        if (
            //        lang === 'en' ||
        lang === 'fi' ||
        lang === 'se'
        ) {
            return lang;
        }

   //     return 'fi';
    }

    newLocation = newLocation || {
        //    VIS: 'projects' || 'new-projects',
        VIS: 'projects',
        TYPE: 'bars',
        VIEW: 'ColSel_Teema',
        LANG: getPrefLang(),
        COLOR: 'ColSel_Teema',
        SORT: true,
        FILTER: {
            TEEMA: [],
            TOTEUTTAJA: [],
            KUNTA: [],
            MAAKUNTA: [],
            AVI: [],
            VUOSI: ["2020"],
            ERITYIS: []
        },
        MAPVIEW: {
            //    TEEMA:  {"Kokoelmat": true, "Laitehankinnat": true, "Digitointi": true, "Henkilöstön osaaminen": true, "Lukemisen edistäminen": true, "Mediakasvatus": true, "Oppimisympäristö ja yhteisöllisyys": true, "Palvelujen kehittäminen": true, "Strateginen kehittäminen": true, "Tilasuunnittelu": true, "Verkkopalvelut": true},
            TEEMA:  null,
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
        TYPE: window.PAGE.TYPE || 'bars',
        VIEW: window.PAGE.VIEW || 'ColSel_Teema',
        LANG: window.PAGE.LANG || getPrefLang(),
        COLOR: window.PAGE.COLOR || 'ColSel_Teema',
        SORT: window.PAGE.SORT || true,
        FILTER: {
            TEEMA: window.PAGE.FILTER.TEEMA || [],
            TOTEUTTAJA: window.PAGE.FILTER.TOTEUTTAJA || [],
            KUNTA: window.PAGE.FILTER.KUNTA || [],
            MAAKUNTA: window.PAGE.FILTER.MAAKUNTA || [],
            AVI: window.PAGE.FILTER.AVI || [],
            RAHOITTAJA: window.PAGE.FILTER.RAHOITTAJA || [],
            VUOSI: window.PAGE.FILTER.VUOSI || ["2020"],
            ERITYIS: window.PAGE.FILTER.ERITYIS || []/*,
             KIMPPA: window.PAGE.FILTER.KIMPPA || []*/
        },
        MAPVIEW: {
            //   TEEMA: window.PAGE.MAPVIEW.TEEMA || {"Kokoelmat": true, "Laitehankinnat": true, "Digitointi": true, "Henkilöstön osaaminen": true, "Lukemisen edistäminen": true, "Mediakasvatus": true, "Oppimisympäristö ja yhteisöllisyys": true, "Palvelujen kehittäminen": true, "Strateginen kehittäminen": true, "Tilasuunnittelu": true, "Verkkopalvelut": true},
            TEEMA: window.PAGE.MAPVIEW.TEEMA || null,
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
        TYPE: newLocation.TYPE || window.PAGE.TYPE,
        VIEW: newLocation.VIEW || window.PAGE.VIEW,
        LANG: newLocation.LANG || window.PAGE.LANG,
        COLOR: newLocation.COLOR || window.PAGE.COLOR,
        SORT: newLocation.SORT || window.PAGE.SORT,
        FILTER: {
            TEEMA: newLocation.FILTER.TEEMA || window.PAGE.FILTER.TEEMA,
            TOTEUTTAJA: newLocation.FILTER.TOTEUTTAJA || window.PAGE.FILTER.TOTEUTTAJA,
            KUNTA: newLocation.FILTER.KUNTA || window.PAGE.FILTER.KUNTA,
            MAAKUNTA: newLocation.FILTER.MAAKUNTA || window.PAGE.FILTER.MAAKUNTA,
            AVI: newLocation.FILTER.AVI || window.PAGE.FILTER.AVI,
            RAHOITTAJA: newLocation.FILTER.RAHOITTAJA || window.PAGE.FILTER.RAHOITTAJA,
            VUOSI: newLocation.FILTER.VUOSI || window.PAGE.FILTER.VUOSI,
            ERITYIS: newLocation.FILTER.ERITYIS || window.PAGE.FILTER.ERITYIS/*,
             KIMPPA: newLocation.FILTER.KIMPPA || window.PAGE.FILTER.KIMPPA*/
        },
        MAPVIEW: {
            TEEMA: newLocation.MAPVIEW.TEEMA || window.PAGE.MAPVIEW.TEEMA,
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

    if (
        newLocation.VIS === 'good-practices' ||
        newLocation.VIS === 'not-funded' ||
        newLocation.VIS === 'projects' ||
        newLocation.VIS === 'new-projects'
    ) {
        window.PAGE.VIS = newLocation.VIS;
    }

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
        newLocation.VIEW === 'total' ||
        (
        newLocation.VIS === 'projects' &&
        (
        newLocation.VIEW === 'ColSel_Teema' ||
        newLocation.VIEW === 'ColSel_Maakunta' ||
        newLocation.VIEW === 'Kunta' ||
        newLocation.VIEW === 'ColSel_Vaikutusalue' ||
        newLocation.VIEW === 'Kohderyhma' ||
        newLocation.VIEW === 'ColSel_Aluehallintovirasto' ||
        newLocation.VIEW === 'ColSel_Vuosi' ||
        newLocation.VIEW === 'ColSel_Hanketyyppi'
        )
        ) ||

        (
        newLocation.VIS === 'new-projects' &&

        (
        newLocation.VIEW === 'ColSel_Teema' ||
        newLocation.VIEW === 'ColSel_Maakunta' ||
        newLocation.VIEW === 'Kunta' ||
        newLocation.VIEW === 'ColSel_Vaikutusalue' ||
        newLocation.VIEW === 'Kohderyhma' ||
        newLocation.VIEW === 'ColSel_Aluehallintovirasto' ||
        newLocation.VIEW === 'ColSel_Vuosi' ||
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
        newLocation.COLOR === 'ColSel_Vuosi'
        )
        ) ||
        (
        newLocation.VIS == 'projects' &&
        (
        newLocation.COLOR === 'ColSel_Teema' ||
        newLocation.COLOR === 'ColSel_Maakunta' ||
        newLocation.COLOR === 'ColSel_Vaikutusalue' ||
        newLocation.COLOR === 'ColSel_Aluehallintovirasto' ||
        newLocation.COLOR === 'ColSel_Vuosi' ||
        newLocation.COLOR === 'ColSel_Hanketyyppi' ||
        newLocation.COLOR === 'ColSel_Kieli' /*||
         newLocation.COLOR === 'Kimppa'*/
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



    var newHash = '#!/' +
        window.PAGE.LANG + '/' +
        window.PAGE.VIS + '/' +
        window.PAGE.TYPE + '/' +
        window.PAGE.VIEW + '/' +
        window.PAGE.COLOR + '/' +
        window.PAGE.SORT + '/' +
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
            //        window.top.location.href = "https://aviavustukset.fi/sv/understodvisualisering/"+newHash;
        } else {
            //    window.top.location.href = "https://aviavustukset.fi/index.php/visualisointi/"+newHash;
            window.top.location.href = "https://aviavustukset.fi/kirjasto-visualisointi/"+newHash;
            //      window.top.location.href = "https://beta.avi.fi/visualisointi/"+newHash;
        }

        if (doReload) {
            //         alert("reloading")
            window.location.reload();
        }
    }

}

if (window.PAGE.LANG === 'fi') {
    //
    //  } else if (window.PAGE.LANG === 'en') {
    //    document.title = 'Finnish Public Library Project Register';
    //  document.write('<script src="i18n/en.js"><\/script>');

} else if (window.PAGE.LANG === 'se') {
    document.title = 'Understödvisualisering';
    document.write('<script src="i18n/se.js"><\/script>');

}

    // <editor-fold desc="template variables">
function injectTemplate(templateId, target, context) {
    var source = $(templateId).html(),
        template = Handlebars.compile(source),
        container = $(target),
        html = template(context);

    container.prepend(html);
    return container;
}

// nav
var buttons = {
    title: _('Avustusten luokittelu'),
    subheader: _('Tarkastele'),
    buttons: []
};

if (window.PAGE.TYPE === 'circles') {
    buttons.buttons = [
        {
            name: 'ColSel_Teema',
            label: _('Teemoittain')
        },
        {
            name: 'ColSel_Vuosi',
            label: _('Vuosittain')
        },
        {
            name: 'Toteuttaja',
            label: _('Toteuttajittain')
        },
        {
            name: 'ColSel_Maakunta',
            label: _('Maakunnittain')
        },
        {
            name: 'Kunta',
            label: _('Kunnittain')
        },
        {
            name: 'ColSel_Vaikutusalue',
            label: _('Vaikutusalueittain')
        },
        {
            name: 'ColSel_Aluehallintovirasto',
            label: _('Avi-alueittain')
        },/*
         {
         name: 'ColSel_Vuosi',
         label: _('Vuosittain')
         },
        {
            name: 'ColSel_Hanketyyppi',
            label: _('Toimialoittain')
        },*/
        {
            name: 'amount',
            label: _('Koon mukaan')
        }
    ];

} else if (window.PAGE.TYPE === 'bars') {
    buttons.buttons = [
        {
            name: 'ColSel_Teema',
            label: _('Teemoittain')
        },
        {
            name: 'ColSel_Vuosi',
            label: _('Vuosittain')
        },
        {
            name: 'ColSel_Maakunta',
            label: _('Maakunnittain')
        },
        {
            name: 'Kunta',
            label: _('Kunnittain')
        },
        {
            name: 'ColSel_Vaikutusalue',
            label: _('Vaikutusalueittain')
        },
        {
            name: 'ColSel_Aluehallintovirasto',
            label: _('Avi-alueittain')
        }
/*,
        {
            name: 'ColSel_Hanketyyppi',
            label: _('Toimialoittain')
        }*/

    ];
} else if (window.PAGE.TYPE === 'table') {
    buttons.buttons = [
        {
            name: 'ColSel_Teema',
            label: _('Teemoittain')
        },
        {
            name: 'ColSel_Maakunta',
            label: _('Maakunnittain')
        },
        {
            name: 'Kunta',
            label: _('Kunnittain')
        },
        {
            name: 'ColSel_Aluehallintovirasto',
            label: _('Avi-alueittain')
        },
        {
            name: 'ColSel_Vuosi',
            label: _('Vuosittain')
        }


    ];
}




// header filter
var groups = {
    title: _('Kohderyhmittäin'),
    placeholder: _('Tarkastele kohderyhmittäin'),
    groups: [
        {
            name: '',
            label: ''
        },
        {
            name: 'erityisryhmät',
            label: _('Erityisryhmät')
        },
        {
            name: 'ikääntyneet',
            label: _('Ikääntyneet')
        },
        {
            name: 'kirjaston asiakkaat',
            label: _('Kirjaston asiakkaat')
        },
        {
            name: 'kirjaston ei-käyttäjät',
            label: _('Kirjaston ei-käyttäjät')
        },
        {
            name: 'kirjaston henki',
            label: _('Kirjaston henkilökunta')
        },
        {
            name: 'lapsiperheet',
            label: _('Lapsiperheet')
        },
        {
            name: 'alle 13 v',
            label: _('Lapset (alle 13 v.)')
        },
        {
            name: '13-19',
            label: _('Nuoret (13-19 v.)')
        },
        {
            name: '19.-29',
            label: _('Nuoret aikuiset (19-29 v.)')
        },
        {
            name: 'ammattiryhm',
            label: _('Tietty ammattiryhmä (esim. opettajat)')
        },
        {
            name: 'Työikäinen väestö',
            label: _('Työikäinen väestö')
        },
        {
            name: 'Maahanmuuttajat',
            label: _('Maahanmuuttajat')
        },
        {
            name: 'Työttömät',
            label: _('Työttömät')
        },
        {
            name: 'Sidosryhm',
            label: _('Sidosryhmät')
        }
    ]
};

//   injectTemplate('#groups-template', '#multiple', groups);

// help sidebar
var help = {
    blocks: [],
    title: _('Tutustu myös muihin visualisointeihin'),
    feedback: _('Lähetä palautetta'),
    footer: [
        _('Visualisointi ei valitettavasti toimi vanhemmilla internet-selaimilla (esim. IE8 ja sitä vanhemmat).')
    ],
    leftTitle: _('Yhteistyössä'),
    rightTitle: _('Tekninen toteutus')
};

if (window.PAGE.VIS === 'projects') {
    help.blocks = [
        {
            title: _('Aluehallintoviraston jakamien avustusten visualisointi'),
            rows: [
                _('Tervetuloa Avustusvisualisointiin. Visualisoinnin avulla voit tutustua aluehallintovirastojen jakamiin kirjastotoiminnan kehittämishankkeiden avustuksiin.'),
                _('Voit tutustua avustuksiin ja hankkeisiin neljästä eri näkökulmasta: kaavioina, palloina, kartalla tai taulukossa. Kaaviomuoto antaa parhaan yleiskuvan eri kokonaisuuksien suuruusluokasta. Pallo-visualisoinnissa pääsee paremmin tarkastelemaan itse hankkeita. Kartta taasen näyttää kuinka avustukset ovat jakaantuneet maantieteellisesti.')
      //          _('HUOM! Visualisointi koskee tällä hetkellä vain vuodesta 2019 lähtien myönnettyjä avustuksia. Tiedot päivittyvät pitkin vuotta avustusmuodoittain. Avustusmuodot eivät myöskään vastaa tällä hetkellä haettavina olevia avustuskokonaisuuksia, sillä vuosittain haettavat avustusmuodot vaihtelevat.')
            ]
        }
    ];
    if (window.PAGE.TYPE === 'circles') {
        help.blocks.push({
            title: _('Kuinka visualisointi toimii'),
            rows: [
                _('Yksi pallo edustaa yhtä avustusta. Pallon koko kertoo, kuinka paljon tukea avustukselle on myönnetty. Viemällä hiirenosoittimen pallon päälle saa hankkeesta lisätietoa. Palloa klikkaamalla saa hankkeesta vielä lisätietoa.'),
                _('Avustusten jakaumaa voi muuttaa visualisoinnin yläpalkin "tarkastele"-valikoista. Väritystä voi muuttaa vasemmassa sivupalkissa olevasta valikosta. Suodattimista on mahdollista rajata näytettävien avustusten määrää. Etsi-toiminnolla voi etsiä avustustusta nimeltä.'),
                _('Sivun ylälaidan painikkeista voi vaihtaa visualisoinnin muotoa kaavion, pallojen ja kartan välillä. Yksittäisiin avustuksiin pääset pallo- ja karttavisualisoinnin kautta.')
                //   _('Kaikki visualisointinäkymään tehdyt muutokset tallentuvat osoitekenttään. Sivun ylälaidan oikeassa reunassa on pudotusvalikko, josta voi valita sosiaalisen median, jossa jakaa visualisointinäkymä. Osoitekentän linkin voi myös kopioida itse ja lähettää eteenpäin, mutta sen saa myös lyhennetyssä muodossa, jos valitsee pudotusvalikon ensimmäisen vaihtoehdon.')
            ]
        });
    } else if (window.PAGE.TYPE === 'bars') {
        help.blocks.push({
            title: _('Kuinka visualisointi toimii'),
            rows: [
                //      _('Pylväskuviossa näytettävän jakauman voi valita yläpalkin "tarkastele"-valikoista. Palkkien väritystä voi muuttaa vasemmassa sivupalkissa olevasta valikosta. Suodattimista on mahdollista rajata kuvioon laskettavien hankkeiden määrää.'),
                _('Kaaviopohjaisen visualisointitoteutuksen perustana ovat avustusten saamat avustussummat yhteensä. Visualisoinnin yläpalkin tarkastele-painikkeista voi vaihtaa pylväskaavion y-akselin luokittelua.'),
                //     _('Voit myös vaihtaa palkkien asettelua sivupalkin painikkeista "pinottu" ja "rinnakkain". Palkkikaavion näkymää voi myös suurentaa "maalaamalla" palkkeja pystysuoraan.')
                _('Väriselitteen luokkia voi vaihtaa sivun vasemmalla laidalla olevasta Väriselitteen luokittelu -valikosta. Samassa yhteydessä on Suodattimet -valikko, jonka kautta voit rajata avustussummia vuoden, teeman, alueen ja kirjaston mukaan.  Voit myös vaihtaa kaavioiden muotoa sivupalkin painikkeista "Pinottu" ja "Rinnakkain". Kaavion näkymää voit suurentaa "maalaamalla" pylväitä pystysuoraan.'),
                _('Sivun ylälaidan painikkeista voi vaihtaa visualisoinnin muotoa kaavion, pallojen ja kartan välillä. Yksittäisiin avustuksiin pääset pallo- ja karttavisualisoinnin kautta.')
                //        _('Kaikki visualisointinäkymään tehdyt muutokset tallentuvat osoitekenttään. Sivun ylälaidan oikeassa reunassa on pudotusvalikko, josta voi valita sosiaalisen median, jossa jakaa visualisointinäkymä. Osoitekentän linkin voi myös kopioida itse ja lähettää eteenpäin, mutta sen saa myös lyhennetyssä muodossa, jos valitsee pudotusvalikon ensimmäisen vaihtoehdon.')
            ]
        });
    } else if (window.PAGE.TYPE === 'map') {
        help.blocks.push({
            title: _('Kuinka visualisointi toimii'),
            rows: [
                //      _('Pylväskuviossa näytettävän jakauman voi valita yläpalkin "tarkastele"-valikoista. Palkkien väritystä voi muuttaa vasemmassa sivupalkissa olevasta valikosta. Suodattimista on mahdollista rajata kuvioon laskettavien hankkeiden määrää.'),
                _('Karttapohjaisen visualisoinnin avulla voi tutkia miten avustukset ovat jakaantuneet maantieteellisesti. Oletuksena kartta näyttää kuinka paljon avustuksia euroina on myönnetty kunnittain. Jos kartan yksiköksi on valittuna "Kpl", toimii sama logiikka silloin kappaleina. Jos karttapohjaksi on valittuna maakunnat tai AVI-alueet, toimii kartan logiikka kyseisten alueiden mukaisesti.'),
                //     _('Voit myös vaihtaa palkkien asettelua sivupalkin painikkeista "pinottu" ja "rinnakkain". Palkkikaavion näkymää voi myös suurentaa "maalaamalla" palkkeja pystysuoraan.')
                _('Viemällä hiirenosoittimen kunnan ylle, saa lisätietoa eri avustusmuotoihin myönnettyjen avustusten määrästä kunnassa. Klikkaamalla kuntaa, avautuu oikealle lista kunnan avustuksista. Jos tuosta listasta klikkaa hankkeen nimeä, avautuu hankkeen perustiedot-infolaatikko.'),
                _('Sivun ylälaidan painikkeista voi vaihtaa visualisoinnin muotoa kaavion, pallojen ja kartan välillä. Yksittäisiin avustuksiin pääset pallo- ja karttavisualisoinnin kautta.')
                //         _('Kaikki visualisointinäkymään tehdyt muutokset tallentuvat osoitekenttään. Sivun ylälaidan oikeassa reunassa on pudotusvalikko, josta voi valita sosiaalisen median, jossa jakaa visualisointinäkymä. Osoitekentän linkin voi myös kopioida itse ja lähettää eteenpäin, mutta sen saa myös lyhennetyssä muodossa, jos valitsee pudotusvalikon ensimmäisen vaihtoehdon.')
            ]
        });
    }
} else if (window.PAGE.VIS === 'new-projects') {
    help.blocks = [
        {
            title: _('Hankerekisterin visualisointi - Uudet hakemukset'),
            rows: [
                _('Tervetuloa yleisten kirjastojen hankerekisterin visualisointiin. Tämän visualisoinnin avulla voit tutustua vuoden 2016 hakukierroksella jätettyihin kehittämishankeavustuksiin.')
            ]
        }
    ];
    if (window.PAGE.TYPE === 'circles') {
        help.blocks.push({
            title: _('Kuinka visualisointi toimii'),
            rows: [
                _('Yksi pallo edustaa yhtä hanketta. Pallon koko kertoo, kuinka paljon avustusta hankkeelle on haettu. Viemällä hiirenosoittimen pallon päälle saa hankkeesta lisätietoa. Palloa klikkaamalla pääsee hankkeen nettisivuille.'),
                _('Hankkeiden jakaumaa voi muuttaa visualisoinnin yläpalkin "tarkastele"-valikoista. Väritystä voi muuttaa vasemmassa sivupalkissa olevasta valikosta. Suodattimista on mahdollista rajata näytettävien hankkeiden määrää. Myös hankkeiden kohderyhmiä voi tarkastella sivupalkissa olevasta pudotusvalikosta. Etsi-toiminnolla voi etsiä hanketta nimeltä.'),
                _('Sivun ylälaidan painikkeista voi vaihtaa visualisoinnin muotoa kaavion, pallojen ja kartan välillä. Myös näytettävää tietokantaa on mahdollista vaihtaa. Yksittäisiin hankkeisiin pääset pallo- ja karttavisualisoinnin tai <a href="http://hankkeet.kirjastot.fi/" target="_blank">Hankerekisterin tietokannan</a> kautta.'),

                _('Kaikki visualisointinäkymään tehdyt muutokset tallentuvat osoitekenttään. Sivun ylälaidan oikeassa reunassa on pudotusvalikko, josta voi valita sosiaalisen median, jossa jakaa visualisointinäkymä. Osoitekentän linkin voi myös kopioida itse ja lähettää eteenpäin, mutta sen saa myös lyhennetyssä muodossa, jos valitsee pudotusvalikon ensimmäisen vaihtoehdon.')
            ]
        });
    } else if (window.PAGE.TYPE === 'bars') {
        help.blocks.push({
            title: _('Kuinka visualisointi toimii'),
            rows: [
                _('Kaaviopohjaisen visualisointitoteutuksen perustana ovat hankkeiden hakemat avustussummat yhteensä. Visualisoinnin yläpalkin "tarkastele"-valikoista voi vaihtaa pylväskaavion y-akselin luokittelua. Oletusarvoisesti graafi näyttää kaikki luokat "Yhteensä".'),
                _('Väriselitteen luokkia voi vaihtaa sivun vasemmalla laidalla olevasta Väriselitteen luokittelu -valikosta. Samassa yhteydessä on Suodattimet -valikko, jonka kautta voit rajata haettuja summia vuoden, teeman, alueen ja kirjaston mukaan. Voit myös vaihtaa kaavioiden muotoa sivupalkin painikkeista "Pinottu" ja "Rinnakkain". Kaavion näkymää voit suurentaa "maalaamalla" pylväitä pystysuoraan.'),
                _('Sivun ylälaidan painikkeista voi vaihtaa visualisoinnin muotoa kaavion, pallojen ja kartan välillä. Myös näytettävää tietokantaa on mahdollista vaihtaa. Yksittäisiin hankkeisiin pääset pallo- ja karttavisualisoinnin tai <a href="http://hankkeet.kirjastot.fi/" target="_blank">Hankerekisterin tietokannan</a> kautta.'),
                _('Kaikki visualisointinäkymään tehdyt muutokset tallentuvat osoitekenttään. Sivun ylälaidan oikeassa reunassa on pudotusvalikko, josta voi valita sosiaalisen median, jossa jakaa visualisointinäkymä. Osoitekentän linkin voi myös kopioida itse ja lähettää eteenpäin, mutta sen saa myös lyhennetyssä muodossa, jos valitsee pudotusvalikon ensimmäisen vaihtoehdon.')
            ]
        });
    } else if (window.PAGE.TYPE === 'map') {
        help.blocks.push({
            title: _('Kuinka visualisointi toimii'),
            rows: [
                //      _('Pylväskuviossa näytettävän jakauman voi valita yläpalkin "tarkastele"-valikoista. Palkkien väritystä voi muuttaa vasemmassa sivupalkissa olevasta valikosta. Suodattimista on mahdollista rajata kuvioon laskettavien hankkeiden määrää.'),
                _('Karttapohjaisen visualisoinnin avulla voi tutkia millaisiin hankkeisiin on haettu rahoitusta eri puolilla Suomea. Hankkeet on luokiteltu niiden teemojen mukaan. Kartta toimii siten, että kun vasemmalla olevasta teema-valikosta on valittuna jokin teema, näyttää kartta missä kunnissa ja kuinka paljon kyseisen teeman hankkeet ovat hakeneet rahoitusta. Jos valittuna on kaksi tai useampi teema, värjätyy kartta sen mukaan, mihin teemaan on kussakin kunnassa haettu eniten rahoitusta. Mikäli samassa kunnassa useammalle teemalle on haettu saman verran rahoitusta, näkyy se kartalla viivoitettuna. Jos kartan yksiköksi on valittuna "Kpl", toimii sama logiikka silloin kappaleina.'),
                //     _('Voit myös vaihtaa palkkien asettelua sivupalkin painikkeista "pinottu" ja "rinnakkain". Palkkikaavion näkymää voi myös suurentaa "maalaamalla" palkkeja pystysuoraan.')
                _('Viemällä hiirenosoittimen kunnan ylle, saa lisätietoa eri teemoihin haetun hankerahoituksen määrästä kunnassa. Klikkaamalla kuntaa, avautuu oikealle lista kunnan hankkeista. Jos tuosta listasta klikkaa hankkeen nimeä, avautuu hankkeen perustiedot-infolaatikko. Kartan hankkeita voi myös rajata vuoden mukaan Suodattimet-pudotusvalikosta.'),
                _('Sivun ylälaidan painikkeista voi vaihtaa visualisoinnin muotoa kaavion, pallojen ja kartan välillä. Myös näytettävää tietokantaa on mahdollista vaihtaa. Yksittäisiin hankkeisiin pääset pallo- ja karttavisualisoinnin tai <a href="http://hankkeet.kirjastot.fi/" target="_blank">Hankerekisterin tietokannan</a> kautta.'),
                _('Kaikki visualisointinäkymään tehdyt muutokset tallentuvat osoitekenttään. Sivun ylälaidan oikeassa reunassa on pudotusvalikko, josta voi valita sosiaalisen median, jossa jakaa visualisointinäkymä. Osoitekentän linkin voi myös kopioida itse ja lähettää eteenpäin, mutta sen saa myös lyhennetyssä muodossa, jos valitsee pudotusvalikon ensimmäisen vaihtoehdon.')
            ]
        });
    }
}

injectTemplate('#help-template', '#ohjeet', help);


var colormenu = {
    //      title: _("Vaihda väritystä"),
    title: _("Väriselitteen luokittelu"),
    options: [
        {
            name: 'ColSel_Teema',
            label: _('Teema')
        },
        {
            name: 'ColSel_Maakunta',
            label: _('Maakunta')
        }
    ]
};

if (window.PAGE.VIS !== 'good-practices') {
    colormenu.options.push({
        name: 'ColSel_Vaikutusalue',
        label: _('Vaikutusalue')
    });
    colormenu.options.push({
        name: 'ColSel_Aluehallintovirasto',
        label: _('Aluehallintovirasto')
    });
}

colormenu.options.push({
    name: 'ColSel_Vuosi',
    label: _('Vuosi')
});


if (window.PAGE.VIS !== 'good-practices') {
  /*  colormenu.options.push({
        name: 'ColSel_Hanketyyppi',
        label: _('Toimiala')
    });*/
    colormenu.options.push({
        name: 'ColSel_Kieli',
        label: _('Kieli')
    });
    /*    if(window.PAGE.VIS == 'projects')
     colormenu.options.push({
     name: 'Kimppa',
     label: _('Hankeyhteistyö')
     });*/
}



var sizemenu = {
    //      title: _("Vaihda väritystä"),
    title: _("Pallon/Palkin koko"),
    options: [
        {
            name: 'euro',
            label: _('Myönnetty avustus')
        },
        {
            name: 'xxxx',
            label: _('Leiriläisten määrä')
        }
    ]
};

//    injectTemplate('#size-menu-template', '#sizeSelect', sizemenu);

var filter = {
    optgroups: [
        {
            name: 'Vuosi',
            label: _('Myöntövuosi')
        },
        /*    {
         name: 'Kimppa',
         label: _('Hankeyhteistyö')
         },*/
        {
            name: 'Teema',
            label: _('Teema')
        },
        {
            name: 'Aluehallintovirasto',
            label: _('Aluehallintovirasto')
        },
    /*    {
            name: 'Rahoittaja',
            label: _('Toimiala')
        },*/
        {
            name: 'Maakunta',
            label: _('Maakunta')
        },
        {
            name: 'Kunta',
            label: _('Kunta')
        },/*
         {
         name: 'Yhteishankkeet',
         label: _('Yhteishankkeet')
         },*/
        {
            name: 'Toteuttaja',
            label: _('Toteuttaja')
        },
        {
            name: 'Erityisavustus',
            label: _('Erityisavustus')
        }
    ]
};




var searchSection = {
    title: _('Etsi'),
    placeholder: _('Etsi hanketta nimeltä')
};

injectTemplate('#search-section-template', '#search_section', searchSection);

var visSelect = {
    title: _('Tietokanta'),
    links: [
        {
            href: 'projects',
            label: _('Hyväksytyt hankkeet')
        },/*
         {
         href: 'good-practices',
         label: _('Hyvät käytänteet')
         },*/
        {
            href: 'not-funded',
            label: _('Hankkeet, joille ei myönnetty tukea')
        }/*,
         {
         href: 'new-projects',
         label: _('Uudet hankehakemukset')
         }*/
    ]
};

//    injectTemplate('#visSelect-template', '#visSelect', visSelect);

var chartType = {
    stacked: _('Pinottu'),
    notStacked: _('Rinnakkain')
};

var tableType = {
    region: _('Maakunnittain'),
    theme: _('Avustuksittain')
};


var mapUnit = {
    money: _('Euro'),
    unit: _('Kpl')
};

injectTemplate('#map-unit-template', '#map-unit-div', mapUnit);


var mapSuhde = {
    norm: _('€'),
    asluku: _('€/Asukaluku')
};

injectTemplate('#map-suhde-template', '#map-suhde-div', mapSuhde);

var mapBaseX = {
    kunta: _('Kunta'),
    maakunta: _('Maakunta')/*,
     avi: _('Avi'),
     kehitKirjastot: _('Alueellinen kehittämistehtävä')*/
};

var mapBase = {
    //      title: _("Vaihda väritystä"),
    title: _("Kartta"),
    options: [
        {
            name: 'kunta',
            label: _('Kunta')
        },
        {
            name: 'maakunta',
            label: _('Maakunta')
        }/*,
         {
         name: 'avi',
         label: _('Avi')
         },
         {
         name: 'kehitKirjastot',
         label: _('Alueellinen kehittämistehtävä')
         }*/
    ]
};

injectTemplate('#map-base-template', '#map-base-div', mapBase);

var tagLayout = {
    tagMap: _('Kartta'),
    radial: _('Kehä')
};

injectTemplate('#tag-layout-template', '#tag-layout-div', tagLayout);

// </editor-fold>

var wwidth = $(window).width();
var threashold = 1200

var selectTitle = _('Visualisointi');

if(wwidth < threashold) {
    selectTitle = ""
}

var select = {
    title: selectTitle,
    options: [
        {
            name: 'bars',
            role:'tab',
            label: _('Kaaviot'),
            icon: '<i class="fa fa-bar-chart"></i>'
        },
        {
            name: 'circles',
            role:'tab',
            label: _('Pallot'),
            icon: '<img src="css/circles.png" alt="" />'
        },
        {
            name: 'map',
            role:'tab',
            label: _('Kartta'),
            icon: '<i class="fa fa-map"></i>'
        },
        {
            name: 'table',
            role:'table',
            label: _('Taulukko'),
            icon: '<i class="fa fa-table"></i>'
        }
    ]
};
injectTemplate('#chart-type-template', '#chart-type', chartType);
injectTemplate('#table-type-template', '#table-type', tableType);

function insertAfter(referenceNode, newNode) {

    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

if(wwidth < threashold) {
    $(".mobile").show()
    $("#options-sidebar").hide()
    $("#mapHelper").hide()

    $("#main-content").css({"margin-left":"1px"})
    $("#typeID").css({"visibility":"hidden"})



//toolbar[0].insertBefore(mMenu[0])
    //     insertAfter(mMenu[0],toolbar[0])

    injectTemplate('#select-template', '#textAndSelect2', select);
    injectTemplate('#nav-template-mobile', '#HankeVis_navi_hamburger', buttons);
    injectTemplate('#color-menu-template', '#HankeVis_navi_color_hamburger', colormenu);
} else {
    injectTemplate('#nav-template', '#HankeVis_navi_inner_container', buttons);
    injectTemplate('#select-template', '#textAndSelect', select);
    injectTemplate('#color-menu-template', '#coloring', colormenu);
    //    $("#visuToggle").css({"width":"580px"})
}

if(wwidth < threashold) {
    //    injectTemplate('#multivalinta-template', '#hamburger-modal', filter);
    injectTemplate('#multivalinta-template', '#suodatinParent', filter);
    var b =('#suodatinParent'), c = ('#stacker')

    //       insertAfter(('#stacker'),('#suodatinParent'))
} else {
    injectTemplate('#multivalinta-template', '#multivalinta', filter);
}

if (window.PAGE.LANG === 'fi') {
    $('.hide-fi').hide();
    $('.show-en').hide();
    $('.show-se').hide();
    $('.show-fi').show();
} else if (window.PAGE.LANG === 'en') {
    $('.hide-en').hide();
    $('.show-fi').hide();
    $('.show-se').hide();
    $('.show-en').show();
} else if (window.PAGE.LANG === 'se') {
    $('.hide-se').hide();
    $('.show-fi').hide();
    $('.show-en').hide();
    $('.show-se').show();
}

function setLang(lang, doReload) {

    if (
        lang === 'fi' ||
        lang === 'en' ||
        lang === 'se'
    ) {
        Cookies.set('lang', lang, {expires: 365 * 6});

        doReload = doReload || false;

        doRouting({
            LANG: lang
        }, doReload);
    }
    return false;
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
        FILTER: {
            TEEMA: [],
            TOTEUTTAJA: [],
            KUNTA: [],
            MAAKUNTA: [],
            AVI: [],
            RAHOITTAJA: [],
            VUOSI: [],
            ERITYIS: []
            //     KIMPPA: []
        },
        MAPVIEW: {
            TEEMA:  {"Kokoelmat": true, "Laitehankinnat": true, "Digitointi": true, "Henkilöstön osaaminen": true, "Lukemisen edistäminen": true, "Mediakasvatus": true, "Oppimisympäristö ja yhteisöllisyys": true, "Palvelujen kehittäminen": true, "Strateginen kehittäminen": true, "Tilasuunnittelu": true, "Verkkopalvelut": true},
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

