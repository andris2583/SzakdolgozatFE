# Thesis

# Development of an image database management website

Full stack image image database management website. The client side of the website is implemented as a Single Page Application (SPA) in Angular 14. To create the server-side application, I used Java version 18 programming language and Spring Boot framework. The two parts of the application communicate via REST API. For data storage I used MongoDB NoSQL database. The automatic tagging of images is performed by a ResNet V1 model convolutional neural network, powered by TensorFlow Java.

## Functions

- [X] Image upload
- [X] Tagging
 - [X] When charging
 - [X] After the fact
 - [X] Automatic tagging
 - [X] Filter by tags
- [X] Organizing into collections
- [X] Export to zip file
 - [X] Export Collections
 - [X] Export only selected images
- [X] Image data storage
 - [X] File system
 - [X] Cloud storage
 - [X] Database
- [] User management
 - [X] Private pictures, albums
 - [] Share images between users
 - [X] Publicly viewable images (without login)
- [X] Thumbnail generation
- [X] Image viewer

## Extra functions

- [X] Filters (eg: sepia, vivid, film)
- [X] EXIF ​​information processing
 - [X] Location on the map
 - [X] Timeline
 - Filtering based on [X] GPS coordinates

## TODO

- ~~BE image store should be done with ids instead of names~~
- ~~create good EXIF ​​extractor~~
- ~~look into Tensorflow - opencv auto image tagging~~
- ~~image masonry loading pulse skeleton, random height thing to different own component~~
- ~~similar images under~~
- ~~file upload area~~
- ~~image upload dialog tags for images~~
- ~~image upload dialog preview for images~~
- ~~similar images based on tag, maybe 2-3 tags the match~~
- ~~searchbar to header, suggest tags, can search for image names~~
- ~~Batchimagerequest tag to tags, exclusive or inclusive search, intersection or union~~
- ~~Dashboard with popular categories, themes, maybe season specific tags~~
- ~~categories most popular, few preview images in category card~~
- ~~save img w,h to image entity, so loading ghost w,h is good~~
- ~~like, dislike, comment~~ ~~star/favorite instead~~
- ~~order by likes/dislikes/comments/upload,date/~~
- ~~filter by date~~
- ~~create album automatically~~
- ~~add to collection, like, download on image hover~~
- admin interface, control things resolution, storage | free/premium
- unlimited space for admin user
- User levels
- ~~Views, Downloads, Likes for images~~
- ~~Replace redundant endpoints with rest save~~
- ~~When deleting images removed from collections~~
- ~~private/public collection, image accessibility~~
- ~~edit collections,images~~
- ~~Navigate to specific page of user with dropdown menu~~
- ~~appTag width from px to vw~~
- ~~Routing scrolltop not fucking working~~
- ~~Weird af zindex bug on dashboard header-tag component~~
- ~~leaflet~~
- Show tags not currently in use, but mark them so the user knows they are empty
- ~~randomize tag component images so not always the same~~
- ~~seasonal dashboard image~~
- components not getting destroyed after logout
- share user, ~~link~~
- ~~see other people's profiles~~
- ~~search for others profiles by username~~
- ~~like in imageViewDialog~~
- ~~order by likes or views~~
- ~~Redesign image view dialog~~
- ImageId -> Userid hasaccess map String -> String[]
- ~~update images list when imageuploaddialog emits~~
- ~~Maybe something is buggy with removing images when deleted from collections~~
- ~~Fullscreen image on click~~
- ~~Delete from not dialog view,redirect~~
- ~~Only reload d change if circle is set~~
- Click on filter circle closes tab for some fucking reason
- ~~Clear location filtering~~
- ~~Size limit for users: FREE/PRO/UNLIMITED~~
- ~~Edit profile~~
- ~~Disable upload if storage would be over capacity~~

- ~~selection delete~~

- ~~localStorage updates slowly~~

- ~~Every user has default liked photos collection~~
- ~~Can create collection~~
- ~~Save to collection button~~
- ~~Can see collections in profile~~
- ~~Can name them~~
- ~~Can share them -> make privacy public~~
- ~~Collection data:~~
 - ~~ID~~
 - ~~Name~~
 - ~~imageIds[]~~
 - ~~Owner~~
 - ~~Enum:Private/Public~~
 - ~~Enum: Favorites/Created~~

~~Image~~

- ~~Owner ID~~
- ~~Privacy~~
- Props object -> map str str

- ~~View count Collection id -> count: Map<imageId: String,viewCount: Integer>~~

User

- UserType
- ~~Profile picture based on id save to folder~~
- ~~Profile picture alt when no pf~~

TODO

- ~~Admin page~~
 - ~~Text prop edit~~
 - ~~Enum select edit~~
 - ~~List edit( tag , role, imageIds)~~
- ~~DB generator script~~
- Share directly with users maybe
- Get only tags with 0 < images
