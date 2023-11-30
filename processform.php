<?php
ini_set('session.gc_maxlifetime', 86400);
// Connect to the database
include_once 'new_database.php';
date_default_timezone_set('America/Los_Angeles');
$data = json_decode(file_get_contents('php://input'), true);
foreach($data as $row){
    $room = $row['room'];
    $count = $row['count'];
    $date = date("YYYY-MM-DD");
    $employeeName = $row['employeeName'];
    $current_time = date("H:i:s");
    
    $countVar = $count;
  if($countVar === NULL) {
    $countStr = "NULL";
  } else {
    $countStr = "'$countVar'";
  } 

    $sql = "INSERT INTO new_headcounts (Location, Headcount, Date,Time,Employee_Name) VALUES ('$room', $countStr, NOW(),'$current_time','$employeeName')";

    if ($conn->query($sql) === TRUE) {
        $response = array("success" => true);
          
      
    } else {
        $response = array("success" => false, "error" => $conn->error);
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>