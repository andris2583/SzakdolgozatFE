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
- [X] EXIF információ feldolgozása
    - [] Térképen lokáció
    - [] Idővonal
    - [] GPS koordináta alapján szűrés

## TODO

- ~~BE image store should be done with ids instead of names~~
- ~~create good EXIF extractor~~
- ~~look into Tensorflow - opencv auto image tagging~~
- ~~image masonry loading pulse skeleton, random height thing to different own component~~
- ~~similar images under~~
- ~~file upload area~~
- ~~image upload dialog tags for images~~
- ~~image upload dialog preview for images~~
- ~~similar images based on tag, maybe 2-3 tags the match~~
- searchbar to header, suggest tags, can search for image names
- Batchimagerequest tag to tags, exclusive or inclusive search, crossection or union
- Dashboard with popular categories, themes, maybe season specific tags
- categories most popular, few preview images in category card
- save img w,h to image entity, so loading ghost w,h is good
- like,dislike, comment
- order by likes/dislikes/comments/upload,date/
- filter by date
- create album automatically
- add to collection, like, download on image hover
- admin felület, szabályozni dolgokat felbontás,tárhely | free/prémium
- Felhasználói szintek
- Képekre Views, Downloads, Likes

Collections

- Every user has default liked photos collection
- Save to collection button
- Can see collections in user
- Can name them
- Can share them
- Collection data:
    - ID
    - Name
    - imageIds[]
    - Owner
    - Enum:Private/Public
  



















