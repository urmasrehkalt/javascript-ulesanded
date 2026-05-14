Loo allolevad Javascript ülesanded nii, et iga uus ülesanne kasutab eelmistest midagi edasi.

1. „Tere, JavaScript” – nupud ja sündmused
Eesmärk: aru saada, kuidas HTML, CSS ja JavaScript koos töötavad.

Õpilane teeb lehe, kus on:

pealkiri
tekstiväli nime sisestamiseks
nupp „Tervita”
JavaScript kuvab tulemuse: Tere, Mari!
Harjutab: muutujad, onclick, document.querySelector, teksti muutmine lehel.

2. Lihtne kalkulaator
Eesmärk: andmetüübid, operaatorid, sisendi lugemine.

Õpilane teeb kalkulaatori, kus kasutaja sisestab kaks arvu ja saab valida:

liitmine
lahutamine
korrutamine
jagamine
Lisatingimus: kui jagatakse nulliga, kuvatakse veateade.

Harjutab: arvutamine, Number(), tingimuslaused, veakontroll.

3. Parooli tugevuse kontrollija
Eesmärk: vormide loomine ja sisestuse valideerimine.

Kasutaja sisestab parooli. Programm kontrollib:

vähemalt 8 märki
sisaldab numbrit
sisaldab suurtähte
sisaldab erimärki
Tulemus kuvatakse näiteks:

nõrk
keskmine
tugev
Harjutab: if, stringid, vormid, valideerimine.

4. Registreerimisvorm koos kontrollidega
Eesmärk: realistlik vormi valideerimise ülesanne.

Vormis on:

nimi
e-post
vanus
parool
parooli kordus
Kontrollid:

kõik väljad peavad olema täidetud
e-postis peab olema @
vanus peab olema vähemalt 13
paroolid peavad kattuma
Harjutab: vormid, tingimuslaused, kasutajale veateadete kuvamine.

5. Pildigalerii
Eesmärk: pildi lisamine ja src muutmine.

Lehel on üks suur pilt ja mitu väikest eelvaatepilti. Kui kasutaja klõpsab väiksel pildil, muutub suur pilt.

Lisavõimalus: nupp „Järgmine pilt”.

Harjutab: pildi src muutmine, sündmused, DOM.

6. Taustavärvi ja kujunduse muutja
Eesmärk: stiilide muutmine JavaScriptiga.

Õpilane teeb lehe, kus saab valida:

hele/tume kujundus
taustavärv
fondi suurus
Valik salvestatakse küpsisesse või localStorage-isse, et järgmine kord jääks sama kujundus alles.

Harjutab: CSS klasside muutmine, classList, küpsised või localStorage.

7. Lihtne „to-do list”
Eesmärk: dünaamiline sisu lisamine ja eemaldamine.

Kasutaja saab:

lisada ülesande
märkida ülesande tehtuks
kustutada ülesande
Lisavõimalus: ülesanded salvestatakse localStorage-isse.

Harjutab: massiivid, DOM-elementide loomine, sündmused, andmete salvestamine.

8. JSON-andmete kuvamine
Eesmärk: JSON-i kasutamine andmeallikana.

Õpilasele antakse näiteks selline andmestik:

const students = [
  { name: "Mari", grade: 5 },
  { name: "Jüri", grade: 3 },
  { name: "Kati", grade: 4 }
];
Ülesanne:

kuvada õpilased tabelis
arvutada keskmine hinne
näidata ainult neid, kelle hinne on vähemalt 4
Harjutab: JSON-i laadne andmestruktuur, massiivid, objektid, tabeli genereerimine.

9. Mini-ilmarakendus JSON-failist
Eesmärk: andmete lugemine ja kasutajale kuvamine.

Õpilane teeb väikese rakenduse, mis loeb ilmaandmed JSON-ist, näiteks:

[
  { "city": "Tõrva", "temperature": -2, "condition": "Pilves" },
  { "city": "Tallinn", "temperature": 1, "condition": "Lumine" }
]
Lehel saab valida linna ja kuvatakse temperatuur ning ilm.

Harjutab: JSON, valikukast, andmete filtreerimine.

10. AJAX-andmete laadimine
Eesmärk: kliendi ja serveri vaheline asünkroonne andmevahetus.

Õpilane teeb lehe, kus nupule vajutades laetakse andmed failist data.json:

kasutajad
tooted
uudised
raamatud
Andmeid ei kirjutata HTML-i käsitsi, vaid need tulevad JSON-failist.

Harjutab: fetch(), AJAX-tehnika, asünkroonne andmete laadimine.

11. Otsing ja filtreerimine
Eesmärk: praktiline veebirakenduse osa.

Lehel on toodete või filmide nimekiri. Kasutaja saab:

otsida nime järgi
filtreerida kategooria järgi
sortida hinna või nime järgi
Harjutab: massiivid, filter(), sort(), sisendi jälgimine.

12. jQuery võrdlusülesanne
Eesmärk: näha erinevust tavalise JavaScripti ja jQuery vahel.

Õpilane teeb sama väikese funktsiooni kahel moel:

Näiteks:

nupule vajutades peidetakse tekst
nupule vajutades kuvatakse tekst tagasi
lisatakse animatsioon
Üks variant tehakse tavalise JavaScriptiga, teine jQueryga.

Harjutab: jQuery põhisüntaks, erinevus tänapäevase JavaScriptiga.

13. Lõpuülesanne: lihtne veebirakendus
Hea lõpuülesanne võiks olla üks suurem töö, mis seob teemad kokku.

Näited:

Variant A: „Õpilaste hinnete haldur”
Funktsioonid:

lisa õpilane
lisa hinne
arvuta keskmine
näita, kas hinne on positiivne
salvesta andmed localStorage-isse
laadi algandmed JSON-failist
Variant B: „Raamatukogu nimekiri”
Funktsioonid:

kuva raamatud JSON-ist
otsi pealkirja järgi
filtreeri žanri järgi
märgi raamat loetuks
salvesta kasutaja valikud
Variant C: „Lihtne e-pood”
Funktsioonid:

kuva tooted JSON-ist
lisa ostukorvi
arvuta kogusumma
eemalda toode ostukorvist
salvesta ostukorv localStorage-isse
Hindamiskriteeriumid
Leht töötab ilma JavaScripti vigadeta.
Kasutaja sisestust kontrollitakse.
Andmeid ei kirjutata kõik käsitsi HTML-i, vaid osa tuleb JavaScriptist või JSON-ist.
Kood on loetav ja muutujate nimed on arusaadavad.
Kujundus on lihtne, aga kasutatav.
Lõpuülesandes on vähemalt üks asünkroonne andmelaadimine fetch() abil.
Kõige loogilisem järjestus oleks: tervitaja → kalkulaator → vormi valideerimine → pildigalerii → kujunduse salvestamine → to-do list → JSON → AJAX → otsing/filter → lõpuülesanne.