# Szakdolgozat

# Képi adatbázis kezelő weboldal fejlesztése

## Funkciók

- Képfeltöltés
- Címkézés
    - Feltöltéskor
    - Utólagosan
    - Automatikus címkézés
    - Szűrés címkék alapján
- Rendszerezés gyűjteményekbe
- Zip fájlba exportálás
    - Gyűjtemények exportálása
    - Csak kiválasztott képek exportálása
- Képadat tárolás
    - Fájlrendszer
    - Cloud storage
    - Adatbázis
- Felhasználó kezelés
    - Privát képek, albumok
    - Képek megosztása felhasználók között
    - Nyilvánosan megtekinthető képek (bejelentkezés nélkül)
- Indexkép generálás
- Képnézegető

## Extra funkciók

- Filterek (pl: szépia, élénk, film)
- EXIF információ feldolgozása
    - Térképen lokáció
    - Idővonal
    - GPS koordináta alapján szűrés

## TODO

- ~~BE image store should be done with ids instead of names~~
- save img w,h to image entity, so loading ghost w,h is good
- create good EXIF extractor
- ~~look into Tensorflow - opencv auto image tagging~~
- image masonry loading pulse skeleton, random height thing to different own component
- similar images under
- file upload area
