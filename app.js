const mysql = require('mysql');
let express = require('express');
app = express();

app.listen(8080, () => {
    console.log('Server is running on port 3001');
});

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});
//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'evan_db',
    password:'1234'
});
//connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});
app.get('/create', (req, res) => {
    res.send('you have created db!');
//create database
db.query('CREATE DATABASE IF NOT EXISTS evan_db', (err, result) => {
    if (err) throw err;
    console.log('Database created or already exists');
}); 
//use database
db.query('USE evan_db', (err, result) => {
    if (err) throw err;
    console.log('Using evan_db database');
});

let student = `CREATE TABLE IF NOT EXISTS student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(25) NOT NULL,
    lastName VARCHAR(25) NOT NULL,
    department VARCHAR(25) NOT NULL,
    course VARCHAR(25) NOT NULL,
    email VARCHAR(25) NOT NULL UNIQUE   
)`;
let department = `CREATE TABLE IF NOT EXISTS department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES student(student_id)
)`;
let course= `CREATE TABLE IF NOT EXISTS course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
)`;     

db.query(student, (err, result) => {
    if (err) throw err;
    console.log('Student table created or already exists');
});

db.query(department, (err, result) => {
    if (err) throw err;
    console.log('Department table created or already exists');
});

db.query(course, (err, result) => {
    if (err) throw err;
    console.log('Course table created or already exists');  
}); 



// insert multiple data into student table
let Student = `INSERT INTO student (firstName, lastName, department, course, email) VALUES 
('John', 'Doe', 'Computer Science', 'CS101', 'john.doe@example.com'),
('Jane', 'Smith', 'Mathematics', 'MATH101', 'jane.smith@example.com'),
('Alice', 'Johnson', 'Physics', 'PHYS101', 'alice.johnson@example.com'),
('Bob', 'Brown', 'Information Technology', 'IT101', 'bob.brown@example.com'),
('Charlie', 'Davis', 'Biology', 'BIO101', 'charlie.davis@example.com'),
('Diana', 'Miller', 'Chemistry', 'CHEM101', 'diana.miller@example.com'),
('Ethan', 'Wilson', 'Economics', 'ECON101', 'ethan.wilson@example.com')`;


let departments = `INSERT INTO department (name, student_id) VALUES 
('Computer Science', 1),('Mathematics', 2),('Physics', 3),('Information Technology', 4),('Biology', 5),('Chemistry', 6),('Economics', 7) `;   
let coursed= `INSERT INTO course (name, department_id) VALUES 
('CS101', 1),('MATH101', 2),('PHYS101', 3),('IT101', 4),('CS102', 1),('MATH102', 2)`; 

db.query(Student, (err, result) => {
    if (err) throw err;
    console.log('Sample data inserted into student table');
});

db.query(departments, (err, result) => {
    if (err) throw err;
    console.log('Sample data inserted into department table');
});

db.query(coursed, (err, result) => {
    if (err) throw err;
    console.log('Sample data inserted into course table');
}); 




res.send('Database and tables created, sample data inserted.');
console.log('you have created db!');  


});


app.get('/data', (req, res) => {
    db.query('CREATE DATABASE IF NOT EXISTS evan_db', (err, result) => {
    if (err) throw err;
}); 
//use database
db.query('USE evan_db', (err, result) => {
    if (err) throw err;
    console.log('Using evan_db database');
});
//select data who take two courses
    let sql = `SELECT s.firstName, s.lastName, COUNT(c.course_id) AS course_count
    FROM student s
    JOIN department d ON s.student_id = d.student_id
    JOIN course c ON d.department_id = c.department_id
    GROUP BY s.student_id
    HAVING course_count >= 2`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
res.send('Database and tables created, sample data inserted.');
console.log('you have created db!');  
});