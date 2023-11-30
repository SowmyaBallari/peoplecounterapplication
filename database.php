<?php
$host = "localhost";
$username = "username";
$password = "password";
$dbname = "db_name";

// Create connection
$conn = mysqli_connect($host, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>