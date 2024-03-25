<?php
global $dbh;
include_once $_SERVER["DOCUMENT_ROOT"] . "/connection_database.php"; // Включіть файл з налаштуваннями бази даних
include_once $_SERVER["DOCUMENT_ROOT"] . "/config/constants.php";

// Визначте змінну для зберігання повідомлення про помилку
$error_message = "";

// Перевірте, чи надіслана форма
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Отримайте дані з форми
    $name = $_POST['name'];
    $datepublish = $_POST['datepublish'];
    $description = $_POST['description'];
    $image = $_FILES["image"];

    // Перевірка наявності новини з такою ж назвою
    $stmt = $dbh->prepare('SELECT COUNT(*) FROM news WHERE name = ?');
    $stmt->execute([$name]);
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        // Якщо новина з такою назвою вже існує, встановіть повідомлення про помилку
        $error_message = "Новина з такою назвою вже існує!";
    } else {
        $folderName = $_SERVER['DOCUMENT_ROOT'].'/'.UPLOADING;
        if(!file_exists($folderName)){
            mkdir($folderName, 0777);
        }
        $image_save = "";
        if(isset($_FILES['image']))
        {
            //унікальна назва файлу
            $image_save = uniqid().'.'.pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
            $path_save =$folderName.'/'.$image_save;
            move_uploaded_file($_FILES['image']['tmp_name'], $path_save);
        }

        // Вставте дані в базу даних
        $stmt = $dbh->prepare("INSERT INTO news (name, datepublish, description, image) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $datepublish, $description, $image_save]);

        $lastInsertedId = $dbh->lastInsertId();
        // Перенаправлення на головну сторінку
        header("Location: /?id=".$lastInsertedId);
        exit(); // Важливо викликати exit, щоб гарантувати, що немає інших виведених даних, які можуть нарушити перенаправлення
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Додати новину</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
</head>
<body>
<div class="container py-3">
    <?php include_once $_SERVER["DOCUMENT_ROOT"] . "/_header.php"; ?>
    <h1 class="text-center">Додати новину</h1>

    <!-- Повідомлення про помилку -->
    <?php if ($error_message !== ""): ?>
        <div class="alert alert-danger" role="alert">
            <?php echo $error_message; ?>
        </div>
    <?php endif; ?>

    <!-- Форма для додавання даних -->
    <form method="post" enctype="multipart/form-data" action="">
        <div class="mb-3">
            <label for="name" class="form-label">Ім'я:</label>
            <input type="text" class="form-control" id="name" name="name" required value="<?php echo isset($_POST['name']) ? htmlspecialchars($_POST['name']) : ''; ?>">
        </div>
        <div class="mb-3">
            <label for="datepublish" class="form-label">Дата публікації:</label>
            <input type="datetime-local" class="form-control" id="datepublish" name="datepublish" required value="<?php echo isset($_POST['datepublish']) ? $_POST['datepublish'] : ''; ?>">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Опис:</label>
            <textarea class="form-control" id="description" name="description" rows="3" required><?php echo isset($_POST['description']) ? htmlspecialchars($_POST['description']) : ''; ?></textarea>
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Оберіть фото:</label>
            <input class="form-control" type="file" id="image" name="image" onchange="previewImage(event)">
        </div>
        <div class="mb-3">
            <img id="imagePreview" src="#" alt="Попередній перегляд" style="max-width: 200px; max-height: 200px; display: none;">
        </div>

        <div class="mb-3">
            <button type="submit" class="btn btn-primary">Додати</button>
        </div>
    </form>
</div>

<script src="/js/bootstrap.bundle.min.js"></script>
<script>
    function previewImage(event) {
        var image = document.getElementById('imagePreview');
        image.src = URL.createObjectURL(event.target.files[0]);
        image.style.display = 'block';
    }
</script>
</body>
</html>
