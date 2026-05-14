# JavaScripti ülesanded

Ühe-leheline JavaScripti õppeprojekt, mis koondab 13 praktilist ülesannet. Projekt liigub lihtsatest DOM-sündmustest vormide, localStorage, JSON-andmete, `fetch()` päringute, filtreerimise ja lõpuülesandeni.

## Käivitamine

Käivita projekt taustal pordil `8001`:

```bash
./start.sh
```

Seejärel ava brauseris:

```text
http://localhost:8001
```

Kui `./start.sh` käivitatakse uuesti, peatab skript eelmise sama teenuse protsessi ja käivitab serveri uuesti.

## Failid

- `index.html` - lehe struktuur ja kõik ülesannete sektsioonid
- `styles.css` - kujundus ja responsive layout
- `script.js` - kogu JavaScripti loogika
- `data.json` - JSON-andmed õpilaste, ilma, toodete, uudiste ja raamatute jaoks
- `start.sh` - kohalik käivitusskript pordil `8001`

## Ülesanded

Projekt sisaldab järgmisi osi:

1. Tervitaja nime sisestamise ja nupusündmusega
2. Lihtne kalkulaator nelja põhitehtega
3. Parooli tugevuse kontrollija
4. Registreerimisvorm kontrollidega
5. Pildigalerii eelvaadete ja järgmise pildi nupuga
6. Taustavärvi, teema ja fondi suuruse muutja localStorage salvestusega
7. To-do list lisamise, tehtuks märkimise, kustutamise ja salvestusega
8. Õpilaste JSON-andmete kuvamine tabelis
9. Mini-ilmarakendus linna valikuga
10. AJAX-andmete laadimine `data.json` failist
11. Toodete otsing, kategooriafilter ja sortimine
12. Sama peitmise/kuvamise näide tavalise JavaScripti ja jQueryga
13. Lõpuülesanne: raamatukogu nimekiri JSON-andmete, otsingu, žanrifiltri ja loetud oleku salvestusega

## Märkused

- `fetch()` vajab kohalikku serverit, seetõttu ära ava `index.html` faili otse brauseris.
- Runtime failid `.server.pid` ja `.server.log` on `.gitignore` failis.
- Algne ülesandekirjelduse fail on samuti `.gitignore` failis ja ei kuulu projekti avalikku koodi.
