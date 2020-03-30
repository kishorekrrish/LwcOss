// eslint-disable-next-line no-undef
const { Client } = require('pg');
require('dotenv').config();
const jsforce = require('jsforce');
const express = require('express');
module.exports = app => {
    // put your express app logic here
    app.use(express.json());
    app.get('/data/accounts', (req, res) => {
        // do stuff
        let accounts = [];
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
          });
          
          client.connect();
          
          client.query('SELECT sfid,name,controlling_picklist__c,dependent_picklist__c,jobtype__c FROM salesforce.account;', (err, data) => {
            if (err) console.log(err);
            console.log(data.rows);
            accounts = data.rows.map(accountRecord => {
                return {
                    id: accountRecord.sfid,
                    Name: accountRecord.Name,
                    Controlling_Picklist__c: accountRecord.Controlling_Picklist__c,
                    Dependent_Picklist__c: accountRecord.Dependent_Picklist__c,
                    JobType__c: accountRecord.JobType__c
                };
            });
            res.json(accounts);
            client.end();
          });
        
    });
};
