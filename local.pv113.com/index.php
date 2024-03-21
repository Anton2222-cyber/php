<?php global $dbh; ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Новини</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
</head>
<body>
<div class="container py-3">
    <?php include_once $_SERVER["DOCUMENT_ROOT"] . "/_header.php"; ?>
    <a href="/addnews.php" class="btn btn-success">Додати новину</a>
    <h1 class="text-center">Актуальні новини</h1>

    <?php include_once $_SERVER["DOCUMENT_ROOT"] . "/connection_database.php"; ?>

    <table class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Назва</th>
            <th scope="col">Дата</th>
            <th scope="col">Опис</th>
            <th scope="col">Дії</th> <!-- Додано новий стовпець для кнопок -->
        </tr>
        </thead>
        <tbody>
        <?php
        // Виконайте підготовку запиту і виконайте його
        $stmt = $dbh->query('SELECT * FROM news');
        // Отримайте всі рядки у вигляді асоціативного масиву
        $rows = $stmt->fetchAll();
        foreach ($rows as $row) {
            $id = $row["id"];
            $name = $row["name"];
            $datepublish = $row["datepublish"];
            $description = $row["description"];
            echo "
    <tr>
        <th scope='row'>$id</th>
        <td>$name</td>
        <td>$datepublish</td>
        <td>$description</td>
        <td>
            <a href='/edit_news.php?id=$id' class='btn btn-primary'>Редагувати</a>
            <button class='btn btn-danger' onclick='deleteNews($id)'>Видалити</button>
        </td>
    </tr>
        ";
        }
        ?>
        </tbody>
    </table>
</div>

<script src="/js/bootstrap.bundle.min.js"></script>
<script>
    function deleteNews(id) {
        if (confirm('Ви впевнені, що хочете видалити цю новину?')) {
            // Створення AJAX-запиту
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/delete_news.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Перенаправлення на головну сторінку після видалення
                    window.location.href = "/index.php";
                }
            };
            // Відправлення ідентифікатора новини як параметр POST
            xhr.send("id=" + id);
        }
    }
</script>
</body>
</html>
