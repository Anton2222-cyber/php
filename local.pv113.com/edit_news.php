<?php
global $dbh;
include_once $_SERVER["DOCUMENT_ROOT"] . "/connection_database.php";
// Підключення до бази даних та інші налаштування

// Перевірка, чи переданий ідентифікатор новини
if (!isset($_GET['id'])) {
    // Якщо ідентифікатор не передано, перенаправлення на головну сторінку
    header("Location: /index.php");
    exit();
}

// Отримання ідентифікатора новини
$id = $_GET['id'];

// Отримання даних про новину з бази даних за допомогою підготовленого запиту
$stmt = $dbh->prepare('SELECT * FROM news WHERE id = ?');
$stmt->execute([$id]);
$news = $stmt->fetch(PDO::FETCH_ASSOC);

// Перевірка, чи знайдено новину з заданим ідентифікатором
if (!$news) {
    // Якщо новина не знайдена, перенаправлення на головну сторінку
    header("Location: /index.php");
    exit();
}

// Обробка форми редагування, аналогічно додаванню новин
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $datepublish = $_POST['datepublish'];
    $description = $_POST['description'];

    // Оновлення даних про новину в базі даних
    $stmt = $dbh->prepare("UPDATE news SET name = ?, datepublish = ?, description = ? WHERE id = ?");
    $stmt->execute([$name, $datepublish, $description, $id]);

    // Перенаправлення на головну сторінку
    header("Location: /index.php");
    exit();
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Редагування новини</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
</head>
<body>
<div class="container py-3">
    <?php include_once $_SERVER["DOCUMENT_ROOT"] . "/_header.php"; ?>
    <h1 class="text-center">Редагування новини</h1>

    <!-- Форма для редагування новини -->
    <form method="post" action="">
        <div class="form-group">
            <label for="name">Ім'я:</label>
            <input type="text" class="form-control" id="name" name="name" value="<?= htmlspecialchars($news['name']) ?>" required>
        </div>
        <div class="form-group">
            <label for="datepublish">Дата публікації:</label>
            <input type="datetime-local" class="form-control" id="datepublish" name="datepublish" value="<?= htmlspecialchars($news['datepublish']) ?>" required>
        </div>
        <div class="form-group">
            <label for="description">Опис:</label>
            <textarea class="form-control" id="description" name="description" rows="3" required><?= htmlspecialchars($news['description']) ?></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Зберегти зміни</button>
    </form>
</div>

<script src="/js/bootstrap.bundle.min.js"></script>
</body>
</html>
