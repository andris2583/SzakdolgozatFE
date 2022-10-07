# Szakdolgozat

# Képi adatbázis kezelő weboldal fejlesztése

## Funkciók

- [X] Képfeltöltés
- [] Címkézés
    - [X] Feltöltéskor
    - [] Utólagosan
    - [X] Automatikus címkézés
    - [X] Szűrés címkék alapján
- [] Rendszerezés gyűjteményekbe
- [] Zip fájlba exportálás
    - [] Gyűjtemények exportálása
    - [] Csak kiválasztott képek exportálása
- [X] Képadat tárolás
    - [X] Fájlrendszer
    - [X] Cloud storage
    - [X] Adatbázis
- [] Felhasználó kezelés
    - [] Privát képek, albumok
    - [] Képek megosztása felhasználók között
    - [] Nyilvánosan megtekinthető képek (bejelentkezés nélkül)
- [X] Indexkép generálás
- [X] Képnézegető

## Extra funkciók

- [] Filterek (pl: szépia, élénk, film)
- [] EXIF információ feldolgozása
    - [] Térképen lokáció
    - [] Idővonal
    - [] GPS koordináta alapján szűrés

## TODO

- ~~BE image store should be done with ids instead of names~~
- save img w,h to image entity, so loading ghost w,h is good
- ~~create good EXIF extractor~~
- ~~look into Tensorflow - opencv auto image tagging~~
- ~~image masonry loading pulse skeleton, random height thing to different own component~~
- similar images under
- file upload area
