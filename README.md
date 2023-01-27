# Szakdolgozat

# Képi adatbázis kezelő weboldal fejlesztése

## Funkciók

- [X] Képfeltöltés
- [X] Címkézés
    - [X] Feltöltéskor
    - [X] Utólagosan
    - [X] Automatikus címkézés
    - [X] Szűrés címkék alapján
- [X] Rendszerezés gyűjteményekbe
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
- ~~searchbar to header, suggest tags, can search for image names~~
- ~~Batchimagerequest tag to tags, exclusive or inclusive search, crossection or union~~
- Dashboard with popular categories, themes, maybe season specific tags
- ~~categories most popular, few preview images in category card~~
- save img w,h to image entity, so loading ghost w,h is good
- ~~like,dislike, comment~~ star/favourite instead
- ~~order by likes/dislikes/comments/upload,date/~~
- filter by date
- create album automatically
- ~~add to collection, like, download on image hover~~
- admin felület, szabályozni dolgokat felbontás,tárhely | free/prémium
- admin usernek végtelen space
- Felhasználói szintek
- ~~Képekre Views, Downloads, Likes~~
- ~~Replace redundant endpoints with rest save~~
- ~~When deleting images remove from collections~~
- webp not compatible yet, is it even needed?
- private/public collection, image accessibility
- edit collections,images
  Collections

- ~~Every user has default liked photos collection~~
- ~~Can create collection~~
- ~~Save to collection button~~
- ~~Can see collections in profile~~
- Can name them
- Can share them -> make privacy public
- ~~Collection data:~~
    - ~~ID~~
    - ~~Name~~
    - ~~imageIds[]~~
    - ~~Owner~~
    - ~~Enum:Private/Public~~
    - ~~Enum: Favourites/Created~~

Image

- Owner ID
- Views count, whenever imageViewDialog is opened with this image
-

User

- Image ID list
- leaflet
- Show tags no currently in use
