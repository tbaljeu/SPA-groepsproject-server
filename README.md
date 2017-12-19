# Recepten Mongodb Server
Nodejs server, biedt API op een Mongodb database met recept en ingredient informatie.
Dit is dus alleen de back-end. 

## Vooraf
- Nodejs installeren
- Mongodb installeren

## Gebruik
Vanaf command line:
```
npm install
npm start
```
De server runt op [localhost:3000](http://localhost:3000) en op [Heroku](https://node-mongodb-server.herokuapp.com/api/v1/users).

## API Endpoints
Aanroepen van de endpoints kan met [Postman](https://www.getpostman.com/docs/introduction). 

Voorbeelden van endpoints: 
```
Alles ophalen.
GET: http://localhost:3000/api/v1/recipes

Ophalen op ID.
GET: http://localhost:3000/api/v1/recipes/5a1be38516b0c512dcda4fe0

Nieuw recept toevoegen.
POST: http://localhost:3000/api/v1/createrecipe

Recept aanpassen.
PUT: http://localhost:3000/api/v1/editrecipe/5a1be38516b0c512dcda4fe0

Recept verwijderen.
DELETE: http://localhost:3000/api/v1/deleterecipe/5a1be38516b0c512dcda4fe0

## Gemaakt door
- Matthijs Bossier
- Oguzhan Babaarslan
- Bram van de Griend
- Jordy Huijgens