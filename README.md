# Personal Notebook

This is a simple CRUD Rails app that can be deployed Heroku and used as a 
personal encrypted notebook. After creating an account and logging in one adds
a key stored in local storage. This is used to encrypt notes and section 
information before forms are submitted.

Features:

* Update all page; decrypt all and re-encrypt with a new key
* Markdown formatting
* XKCD password generator
* Click to copy line in note
* Hierarchical structure (section < section | note)

## Development

The application is configured for development with Docker and deployment to
Heroku. Only a Postgres database service is required.

```
docker-compose build
docker-compose run app rails db:create db:migrate
docker-compose up
```
