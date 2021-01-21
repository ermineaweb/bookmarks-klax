### Develop

```
cd server && npm run start
cd client && npm run start
```
http://localhost:5500


### Production

```
cd docker && docker-compose --build -up -d
```


### Bookmarks router :
- define API endpoints
- check required params and map them if needed
- send to bookmarks service


### Bookmarks service :
- contains all the logic when Add, Get, Update, Delete a bookmark
- decoupled from the API (we can swap to graphql, fastify...)
- decoupled from database : we can swap database easily without change the logic


### Bookmarks repository :
- CRUD on datas
- implements interface to easily switch database without break anything
