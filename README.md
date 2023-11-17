# SMIS API
A Nest.js based SMIS API for Cairo Traffic.
![Logo](https://user-images.githubusercontent.com/65346053/274320823-e043e98f-5887-4805-973a-80053e0f6917.png)

## Information
SMIS API is an information system api to handle a lot of things:

* Tracks all soldiers gate logs like all exits and enters with date time and the type of the log such as service, holiday ...etc.
* Manages all soldiers data and images, data like soldiers info (name, national_id, date of birth, governorate ...etc) and enrollment info that has all the soldier info that belongs to Cairo Traffic like (date of enrollment, police number, unit, unit job ...etc).
* Manages also the rating of soldiers wich allow us to know more about the manners of each soldier.
* Archives all the soldiers, it does not has the current serving soldiers only it also has all the soldier that served in Cairo Traffic, all the info and images.
* Holds the names, phones and ranks of all the police officers of Cairo Traffic.


## How To Run

#### 1. Clone the project to your device.

#### 2. Make sure you have node.js on your device .

##### Download [Node.js](quora.com/profile/Ashish-Kulkarni-100)
#### 3. Install all the dependencies.

```bash
  npm install
```

#### 4. Run the main file.

```bash
  npm run start
```
or if you want to run in dev mode.    

```bash
  npm run start:dev
```
## Environment Variables

Make sure to add the following environment variables to your .env file.

`TYPE`\
`HOST`\
`PORT`\
`DATABASE_USERNAME`\
`DATABASE_PASSWORD`\
`DATABASE_NAME`
## Database
The SMIS API uses TypeORM and we used Mysql database with it.\
\
Why Mysql?\
MySQL is fast, reliable, scalable, and easy to use. It was originally developed to handle large databases quickly and has been used in highly demanding production environments for many years.\
\
MySQL’s key benefits:

* Ease of use: Developers can install MySQL in minutes, and the database is easy to manage.

* Reliability: MySQL is one of the most mature and widely used databases. It has been tested in a wide variety of scenarios for more than 25 years, including by many of the world’s largest companies. Organizations depend on MySQL to run business-critical applications because of its reliability.

* Scalability: MySQL scales to meet the demands of the most accessed applications. MySQL’s native replication architecture enables organizations such as Facebook to scale applications to support billions of users.

* Performance: MySQL HeatWave is faster and less expensive than other database services, as demonstrated by multiple standard industry benchmarks, including TPC-H, TPC-DS, and CH-benCHmark.

* High availability: MySQL delivers a complete set of native, fully integrated replication technologies for high availability and disaster recovery. For business-critical applications, and to meet service-level agreement commitments, customers can achieve

* Flexibility: The MySQL Document Store gives users maximum flexibility in developing traditional SQL and NoSQL schema-free database applications. Developers can mix and match relational data and JSON documents in the same database and application.

## ERD
![Image](https://github.com/DresdRam/SMIS-Nest/assets/65346053/a7df577e-d138-41f4-9856-3b7782727254)
