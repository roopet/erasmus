function _(s) {

    if (false) {
        return translate_en(s);
    } else if (false) {
        return translate_sv(s);
    } else if (false) {
        return translate_fi(s);
    } else {
        return s;
    }
}

function translate_en(s) {
    if (s === undefined) return s;
    var re = new RegExp(Object.keys(mapObj_en).join("|"), "gi");
    str = s.replace(re, function (matched) {
        return mapObj_en[matched];
    });
    return str;
}

function translate_sv(s) {

    if (s === undefined) return s;
    var re = new RegExp(Object.keys(mapObj_sv).join("|"), "gi");
    str = s.replace(re, function (matched) {
        return mapObj_sv[matched];
    });
    return str;
}
function translate_fi(s) {
    if (s === undefined) return s;
    var re = new RegExp(Object.keys(mapObj_sv).join("|"), "gi");
    str = s.replace(re, function (matched) {
        return mapObj_sv[matched];
    });
    return str;
}


var mapObj_en = {};

mapObj_en["Miehet"] = ["Men"];
mapObj_en["Naiset"] = ["Women"];
mapObj_en["COlSel_Maakunta"] = ["ColSel_Maakunta"];
mapObj_en["Koko maa"] = ["Whole country"];
mapObj_en["Maakunta"] = ["Region"];
mapObj_en["Pohjois-Pohjanmaa"] = ["Northern Ostrobothnia"];
mapObj_en["Keski-Pohjanmaa"] = ["Central Ostrobothnia"];
mapObj_en["Kainuu"] = [" Kainuu"];
mapObj_en["Pohjois-Savo"] = ["Northern Savonia"];
mapObj_en["Pohjois-Karjala"] = ["North Karelia"];
mapObj_en["Keski-Suomi"] = ["Central Finland"];
mapObj_en["Etelä-Pohjanmaa"] = ["Southern Ostrobothnia"];
mapObj_en["Päijät-Häme"] = ["Päijänne Tavastia"];
mapObj_en["Kanta-Häme"] = ["Tavastia Proper"];
mapObj_en["Etelä-Savo"] = ["Southern Savonia"];
mapObj_en["Etelä-Karjala"] = ["South Karelia"];
mapObj_en["Varsinais-Suomi"] = ["Southwest Finland"];
mapObj_en["Lappi"] = ["Lapland"];
mapObj_en["Länsi-ja Sisä-Suomi"] = ["Western and Inland Finland"];
mapObj_en["Itä-Suomi"] = ["Eastern Finland"];
mapObj_en["Lounais-Suomi"] = ["Southwest Finland"];
mapObj_en["Etelä-Suomi"] = ["Southern Finland"];
mapObj_en["Pohjois-Suomi"] = ["Northern Finland"];
mapObj_en["Pohjanmaa"] = ["Ostrobothnia"];
mapObj_en["Opetus- ja kulttuuriministeriö"] = ["Ministry of Education and Culture"];
mapObj_en["suomenkielinen"] = ["Finnish"];
mapObj_en["ruotsinkielinen"] = ["Swedish"];
mapObj_en["kansainvälinen"] = ["International"];
mapObj_en["kunnan- tai kaupunginosat"] = ["Parts of municipality or city"];
mapObj_en["kunnat"] = ["Municipalities"];
mapObj_en["maakunta"] = ["Region	"];
mapObj_en["seutukunnat"] = ["Sub-regions"];
mapObj_en["valtakunnallinen"] = ["Nationwide	"];
mapObj_en["ylimaakunnallinen"] = ["Several regions"];
mapObj_en["ELY / AVI"] = ["ELY Centres / AVI"];
mapObj_en["ELY"] = ["ELY Centres / AVI	"];
mapObj_en["OKM"] = ["Ministry of Education and Culture"];
mapObj_en["Opetus- ja kulttuuriministeriö"] = ["Ministry of Education and Culture"];
mapObj_en["Digitointi"] = ["Digitisation"];
mapObj_en["Henkilöstön osaaminen"] = ["Employee development"];
mapObj_en["Kokoelmat"] = ["Collections"];
mapObj_en["Laitehankinnat"] = ["Equipment acquisitions"];
mapObj_en["Lukemisen edistäminen"] = ["Promoting reading"];
mapObj_en["Mediakasvatus"] = ["Media literacy"];
mapObj_en["Oppimisympäristö ja yhteisöllisyys"] = ["Learning environment and communality"];
mapObj_en["Palvelujen kehittäminen"] = ["Improvement of services"];
mapObj_en["Strateginen kehittäminen"] = ["Strategy development"];
mapObj_en["Tilasuunnittelu"] = ["Library space planning"];
mapObj_en["Verkkopalvelut"] = ["Online services"];
mapObj_en["COlSel_Region"] = ["ColSel_Maakunta"];
mapObj_en["Uusimaa-Keskuskirjasto"] = ["Uusimaa Central Library"];
mapObj_en["fi"] = ["Finnish"];
mapObj_en["sv"] = ["Swedish"];

var mapObj_sv = {};

mapObj_sv["Lapset"] = ["Barn"];
mapObj_sv["Nuoret aikuiset"] = ["Unga vuxna"];
mapObj_sv["Nuoret"] = ["Unga"];
mapObj_sv["Miehet"] = ["Män"];
mapObj_sv["Naiset"] = ["Kvinnor"];
mapObj_sv["Koko maa"] = [""];
mapObj_sv["Maakunta"] = ["Landskap"];
mapObj_sv["Espoo"] = ["Esbo"];
mapObj_sv["Hanko"] = ["Hangö"];
mapObj_sv["Helsinki"] = ["Helsingfors"];
mapObj_sv["Vantaa"] = ["Vanda"];
mapObj_sv["Kaskinen"] = ["Kaskö"];
mapObj_sv["Kauniainen"] = ["Grankulla"];
mapObj_sv["Kirkkonummi"] = ["Kyrkslått"];
mapObj_sv["Kokkola"] = ["Karleby"];
mapObj_sv["Lapinjärvi"] = ["Lappträsk"];
mapObj_sv["Loviisa"] = ["Lovisa"];
mapObj_sv["Lohja"] = ["Lojo"];
mapObj_sv["Myrskylä"] = ["Mörskom"];
mapObj_sv["Pyhtää"] = ["Pyttis"];
mapObj_sv["Porvoo"] = ["Borgå"];
mapObj_sv["Sipoo"] = ["Sibbo"];
mapObj_sv["Siuntio"] = ["Sjundeå"];
mapObj_sv["Turku"] = ["Åbo"];
mapObj_sv["Vaasa"] = ["Vasa"];
mapObj_sv["Inkoo"] = ["Ingå"];
mapObj_sv["Kemiönsaari"] = ["Kimitoön"];
mapObj_sv["Kristiinankaupunki"] = ["Kristinestad"];
mapObj_sv["Kronoby"] = ["Kruunupyy"];
mapObj_sv["Maalahti"] = ["Malax"];
mapObj_sv["Mustasaari"] = ["Korsholm"];
mapObj_sv["Parainen"] = ["Pargas"];
mapObj_sv["Pietarsaari"] = ["Jakobstad"];
mapObj_sv["Pedersören kunta"] = ["Pedersöre"];
mapObj_sv["Raasepori"] = ["Raseborg"];
mapObj_sv["Uusikaarlepyy"] = ["Nykarleby"];
mapObj_sv["Vöyri"] = ["Vörå"];
mapObj_sv["Luoto"] = ["Larsmo"];
mapObj_sv["Maarianhamina"] = ["Mariehamn"];
mapObj_sv["Närpiö"] = ["Närpes"];
mapObj_sv["Enontekiö"] = ["Enontekis"];
mapObj_sv["Eurajoki"] = ["Euraåminne"];
mapObj_sv["Hailuoto"] = ["Karlö"];
mapObj_sv["Hamina"] = ["Fredrikshamn"];
mapObj_sv["Hyvinkää"] = ["Hyvinge"];
mapObj_sv["Hämeenkyrö"] = ["Tavastkyro"];
mapObj_sv["Hämeenlinna"] = ["Tavastehus"];
mapObj_sv["Iisalmi"] = ["Idensalmi"];
mapObj_sv["Ikaalinen"] = ["Ikalis"];
mapObj_sv["Ilomantsi"] = ["Ilomants"];
mapObj_sv["Inari"] = ["Enare"];
mapObj_sv["Isojoki"] = ["Storå"];
mapObj_sv["Isokyrö"] = ["Storkyro"];
mapObj_sv["Jokioinen"] = ["Jockis"];
mapObj_sv["Joroinen"] = ["Jorois"];
mapObj_sv["Järvenpää"] = ["Träskända"];
mapObj_sv["Kaarina"] = ["S:t Karins"];
mapObj_sv["Kajaani"] = ["Kajana"];
mapObj_sv["Karijoki"] = ["Bötom"];
mapObj_sv["Karkkila"] = ["Högfors"];
mapObj_sv["Kaustinen"] = ["Kaustby"];
mapObj_sv["Kerava"] = ["Kervo"];
mapObj_sv["Kokemäki"] = ["Kumo"];
mapObj_sv["Kustavi"] = ["Gustavs"];
mapObj_sv["Köyliö"] = ["Kjulo"];
mapObj_sv["Lahti"] = ["Lahtis"];
mapObj_sv["Laihia"] = ["Laihela"];
mapObj_sv["Lappeenranta"] = ["Villmanstrand"];
mapObj_sv["Lapua"] = ["Lappo"];
mapObj_sv["Lieto"] = ["Lundo"];
mapObj_sv["Liminka"] = ["Limingo"];
mapObj_sv["Merikarvia"] = ["Sastmola"];
mapObj_sv["Mikkeli"] = ["S:t Michel"];
mapObj_sv["Naantali"] = ["Nådendal"];
mapObj_sv["Nousiainen"] = ["Nousis"];
mapObj_sv["Oulu"] = ["Uleåborg"];
mapObj_sv["Paimio"] = ["Pemar"];
mapObj_sv["Pirkkala"] = ["Birkala"];
mapObj_sv["Pomarkku"] = ["Påmark"];
mapObj_sv["Pori"] = ["Björneborg"];
mapObj_sv["Pornainen"] = ["Borgnäs"];
mapObj_sv["Raahe"] = ["Brahestad"];
mapObj_sv["Raisio"] = ["Reso"];
mapObj_sv["Rauma"] = ["Raumo"];
mapObj_sv["Sauvo"] = ["Sagu"];
mapObj_sv["Savonlinna"] = ["Nyslott"];
mapObj_sv["Taivassalo"] = ["Tövsala"];
mapObj_sv["Tampere"] = ["Tammerfors"];
mapObj_sv["Teuva"] = ["Östermark"];
mapObj_sv["Tornio"] = ["Torneå"];
mapObj_sv["Tuusula"] = ["Tusby"];
mapObj_sv["Ulvila"] = ["Ulvsby"];
mapObj_sv["Uusikaupunki"] = ["Nystad"];
mapObj_sv["Veteli"] = ["Vetil"];
mapObj_sv["Vihti"] = ["Vichtis"];
mapObj_sv["Virrat"] = ["Virdois"];
mapObj_sv["Ylitornio"] = ["Övertorneå"];
mapObj_sv["Ähtäri"] = ["Etseri"];

mapObj_sv["fi"] = ["finskspråkig"];
mapObj_sv["sv"] = ["svenskspråkig"];

