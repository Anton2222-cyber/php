<?php global $dbh; ?>
<?php
include_once $_SERVER["DOCUMENT_ROOT"] . "/connection_database.php"; // Включіть файл з налаштуваннями бази даних

// Перевірте, чи надіслана форма
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Отримайте дані з форми
    $name = $_POST['name'];
    $datepublish = $_POST['datepublish'];
    $description = $_POST['description'];

    // Вставте дані в базу даних
    $stmt = $dbh->prepare("INSERT INTO news (name, datepublish, description) VALUES (?, ?, ?)");
    $stmt->execute([$name, $datepublish, $description]);

    // Перенаправлення на головну сторінку
    header("Location: /index.php");
    exit(); // Важливо викликати exit, щоб гарантувати, що немає інших виведених даних, які можуть нарушити перенаправлення
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Сенонд хенд</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
</head>
<body>
<div class="container py-3">
    <?php include_once $_SERVER["DOCUMENT_ROOT"] . "/_header.php"; ?>
    <h1 class="text-center">Додати новину</h1>

    <!-- Форма для додавання даних -->
    <form method="post" action="">
        <div class="form-group">
            <label for="name">Ім'я:</label>
            <input type="text" class="form-control" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="datepublish">Дата публікації:</label>
            <input type="datetime-local" class="form-control" id="datepublish" name="datepublish" required>
        </div>
        <div class="form-group">
            <label for="description">Опис:</label>
            <textarea class="form-control" id="description" name="description" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Додати</button>
    </form>
</div>

<script src="/js/bootstrap.bundle.min.js"></script>
</body>
</html>
