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

        create table - Note instead of making an id ourselves, we can set it to auto increment, it means id starts at 1,
            then counts when new rows get added, 1,2,3..

                CREATE TABLE people (id PRIMARY KEY, name varchar(255), age int)
                CREATE TABLE people (id PRIMARY KEY AUTO_INCREMENT, name varchar(255), age int)


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
        LIKE - equal sign alternative, 1 LIKE 1 -> true
        ORDER BY - sorting
        LIMIT - limit number of rows we get back, if its large amount.. get smaller amount
        GROUP BY -

        WHERE - filter values specifically, put in single quotes for comparing text values.
            SELECT * FROM people WHERE favorite_color = 'blue'; -> we get every row that has 'blue' for favorite color,  26 rows listed
            SELECT COUNT(*) FROM people WHERE favorite_color = 'blue'; -> count how many rows count 'blue' for favorite color - 26




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












*/
