PULL the repository on https://github.com/michgboxy2/sentiance

RENAME .env-example file to .env

RUN "npm install"

RUN "npm start" to start the server.

STEPS TO MAKE IT PRODUCTION READY
Implement service workers and handle concurrency better.
Make use of microservice architecture
Implementing a Redis Cache so every query doesn't have to be fetched from the database.

Index Data into an ELK (Elastic search, logstash, Kibana) for faster queries for large data.

///////////////////TIME CONSTRAINT//////////////////
More time would have allowed me time for tests.

////////////////////ASSUMPTIONS///////////////////////
To implement the queries for the list of moments associated to an event, since there is no direct relationship between the moment_history and event history dataset, I made the assumption that the relationship is in the start and end date. Hence the moments for a particular event are the moments that has their start and end date within the event duration.

//////////////////////Technical questions///////////////

1. The most efficient way to store such data is by using a database suited for big queries. Haddop, Cassandra and MongoDB bacause of the inbuilt Geo-spatial system. Also, data indexing with Elasticsearch for quick and easy queries.

The Data will be stored in a GeoJSON standard.

2. B-Tree, map, array, linked list

3. 2017-11-28 09:00:12.078 is my preferred because it is quite sortable as strings and the least ambiguous of all formats.
