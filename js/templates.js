/**
 * Created by Roope on 20.2.2021.
 */

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
            label: _('Avustusmuodoittain')
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
         },*/
        {
            name: 'ColSel_Hanketyyppi',
            label: _('Toimialoittain')
        },
        {
            name: 'amount',
            label: _('Koon mukaan')
        }
    ];

} else if (window.PAGE.TYPE === 'bars') {

    buttons.buttons = [
        {
            name: 'ColSel_Teema',
            label: _('Avustusmuodoittain')
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
        }/*,
         {
         name: 'ColSel_Vaikutusalue',
         label: _('Vaikutusalueittain')
         },

         {
         name: 'ColSel_Hanketyyppi',
         label: _('Toimialoittain')
         }*/

    ];
} else if (window.PAGE.TYPE === 'table') {
    buttons.buttons = [
        {
            name: 'ColSel_Teema',
            label: _('Avustusmuodoittain')
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
    help.blocks = [];
 /*   help.blocks = [
        {
            //     title: _('Erasmus+ -project visualisation'),
            title: _('Erasmus+ -hankevisualisointi'),
            rows: [
                _('Tähän tulee esittelytekstiä visualisoinnista ja tietosisällöistä')
                //      _('The visualisation shows how EU funding for international youth work and development of youth work is spread across Finland. The data is based on the grants awarded by the Finnish National Agency for the EU youth programmes. The visualisation will also help you find out more about projects carried out.'),
                //      _('Visualisointi näyttää miten kansainväliseen nuorisotyöhön ja nuorisotyön kehittämiseen tarkoitettu EU-rahoitus jakautuu Suomessa. Tiedot pohjautuvat EU:n nuoriso-ohjelmien kansallisen toimiston tekemiin päätöksiin hanketuista. Visualisoinnin avulla voi myös tutustua tarkemmin toteutettuihin hankkeisiin.'),
                //      _('Voit tutustua avustuksiin ja hankkeisiin neljästä eri näkökulmasta: kaavioina, palloina, kartalla tai taulukossa. Kaaviomuoto antaa parhaan yleiskuvan eri kokonaisuuksien suuruusluokasta. Pallo-visualisoinnissa pääsee paremmin tarkastelemaan itse hankkeita. Kartta taasen näyttää kuinka avustukset ovat jakaantuneet maantieteellisesti.'),
                //      _('HUOM! Visualisointi koskee tällä hetkellä vain vuodesta 2019 lähtien myönnettyjä avustuksia. Tiedot päivittyvät pitkin vuotta avustusmuodoittain. Avustusmuodot eivät myöskään vastaa tällä hetkellä haettavina olevia avustuskokonaisuuksia, sillä vuosittain haettavat avustusmuodot vaihtelevat.')
            ]
        }
    ];
    */
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
                _('Kaaviopohjaisen visualisointitoteutuksen perustana ovat hankkeiden saamat avustussummat yhteensä. Visualisoinnin vasemman laidan Pylväiden luokittelu -pudotusvalikosta voi vaihtaa pylväskaavion y-akselin luokittelua.'),
                //     _('Voit myös vaihtaa palkkien asettelua sivupalkin painikkeista "pinottu" ja "rinnakkain". Palkkikaavion näkymää voi myös suurentaa "maalaamalla" palkkeja pystysuoraan.')
                _('Väriselitteen luokkia voi vaihtaa sivun vasemmalla laidalla olevasta Väriselitteen luokittelu -valikosta. Vasemmalta löytyy myös Suodattimet -valikko, jonka kautta voi rajata avustuksia eri muuttujien mukaan. Voit myös vaihtaa kaavioiden muotoa sivupalkin painikkeista "Pinottu" ja "Rinnakkain".'),
                _('Visualisoinnin vasemman yläkulman painikkeista voi vaihtaa visualisoinnin muotoa kaavion, kartan ja taulukon välillä. Yksittäisiin avustuksiin pääset taulukko- ja karttavisualisoinnin kautta.')
                //        _('Kaikki visualisointinäkymään tehdyt muutokset tallentuvat osoitekenttään. Sivun ylälaidan oikeassa reunassa on pudotusvalikko, josta voi valita sosiaalisen median, jossa jakaa visualisointinäkymä. Osoitekentän linkin voi myös kopioida itse ja lähettää eteenpäin, mutta sen saa myös lyhennetyssä muodossa, jos valitsee pudotusvalikon ensimmäisen vaihtoehdon.')
            ]
        });
    } else if (window.PAGE.TYPE === 'map') {
        help.blocks.push({
            title: _('Kuinka visualisointi toimii'),
            rows: [
                //      _('Pylväskuviossa näytettävän jakauman voi valita yläpalkin "tarkastele"-valikoista. Palkkien väritystä voi muuttaa vasemmassa sivupalkissa olevasta valikosta. Suodattimista on mahdollista rajata kuvioon laskettavien hankkeiden määrää.'),
                _('Karttapohjaisen visualisoinnin avulla voi tutkia miten avustukset ovat jakaantuneet maantieteellisesti. Oletuksena kartta näyttää kuinka paljon avustuksia euroina on myönnetty kunnittain. Jos kartan yksiköksi on valittuna Kpl, toimii sama logiikka silloin kappaleina. €/asukas näyttää avustusten määrän per asukas. Karttapohjaa voi myös vaihdella kunta- ja maakuntakartan välillä Kartta-valikon avulla.'),
                //     _('Voit myös vaihtaa palkkien asettelua sivupalkin painikkeista "pinottu" ja "rinnakkain". Palkkikaavion näkymää voi myös suurentaa "maalaamalla" palkkeja pystysuoraan.')
                _('Viemällä hiirenosoittimen kunnan ylle, saa lisätietoa eri toimintotyyppeihin myönnettyjen avustusten määrästä kunnassa. Klikkaamalla kuntaa avautuu oikealle lista kunnan avustuksista. Jos tuosta listasta klikkaa hankkeen nimeä, avautuu hankkeen perustiedot-infolaatikko.'),
                _('Visualisoinnin vasemman yläkulman painikkeista voi vaihtaa visualisoinnin muotoa kaavion, kartan ja taulukon välillä. Vasemmalta löytyy myös Suodattimet -valikko, jonka kautta voit rajata avustuksia eri muuttujien mukaan.')
                //         _('Kaikki visualisointinäkymään tehdyt muutokset tallentuvat osoitekenttään. Sivun ylälaidan oikeassa reunassa on pudotusvalikko, josta voi valita sosiaalisen median, jossa jakaa visualisointinäkymä. Osoitekentän linkin voi myös kopioida itse ja lähettää eteenpäin, mutta sen saa myös lyhennetyssä muodossa, jos valitsee pudotusvalikon ensimmäisen vaihtoehdon.')
            ]
        });
    } else if (window.PAGE.TYPE === 'table') {
        help.blocks.push({
            title: _('Kuinka visualisointi toimii'),
            rows: [
                //      _('Pylväskuviossa näytettävän jakauman voi valita yläpalkin "tarkastele"-valikoista. Palkkien väritystä voi muuttaa vasemmassa sivupalkissa olevasta valikosta. Suodattimista on mahdollista rajata kuvioon laskettavien hankkeiden määrää.'),
                _('Taulukkovisualisoinnin avulla voi järjestellä hankkeita haluamiinsa kokonaisuuksiin sekä tarkastella yksittäisiä hankkeita tarkemmin. Hankkeet jakautuvat haitarilehdiksi, jotka saa auki niitä klikkaamalla. Hankkeet avautuvat tuolloin listaksi. Jos tuosta listasta klikkaa hankkeen nimeä, avautuu hankkeen perustiedot-infolaatikko.'),
                _('Haitarilehtien luokittelua voi vaihtaa sivun vasemmalla laidalla olevasta Luokittelu -valikosta. Vasemmalta löytyy myös Suodattimet -valikko, jonka kautta voit rajata avustuksia eri muuttujien mukaan. Lataa Excel -painikkeella voi ladata excelin hankkeista.'),
                //     _('Voit myös vaihtaa palkkien asettelua sivupalkin painikkeista "pinottu" ja "rinnakkain". Palkkikaavion näkymää voi myös suurentaa "maalaamalla" palkkeja pystysuoraan.')
             //   _(''),
                _('Visualisoinnin vasemman yläkulman painikkeista voi vaihtaa visualisoinnin muotoa kaavion, kartan ja taulukon välillä.')
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

var luokittelumenu;
if (window.PAGE.TYPE === 'table') {
    luokittelumenu = {
        //      title: _("Vaihda väritystä"),
        title: _("Luokittelu"),
        options: [
            {
                name: 'Avustusmuoto',
                label: _('Toimintotyyppi')
            },
                {
             name: 'Sektori',
             label: _('Sektori')
             },
            {
                name: 'OrganisationType',
                label: _('Organisaatiotyyppi')
            },
            {
                name: 'ColSel_Maakunta',
                label: _('Maakunta')
            },
            {
                name: 'Kunta',
                label: _('Kunta')
            },
            {
                name: 'ColSel_Vuosi',
                label: _('Vuosi')
            }
        ]
    };
} else {
    luokittelumenu = {
        //      title: _("Vaihda väritystä"),
        title: _("Pylväiden luokittelu"),
        options: [
            {
                name: 'Avustusmuoto',
                label: _('Toimintotyyppi')
            },
            {
                name: 'ColSel_Teema',
                label: _('Teema')
            },
            {
                name: 'Sektori',
                label: _('Sektori')
            },
            /*    {
             name: 'Kohderyhma',
             label: _('Se Oikea Teema')
             },*/
            {
                name: 'OrganisationType',
                label: _('Organisaatiotyyppi')
            },
            {
                name: 'ColSel_Maakunta',
                label: _('Maakunta')
            },
            {
                name: 'Kunta',
                label: _('Kunta')
            },
            {
                name: 'ColSel_Vuosi',
                label: _('Vuosi')
            }
        ]
    };
}

var colormenu = {
    //      title: _("Vaihda väritystä"),
    title: _("Väriselitteen luokittelu"),
    options: [
        {
            name: 'Avustusmuoto',
            label: _('Toimintotyyppi')
        },
        {
            name: 'Sektori',
            label: _('Sektori')
        },
        {
            name: 'OrganisationType',
            label: _('Organisaatiotyyppi')
        },
        {
            name: 'ColSel_Maakunta',
            label: _('Maakunta')
        }
    ]
};

var kausimenu = {
    //      title: _("Vaihda väritystä"),
    title: _("Rahoituskausi"),
    options: [
        {
            name: '2014-2020',
            label: _('2014-2020')
        },
        {
            name: '2021-2027',
            label: _('2021-2027')
        }
    ]
};


colormenu.options.push({
    name: 'ColSel_Vuosi',
    label: _('Vuosi')
});





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

var filter;

if (window.PAGE.TYPE === 'map') {
    filter =  {
        optgroups: [
            {
                name: 'Vuosi',
                label: _('Myöntövuosi')
            },

            {
                name: 'Avustusmuoto',
                label: _('Toimintotyyppi')
            },
            {
                name: 'Sektori',
                label: _('Sektori')
            },
            {
                name: 'Teema',
                label: _('Teema')
            },
            {
                name: 'Maakunta',
                label: _('Maakunta')
            },
            {
                name: 'Toteuttaja',
                label: _('Organisaatio')
            }
        ]
    };
} else {
    filter =  {
        optgroups: [
            {
                name: 'Vuosi',
                label: _('Myöntövuosi')
            },

            {
                name: 'Avustusmuoto',
                label: _('Toimintotyyppi')
            },
            {
                name: 'Sektori',
                label: _('Sektori')
            },
            {
                name: 'Teema',
                label: _('Teema')
            },
            {
                name: 'Maakunta',
                label: _('Maakunta')
            },
            {
                name: 'Kunta',
                label: _('Kunta')
            },
            {
                name: 'Toteuttaja',
                label: _('Organisaatio')
            }
        ]
    };
}





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
/*
 var chartType = {
 stacked: _('Pinottu'),
 notStacked: _('Rinnakkain')
 };
 */
var chartType = {
    title: _('Vaihda palkkien asettelua'),
    options: [
        {
            //    name: 'stacked',
            name: true,
            role:'tab',
            label: _(' Pinottu'),
            icon: '<i class="fa fa-tasks"></i>'
        },
        {
            //    name: 'notStacked',
            name:false,
            role:'tab',
            label: _(' Rinnakkain'),
            icon: '<i class="fa fa-align-left"></i>'
        }
    ]
};
injectTemplate('#chart-type-template', '#chart-type', chartType);
var tableType = {
    region: _('Maakunnittain'),
    theme: _('Avustuksittain')
};


var mapUnit = {
    money: _('Euro'),
    unit: _('Kpl')
};

var mapUnit = {
    title: _("Kartan yksiköt"),
    options: [
        {
            name: 'money',
            role:'tab',
            label: _('Euro')
        },
        {
            name: 'unit',
            role:'tab',
            label: _('Kpl')
        },
        {
            name: 'suhde',
            role:'tab',
            label: _('€/asukas')
        }
    ]
};

injectTemplate('#map-unit-template', '#map-unit', mapUnit);


var mapSuhde = {
    norm: _('€'),
    asluku: _('€/Asukasluku')
};

var mapSuhde = {
    title: _("Suhdeluvut"),
    options: [
        {
            name: 'norm',
            role:'tab',
            label: _('Abs. arvo')
        },
        {
            name: 'asluku',
            role:'tab',
            label: _('/ asukasluvulla')
        }
    ]
};

//injectTemplate('#map-suhde-template', '#map-suhde', mapSuhde);

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
    //   selectTitle = ""
}

var select;

if($("#textAndSelect").width() < 258) {
    select= {
        title: selectTitle,
        options: [
            {
                name: 'bars',
                role:'tab',
                ariaHide:false,
                label: _('Kaaviot')
            },
            {
                name: 'map',
                role:'tab',
                ariaHide:true,
                label: _(' Kartta')
            },
            {
                name: 'table',
                role:'table',
                ariaHide:false,
                label: _('Taulukko')
            }
        ]
    };
} else {
    select= {
        title: selectTitle,
        options: [
            {
                name: 'bars',
                role:'tab',
                ariaHide:false,
                label: _('Kaaviot'),
                icon: '<i class="fa fa-bar-chart"></i>'
            },
            /*  {
             name: 'circles',
             role:'tab',
             label: _('Pallot'),
             icon: '<img src="css/circles.png" alt="" />'
             },*/
            {
                name: 'map',
                role:'tab',
                ariaHide:true,
                label: _(' Kartta'),
                icon: '<i class="fa fa-map"></i>'
            },
            {
                name: 'table',
                role:'table',
                ariaHide:false,
                label: _(' Taulukko'),
                icon: '<i class="fa fa-table"></i>'
            }
        ]
    };
}




injectTemplate('#table-type-template', '#table-type', tableType);

function insertAfter(referenceNode, newNode) {

    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//alert(123)
console.log("test width in templates ", wwidth)
if(wwidth == 0)
wwidth = 1289



function resized() {
if(wwidth < threashold && wwidth > 0) {

    $("#options-sidebar").css({
        left: -wwidth
    });



//    $( "#options-sidebar" ).addClass( "mobile-sidebar-hide" );

    injectTemplate('#nav-template', '#HankeVis_navi_inner_container', buttons);
    injectTemplate('#select-template', '#textAndSelect', select);
    injectTemplate('#color-menu-template', '#coloring', colormenu);
    injectTemplate('#kausi-menu-template', '#kausi', kausimenu);
    injectTemplate('#luokittelu-menu-template', '#luokittelut', luokittelumenu);
//    insertAfter(('#options-sidebar'),('#main-content'))

} else {
    console.log(luokittelumenu)
    injectTemplate('#nav-template', '#HankeVis_navi_inner_container', buttons);
    injectTemplate('#select-template', '#textAndSelect', select);
    injectTemplate('#color-menu-template', '#coloring', colormenu);
    injectTemplate('#kausi-menu-template', '#kausi', kausimenu);
    injectTemplate('#luokittelu-menu-template', '#luokittelut', luokittelumenu);
    //    $("#visuToggle").css({"width":"580px"})
}

if(wwidth < threashold-5000) {
    //    injectTemplate('#multivalinta-template', '#hamburger-modal', filter);
    injectTemplate('#multivalinta-template', '#multivalinta', filter);
    var b =('#suodatinParent'), c = ('#stacker')

    //       insertAfter(('#stacker'),('#suodatinParent'))
} else {
    injectTemplate('#multivalinta-template', '#multivalinta', filter);
}
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

window.onresize = function(event) {
    resized()
};
resized()
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
