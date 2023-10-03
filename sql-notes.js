/*
    A single table will NOT have all our information in 1
    we will split up big data groups in its own table and match them by id's
        This means users will have some id for their car and pc. we do NOT show all details of their car and pc in the user's row
        That would be crazy complicated, we're going another table deep. the id of users car and pc will be in their own car table and pc table.
        Then the car table would have a column for model, year, miles.. etc. we separate the data!


        database - structured set of data in a computer;

        relational db - database organized according to the relational model of data. In simple terms, the relational model defines a set of relations
            for tables. These use a Relational Database management system (RDBMS) EX. mysql, sqlite, postgresql.

        Primary key - table can only have a single primary key, must be unique. used to identity each row data in the database.

        SQL - structured query language, programming language used to communicate with relational databases.
        https://www.w3schools.com/sql/default.asp



    To connect sql to nodejs, we have something like np for postgresql, https://node-postgres.com/ for raw queries.
        npm install np

    Objection js will use the knex ORM, using ORMS, we still need to install the node/sql connection for the sql db were using like mysql, postgresql, sqllite..
        npm install np or mysql or mysql2 or sqlite3
    Knex js if we don't need more powerful objection js https://knexjs.org/
    or we let an ORM make them for us, but we still need to know sql https://vincit.github.io/objection.js/guide/getting-started.html
            npm install objection knex


SQL CODE:
      TABLE creating / modifying
        create table - Note instead of making an id ourselves, we can set it to auto increment, it means id starts at 1,
            then counts when new rows get added, 1,2,3..

                CREATE TABLE people (id PRIMARY KEY, name varchar(255), age int)
                CREATE TABLE people (id PRIMARY KEY AUTO_INCREMENT, name varchar(255), age int)

        Table data types -
            BLOB - binary data type
            INTEGER - number
            NUMERIC - date/time in standardized format, YYYY-MM-DD
            REAL - decimal point number
            TEXT - string text
            UUID - type in PostgreSQL for uuids - https://www.cockroachlabs.com/docs/stable/uuid#create-a-table-with-auto-generated-unique-row-ids
            NOT NULL - will give error if we don't input value or put in null when inserting, this helps if cell can NOT be blank
            UNIQUE - when we want to make sure any value in column is truly unique, like email address, ssn.. etc

            PRIMARY KEY - constraint uniquely identifies each record in a table. no null values
                -> inserting in table could look like, ID int NOT NULL PRIMARY KEY,

            FOREIGN KEY - field in 1 table that references a PRIMARY KEY in another table
                FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
                ->Using a foreign key constraint helps us ensure that only data that can be linked to the
                    -> referenced table can be entered into our database.
                -> if we do NOT use foreign keys and need matching tables to connect data. we could mistype text and it would be inserted
                    ->where a foreign key will make sure the data is EXACTLY in the other table to insert


        insert new row into table -
             INSERT INTO table_name (id_num, 'bob', 33, 'cool')

            -> we do not need to say the column names, but the values must be in the correct order, we can also say the columns though, we are repeating ourselves.
                INSERT INTO table_name (column_id, name, age , isLame) VALUES (10, 'gary', 34, 'lame')

            -> when inserting with AUTO_INCREMENT, we don't need to name the primary key column if using column names to insert.
                INSERT INTO table_name (name, age , isLame) VALUES (10, 'gary', 34, 'lame')

            -> when inserting, but we DONT have data for all columns, we can just leave it out when naming columns or not. the empty cells simply say "NULL"
               -> see how it's auto incrementing ID, and we left out the 'lame' column value

                INSERT INTO table_name (name, age) VALUES ('gary', 34)

            -> insert multiple rows at once, if we have our format right, no need to retype INSERT INTO again.. simply repeat the values data, separate by comma,
                -> then end with semicolon like always.

                INSERT INTO table_name (name, age , isLame)
                VALUES
                    ( 'gary', 34, 'lame'),
                    ( 'bob', 44, 'cool'),
                    ( 'sara', 24, 'lame');



        Table db design - determine if we have 1 to 1 relationship, 1 to many, many to many etc..
            we use multiple tables when a cell might need more than 1 value, such as the imdb example in cs50.
            an actor/person has 1 id, if we put shows as a column then we only have room for 1 tv show/person.
            -> but if we make shows it's own table, we can have the show info and show id
            -> then in another star table, match show id to many person id, this way, we're not repeating show info.
            -> of course, in stars table, we are repeating tv shows id, to many person_id, since many people are in the show to match with it.
                -> doing this, the stars table has 2 columns, it simply exist to match show_id to person_id,

            the teacher now uses sub queries from multiple databases, since we must query data from multiple dbs, we search all comedy id's
                -> then must search those show table by show_id's to get the shows title column for all comedies.
                    SELECT title from shows where id IN(SELECT show_id FROM genres WHERE genre = 'comedy')
                -> good practice is to never type in any id's or anything, we should always be querying/searching, not hard coding values in a search

                -> 1) we perform 3 query's in 1 to match foreign keys in tables. That finally gets us a column with text that is NOT an id. woo
                    SELECT title FROM shows WHERE id IN (SELECT show_id FROM stars WHERE person_id = (SELECT id FROM people WHERE name = 'Steve Carell'))

                -> 2) we can repeat the query above in another way, using JOINS basically joining, people id, stars id, show id columns
                    -> Implicit way, tell sql join and it does, next is explicit, where we match the data exactly, not JOIN for us..
                        SELECT title FROM people
                            INNER JOIN stars ON people.id = stars.person_id
                            INNER JOIN shows on stars.show_id = shows.id
                            WHERE name = 'Steve Carel';

                -> 3) Explicit way, we tell sql exactly where to select title column, and to match id = other tables id
                        -> we will mostly be using INNER JOIN rather than this explicit way, because JOINS are easier to read when the query gets very long
                            SELECT title from people, stars, shows
                                WHERE people.id = stars.person_id
                                AND stars.show_id = shows.id
                                AND name = 'Steve Carell';


        id random number - for our primary key every row must be unique, if we autoincrement, then we get 1,2,3.. but we don't want the first users to see in
            the pages route that they are user number 5.. oof. so we generate big numbers with almost infinite combinations using UUID.v4()
            "we have X users, store Y documents and this specific medical function has been called Z number of times".
            You use random IDs (normally UUIDs) to avoid leaking data you don't intend to share publicly.
            UUIDv4 - npm i uuid   https://www.npmjs.com/package/uuid
            https://www.cockroachlabs.com/blog/what-is-a-uuid/
            -> when connecting multiple tables, those ids when AUTOINCREMENT will overlap.. not good


        CHAR vs VARCHAR - the type of data into the column for sql, Character vs variable character
            CHAR - fixed length, if we have CHAR(10) and "mike" goes in there, it uses 6 empty bytes of space.. oof.
                storage size is of length we set in CHAR(#)
            VARCHAR - variable length, if we have VARCHAR(10) and "bob" goes inserted, it uses only 3 bytes of space.
                storage size is the actual length of string inputted.

                use CHAR when we expect the same length every time like preset form options. such as state codes, always 2: CA,AL,TX..
                VARCHAR without () parenthesis will give us 8000 byte max for data.

                we can NOT simply always use VARCHAR since it uses more cpu cycles, it will slow us down more than CHAR when we can use it
                    -> this means the database must check the data's length as well as content when searching. vs CHAR() telling the db its length.


        TABLE - add, rename, update, delete/drop https://www.w3schools.com/sql/sql_alter.asp
                ALTER TABLE table_name ADD column_name datatype;


    Column creating / modifying

        SELECT columns - SELECT * -> star/asterisk means all columns, basically select the entire db
                SELECT * FROM table_name
            -> since we know we can select individual columns, we get first_name column only and all its rows
                SELECT first_name FROM people

        Most useful SQL functions - must call var inside their parenthesis COUNT(*)
            AVG - gets average of all numbers in column, if any text it gives 0
            COUNT - count all rows in a column or entire db * (same number)
            DISTINCT - gets all unique values, and puts overlaps them into columns, basically filters down and combines
            LOWER
            MAX - gives largest number value in a column, if text only, it gives alphabetical order closest to Z.
            MIN - gives smallest number value in column, if text only, it gives alphabetical order closest to A.
            UPPER

        DISTINCT - gives each Unique value in a column, the country gave us 40 rows, so we know there are 40 countries
            -> but we want to COUNT that in the future, remember distinct is counting overlapping unique values
            SELECT DISTINCT (country) FROM people

        COUNT - counts the number of rows in a column, combine with filtered data or we will always get the total
           -> number of rows in the db.. not that useful. so we combine with DISTINCT!
            SELECT count(country) FROM people  -> asterisk and any column gives the SAME amount, need to filter!!
            SELECT COUNT(DISTINCT(country)) FROM people -> instead of the a big row of 40 countries listed, we now count 40 unique countries

            -> since we are counting the column header is our query - Count(Distinct(country)) we can rename this using "as"
                SELECT COUNT(DISTINCT(country)) AS countryCount FROM people




        AS - rename your column name in query, technically creates alias for the column
            SELECT COUNT(DISTINCT(country)) AS countryCount FROM people

        WHERE - lets us filter data WHERE a condition is true, Distinct only got unique values, now we PICK what value to filter by!
        LIKE - instead of searching exactly, we can search for starting letter etc.. like regex pattern in javascript
        ORDER BY - sorting use, ORDER BY (column_name) ASC if going to biggest, or DESC if starting big to smallest.
        LIMIT - limit number of rows we get back, if its large amount.. get smaller amount
        GROUP BY -

        WHERE - filter values specifically, put in single quotes for comparing text values. Operators used with 'WHERE' -> =, >, <, >=, <= ,
            <> means not equal, some sql versions use js standard !=   , BETWEEN -> between a certain range, between seems to simplify using a combination > and <
            LIKE -> search for a pattern,  IN ->to specify multiple possible values for a column
            SELECT * FROM people WHERE favorite_color = 'blue'; -> we get every row that has 'blue' for favorite color,  26 rows listed
            SELECT COUNT(*) FROM people WHERE favorite_color = 'blue'; -> count how many rows count 'blue' for favorite color - 26

        BETWEEN - gives values within a range
            SELECT column_name(s) FROM table_name WHERE column_name BETWEEN value1 AND value2;
            -> example query, we can also use NOT, so it's outside the range, not inside it.. or between it
                SELECT * FROM Products WHERE Price NOT BETWEEN 10 AND 20;
            -> we combine a between query and 'IN' for multiple options, ages 20-40 while checking for favorite colors that aren't purple or blue.
                SELECT * FROM people WHERE age BETWEEN 20 AND 40 AND favorite_color NOT IN ('purple', 'blue');


        IN - lets us select multiple values in a WHERE condition, so we have more options easily
            -> it's a shorthand for 'or' operator,
                SELECT * FROM people WHERE country = 'Russia' OR country = 'China';
                SELECT * FROM people WHERE country IN ('Russia', 'China');
            -> notice we are typing out all the options inside IN.. we can make this even simpler using sub-query, query inside query
                -> notice we are checking the orders table if our customer is in there, to see if they have ordered. works with multiple tables only.
                    -> to check if our data is somewhere else,
                SELECT * FROM Customers WHERE CustomerID IN (SELECT CustomerID FROM Orders);



        LIKE - pattern for searching not exact values, such as city names starting with B. https://www.w3schools.com/sql/sql_like.asp
            -> use in combination with wildcards for more regex like patterns https://www.w3schools.com/sql/sql_wildcards.asp
            -> percent % sign can represent, 0,1, or more character,
            -> _ underscore sign can represent only one character

            -> this simply searches for country starting with C, no defined length
                SELECT * FROM people WHERE country LIKE 'C%';
            -> underscore can define a max length for us, here we don't search exact names, but first names with 4 letters only
                SELECT * FROM people WHERE first_name LIKE '____';



        GROUP BY - we select multiple columns and group it by one, earlier if we SELECT COUNT(color) -> we simply get 1 columns with counts of all colors
            -> this data does NOT tell us much because we get the counts but I don't know which colors have the counts, so i need another column to tell me
                -> we must GROUP BY the same column we select to get relevant data, or else were shown data that is not the same column we select, not useful..
                SELECT gender, count(*) FROM people GROUP BY gender;

        ORDER BY - sort a list
            -> we get 2 columns, gender and the count of each in 2nd column, then order least to greatest count.
            -> we could also order by gender, going from a-z, but the numbers are now no longer least to greatest..
            SELECT gender, count(*) FROM people GROUP BY gender ORDER BY count(*);

        LIMIT - we saw how to sort columns above with order by, now LIMIT simply limits the amount of results back
            -> we would likely want to sort before limiting such as, big to small, now limit 1 gives us the row with highest number in something.. etc
            -> not DESC order and LIMIT 1, top gender counted
            SELECT gender, count(*) FROM people GROUP BY gender ORDER BY count(*) DESC LIMIT 1;

        UPDATE - almost what it says it is. we update values. **NOTE this is destructive we are replacing values in the DB, we should have backups  https://www.w3schools.com/sql/sql_update.asp
                    UPDATE table_name SET column 1 = value, column2 = value, WHERE condition = otherValue;
            -> basically select rows where certain condition, now overwrite certain column data on these selected rows, its a "find and replace"
            -> if we omit the WHERE clause, all records will be updated!
            **ALWAYS BACK UP data since we can override data if we forget WHERE condition!

            -> we set all favorite_color to purple, on only female genders * we typed 'female' first, case-sensitive always!
            UPDATE people SET favorite_color = 'purple' WHERE gender = 'Female';

        DELETE - delete records like UPDATE updates them.
            -> this deletes ALL records where condition is true, if condition is omitted, ALL records will be deleted
                -> **always make backups, usually you will probably not delete a users row, but simply updated some "isDeleted" column to true/false
            DELETE FROM table_name WHERE condition;
            DELETE FROM people WHERE id = 1;

            Delete entire table - DROP TABLE table_name

        AND - just like the && javascript, both checks 2 statements now instead of only one in where
            -> we combine 2 conditions with where
                SELECT * FROM people WHERE favorite_color = 'red' AND gender = 'Female';
            -> we now combine 3 conditions with WHERE and multiple operators
                SELECT * FROM people WHERE favorite_color = 'red' AND gender = 'Female' AND age > 50;

        UNION - combine results from two or more SELECT statements and get the column in common from them
            this is NOT like join, joins gets us the columns we want to combine from multiple tables
            -> where UNION gives us only the matching data columns from both tables.
                SELECT City FROM Customers UNION ALL SELECT City FROM Suppliers;

        EXIST - return matching columns if record exist, we can use server validation then possibly check if the email is already registered in the database
            -> basically like joins https://www.techonthenet.com/sql/exists.php
            SELECT column_name(s) FROM table_name WHERE EXISTS (SELECT column_name FROM table_name WHERE condition);



        JOIN - combine rows from 2 or more columns based on data between them, likely the primary key/ foreign key that matches and other stuff
              -> here we combine data with the same id, but we select everything, so there are 2 columns showing same id, peoplehalf1.id & peoplehalf2.id
                    SELECT * FROM peoplehalf1 JOIN peoplehalf2 on peoplehalf1.id = peoplehalf2.id;
              -> combine same data now both tables are joined, filter it down by shirt size
                    SELECT * FROM peoplehalf1 JOIN peoplehalf2 on peoplehalf1.id = peoplehalf2.id WHERE shirt_size = 'M';
              -> make a join that might need 2 conditions, see buyers price range and homes for sale table..
                    -> we've joined 2 tables by BETWEEN condition, not id = id,
                    -> we also used table alias's to save alot of typing. write the alias letter after JOIN and FROM table name
                    SELECT h.price, h.id FROM buyers b JOIN houses h ON h.price BETWEEN b.min_price AND b.max_price

              -> column alias, since inner JOINS will give us multiple id columns when matching by id, we either select * simply,
                -> or select each individual column we want. we select each column which is longer, and also use alias to reduce typing.
                -> we exclude the duplicate 2nd id, then rename table 1 id to simply 'id' and not peoplehalf1.id
                     SELECT p1.id AS id, p1.first_name, p1.gender, p1.country, p1.race,
                            p2.color, p2.icecream, p2.shirt_size, p2.car
                         FROM peoplehalf1 p1
                         JOIN peoplehalf2 p2
                            ON p1.id = p2.id;

        INDEX - makes searching in the db more quickly, by turning our data from a list, to a node tree https://use-the-index-luke.com/
            -> the tradeoffs are more storage space to create this, and it slows down writes, in a big db, this storage space can be too expensive
            ->
                CREATE INDEX index_name ON table_name (column1, column2);
            -> delete index
                DROP INDEX index_name ON table_name;

        TRANSACTION - multiple queries that must happen after another and not be interupted https://www.cockroachlabs.com/docs/stable/transactions




        Injection attacks - https://www.w3schools.com/sql/sql_injection.asp
            using single quotes to input variables leaves room for the user to input email in single quotes
            -> then the attacker can put sql code to run in single quotes.
                https://www.comparitech.com/blog/information-security/sql-injection-prevention-tips-for-web-programmers/
                https://snyk.io/blog/sql-injection-cheat-sheet/
            -> using placeholders combined with server size text validation will help big.

        CHAR vs VARCHAR - the type of data into the column for sql, Character vs variable character
            CHAR - fixed length, if we have CHAR(10) and "mike" goes in there, it uses 6 empty bytes of space.. oof.
                storage size is of length we set in CHAR(#)
            VARCHAR - variable length, if we have VARCHAR(10) and "bob" goes inserted, it uses only 3 bytes of space.
                storage size is the actual length of string inputted.

                use CHAR when we expect the same length every time like preset form options. such as state codes, always 2: CA,AL,TX..
                VARCHAR without () parenthesis will give us 8000 byte max for data.

                we can NOT simply always use VARCHAR since it uses more cpu cycles, it will slow us down more than CHAR when we can use it
                    -> this means the database must check the data's length as well as content when searching. vs CHAR() telling the db its length.



        CockroachLabs DB - settings up and important things to remember
            JSON data in a column - https://www.cockroachlabs.com/docs/v23.1/jsonb#create-a-table-with-a-jsonb-column

            Default values constraint(like foreign key constraint) - when creating the table, this is a constraint, so if we forget a value our set default goes in it's place, but if
                -> we explicitly set NULL value, it can still be null. usually, if we forget a value then NULL will be the value https://www.cockroachlabs.com/docs/v23.1/default-value

            CHECK constraint - we can make sure a value going into column is a certain value or between a range, etc.. we probably want to validate in nodejs before this
                -> but can also use this validation for certain values as well https://www.cockroachlabs.com/docs/v23.1/check
                    warranty_period INT CHECK (warranty_period BETWEEN 0 AND 24)

            serverless functions - since we might not have our own server, these functions need to reconnect again and again, so the solution might be a pool
                -> this will help serverless stay connected to cockroachdb https://www.cockroachlabs.com/docs/stable/serverless-function-best-practices

            CASCADE - when using foreign key references to ids in other tables, we might update or delete these values. Cascade lets us
                -> update/delete all matching values, when one is changed/deleted  https://www.cockroachlabs.com/blog/what-is-a-foreign-key/#so-what-is-the-actual-benefit-of-using-foreign-keys

            Performance main read -> https://www.cockroachlabs.com/docs/stable/make-queries-fast
            performance -> NOT NULL Joining foreign keys -when joining we can add NOT NULL for performance gains https://www.cockroachlabs.com/blog/performance-benefits-of-not-null-constraints/
             UUID -> generate UUID when making the table,    id UUID NOT NULL DEFAULT gen_random_uuid()

            Regions -regions are used to make sure we have our database close to us as possible, also cockroachdb gives us backups in case the db goes offline so
                there is never any downtime
                -> check regions for cluster or database  https://www.cockroachlabs.com/docs/v23.1/show-regions#response
                    -> we only specified 1 region when making the cluster, and nothing special when making our tables.
                    -> and we get this back from cluster region search gcp-us-east1 ["gcp-us-east1-b","gcp-us-east1-c","gcp-us-east1-d"]

                Global tables -  will reduce reads as it gives us regions everwhere but now.. every time we write data we have to write to every db everywhere
                    -> basically use global if we rarely have to write data and need it available to all regions. https://www.cockroachlabs.com/docs/v23.1/table-localities
                    cons: writes incur higher latencies from any given region

                regional table - when application requires low latency reads from a single region. Think about where the customers for our product are,
                    -> if they are US only, then global doesn't make sense.

                *set Regions - Cockroachdb gives us 3 zones where our db is stored, if there are any failures, our data is act risk.
                    -> in production we might want to up the amount of regions our data is stored   https://www.cockroachlabs.com/docs/v23.1/multiregion-survival-goals#when-to-use-zone-vs-region-survival-goals
                    cons: increases write time, since we now have 9 instead of 3, ou will pay additional write latency in exchange for the increased resiliency.
                    pros: we get more stability

                    -> our cluster MUST have multi regions before we can add this to the databases in the cluster
                        -> determine if we will have global customers or us only.
                            https://www.cockroachlabs.com/blog/build-a-highly-available-multi-region-database/
                            https://www.cockroachlabs.com/docs/v23.1/alter-database#set-secondary-region
                            https://www.cockroachlabs.com/docs/stable/show-regions

                         1) we need multiple regions on a cluster, preferably pick 3 when creating it
                         2) now we add a primary region from cluster to db, and add other 2 regions to the db
                                ALTER DATABASE defaultdb PRIMARY REGION "gcp-us-east1";
                                ALTER DATABASE defaultdb ADD REGION "gcp-us-west2";
                                ALTER DATABASE defaultdb ADD REGION "gcp-us-central1";
                                ALTER DATABASE defaultdb SET SECONDARY REGION "gcp-us-central1";
                                SHOW REGIONS FROM DATABASE defaultdb;
                            SHOW REGIONS FROM DATABASE defaultdb;
                            -> now regions should show up in the database
                                 https://www.cockroachlabs.com/docs/stable/multiregion-survival-goals
                            Zone failures - the default for multi region dbs are zone survival, which means if one zone fails, we use another, potentially go down if multiple
                                zones in a region fail as well. we can choose region survival, but this makes writes much slower as we now write to many different regions
                        3) ALTER DATABASE db_name SURVIVE REGION FAILURE;
                            -> now we have 2 backups on primary region, 2 on secondary and 1 on 3rd
                                https://www.cockroachlabs.com/blog/build-a-highly-available-multi-region-database/


                                SHOW SURVIVAL GOAL FROM DATABASE db_name

                        4) when we now have different regions, by default our tables locality is region by table, that means people closer
                            -> to our main table will load faster, we can use region by row, so each individual row query loads from database closer to the user
                                -> global region makes every region in the db 'home', this makes writes much slower, since ALL regions must be written to every time
                                -> use this for low writing/editing websites.. but it gives fast reads anywhere in our region list

                                -> we will likely use region by row for all around the us.
                                https://www.cockroachlabs.com/docs/stable/table-localities#regional-tables
                            https://www.cockroachlabs.com/blog/regional-by-row/
                    -> You can add up to six regions at a time and change your primary region through the Cloud Console. You cannot currently edit the region
                        -> configuration for a single-region cluster once it has been created, and you cannot remove a region once it has been added


                Backups of our own db - https://www.cockroachlabs.com/docs/cockroachcloud/take-and-restore-customer-owned-backups


                IF - not exactly like js, but similar to a ternary, giving us 2 options in parenthesis https://www.w3schools.com/sql/func_mysql_if.asp
                            IF(condition, value_if_true, value_if_false)
                            -> we combine to validate if table exist, if not, then create it
                        CREATE TABLE IF NOT EXISTS accounts (id INT8 PRIMARY KEY, balance DECIMAL);


























*/
