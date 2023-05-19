# REFLECTIZ

The system was built using Nest.js, when they have several different services.
The first one: contains 2 routes, the other one searches for a domain by its name, while the second one creates a new domain in the system.
The second: runs scheduled, every 5 seconds on the new records, and every 10 minutes on all records to get up-to-date information.

## Routes structure

##### GET /domain

        {
            "path": "newdomain.com"
        }

Returns information about a domain with the address newdomain.com. If it does not exist, the object will be added to the DB and at a later stage will be scanned.

##### POST /domain

        {
            "path": "newdomain.com"
        }

Adds the domain to the DB for uploading a scan. The path must be unique - therefore, if it already exists in the DB we will return an error status.

## scheduled

Every 10 seconds we will pull the records whose whoIs and virusTotal are null (new records) and update them.
At the same time, every 10 minutes we will pull out all the records and update them in order to maintain up-to-date information.

## How to run it

First, you need to import the code using git clone and move to a folder on your computer, using cd <path>
It can be run using docker.
Before running, it is important to check that there are env values in the .env file.
for example:

###### .env

    MONGO_DB_URI="mongodb://mongodb:27017/reflectiz"
    WHO_IS_URL="https://www.whoisxmlapi.com/whoisserver/WhoisService"
    WHO_IS_API_KEY=<your_api_key>
    TOTAL_VIRUS_URL="https://www.virustotal.com/api/v3/domains"
    TOTAL_VIRUS_API_KEY=<your_api_key>

Once you've got all the values for your .env file, you can run the code using docker:

    docker-compose up -d --build
