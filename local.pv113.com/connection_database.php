<?php
try {
    $dbh = new PDO('mysql:host=localhost;dbname=pv113', "root", "17041976father");
} catch (PDOException $e) {
    echo "Проблема підключення до БД ". $e;
    exit();
}