# Notes App with Nodejs and Mysql

Notes App is a Multi Page Application using Nodejs and Mysql. The purpose of this web application is just to be an example for beginners.

![](docs/screenshot2.png)
![](docs/screenshot.png)

### Installation
```
mysql -u MYUSR "-pMYPASSWORD" < ./database/db.sql # create database
npm i
npm run build
npm start
```

## File Structure

- database, it the folder with all the sql queries, you can use to recreate the database for this application
- src, it's all the code for the Backend and Frontend Application
- docs

## Environment Variables

- PORT

## Old Versions of this Project

- [version-2018](https://github.com/FaztTech/nodejs-mysql-links/tree/version-2018)

## Todo

1. [x] Improve Links Routes
1. [ ] Write Route Validation with Express Validator
1. [ ] Add docker compose production build
1. [ ] Allows users to signup with email and no username
1. [ ] Add nodemailer for transactional emails

## Tools

- Nodejs
- Mysql
- Babel
- Docker

# Resources

- https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
