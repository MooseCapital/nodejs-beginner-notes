/*
    In mongodb, a document is the basic unit where our json data is stored, a collection is above the document, basically a collection of documents,
        the database is a container for collections.
        database -> collections -> documents(BSON) -> fields
        database -> tables      -> rows            -> columns    sql


    primary key - each document in mongodb requires an _id field that acts as the primary key like in sql.
        -> if it does not have an _id field, it automatically creates it for us.

        ObjectID is a unique data type like uuid in sql, if we do not include _id field, ObjectID is used to automatically make a unique value for us
        if we create _id ourselves, we could make it simple like 1,2,3 or a complicated uuid.

    bson - mongodb documents are displayed in json format, but stored in bson. bson has additional data types like numbers, dates, objectID's

    schema - in sql we declared all the column data types and names before inserting, but in mongo, this is not required
        -> documents in the same collection are not required to have the same data types. in sql tables don't have to be the same either in the same db
            -> but the difference is, when we want to change a data type scheme for a document, we don't need to update any other data.
        -> in our relational sql db, it would be more complicated to alter the tables columns after it has been created.

        -> like in sql, we will have our database created and tables created for the general layout. we do this manually on mongodb website, but when we want to record user data
            -> this is when we will use node to make queries to create new documents in the collections

    Data relationship types - data that is accessed together should be stored together.
        One to One - data entity in one set is connected exactly to one data entity in another set
        One to many - data entity in one set is connected to many data entities in another set.. like an array data type holding other objects of people.
        many to many -

        Embedding - when we take data and put it in the same document
            -> like the array as a value with objects of people inside it, would be one to many above
            -> mongodb recommends embedding, remember this is when all data is in the same document, not referencing another with an id.. this makes getting data faster
            -> we avoid application joins which makes it faster to only query 1 document.
        referencing - when we refer to data in another document in our collection.
            -> the same type of array above, but this time there is no data in the array, simply objectID's that reference another document holding the data
            -> no duplication of data, smaller documents, but takes more resources as we must query multiple documents



    Connecting - to connect to mongodb in nodejs, make sure we have access to .env file with package : require('dotenv').config();
        we go to our cluster -> database -> click connect -> get full code sample from nodejs
        -> now paste the string in our .env file or this would be digitalocean env variables or another way to store
        in .env file..
            MONGODB_URI='mongodb+srv://user:pass@penguincluster1.u1vnogc.mongodb.net/?retryWrites=true&w=majority'

        our connection failed, until we used MONGODB_URI


    network errors - if we get a network error on connecting, we should check in atlas, see if our ip is on the allowed list, such as our vps


*/








