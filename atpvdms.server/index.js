import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import mysql from 'mysql';


dotenv.config();

const app = express();

function connect_to_db() {

    // Database connection configuration
    const connection = mysql.createConnection({
        host: '127.0.0.1:3306',
        user: 'u327081214_atpvdms',
        password: 'iaQwPyKG]OlWcJQa1',
        database: 'u327081214_atpvdms'
    });

    // Connect to the database
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return;
        }
        console.log('Connected to database');

        // Example query
        connection.query('SELECT * FROM your_table', (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                return;
            }

            // Process results
            console.log('Query results:', results);

            // Close connection
            connection.end((err) => {
                if (err) {
                    console.error('Error closing database connection:', err);
                    return;
                }
                console.log('Connection closed');
            });
        });
    });
}

app.use(express.json());
app.use(cors({
    // origin: ['http://127.0.0.1:5500', 'http://localhost:3000'],
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.listen(3002, async () => {
    // connect_to_db();
    console.log(`SERVER_URL: $ {}`);
});