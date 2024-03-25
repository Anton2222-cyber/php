<?php
global $dbh;
include_once $_SERVER["DOCUMENT_ROOT"] . "/connection_database.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/config/constants.php";

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

// Збереження значень полів форми перед виведенням форми
$name_value = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : htmlspecialchars($news['name']);
$datepublish_value = isset($_POST['datepublish']) ? $_POST['datepublish'] : $news['datepublish'];
$description_value = isset($_POST['description']) ? htmlspecialchars($_POST['description']) : htmlspecialchars($news['description']);

// Обробка форми редагування, аналогічно додаванню новини
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $datepublish = $_POST['datepublish'];
    $description = $_POST['description'];

    // Перевірка наявності новини з такою ж назвою
    $stmt = $dbh->prepare('SELECT COUNT(*) FROM news WHERE name = ? AND id <> ?');
    $stmt->execute([$name, $id]);
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        // Якщо новина з такою назвою вже існує, встановіть повідомлення про помилку
        $error_message = "Новина з такою назвою вже існує!";
    } else {
        // Перевірка, чи завантажено нове зображення
        if ($_FILES['image']['size'] > 0) {
            // Видалення старого зображення з сервера
            if (!empty($news['image'])) {
                $old_image_path = $_SERVER['DOCUMENT_ROOT'] . '/' . UPLOADING . '/' . $news['image'];
                if (file_exists($old_image_path)) {
                    unlink($old_image_path);
                }
            }

            // Збереження нового зображення на сервері
            $image_save = uniqid() . '.' . pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
            $path_save = $_SERVER['DOCUMENT_ROOT'] . '/' . UPLOADING . '/' . $image_save;
            move_uploaded_file($_FILES['image']['tmp_name'], $path_save);
        } else {
            // Якщо не завантажено нове зображення, використовуємо старе
            $image_save = $news['image'];
        }

        // Оновлення даних про новину в базі даних
        $stmt = $dbh->prepare("UPDATE news SET name = ?, datepublish = ?, description = ?, image = ? WHERE id = ?");
        $stmt->execute([$name, $datepublish, $description, $image_save, $id]);

        // Перенаправлення на головну сторінку
        header("Location: /index.php");
        exit();
    }
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Редагування новини</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
</head>
<body>
<div class="container py-3">
    <?php include_once $_SERVER["DOCUMENT_ROOT"] . "/_header.php"; ?>
    <h1 class="text-center">Редагування новини</h1>

    <!-- Форма для редагування новини -->
    <form method="post" enctype="multipart/form-data" action="">
        <?php if (isset($error_message) && !empty($error_message)): ?>
            <div class="alert alert-danger" role="alert">
                <?= $error_message ?>
            </div>
        <?php endif; ?>
        <div class="form-group">
            <label for="name">Ім'я:</label>
            <input type="text" class="form-control" id="name" name="name" value="<?= $name_value ?>" required>
        </div>
        <div class="form-group">
            <label for="datepublish">Дата публікакації:</label>
            <input type="datetime-local" class="form-control" id="datepublish" name="datepublish" value="<?= $datepublish_value ?>" required>
        </div>
        <div class="form-group">
            <label for="description">Опис:</label>
            <textarea class="form-control" id="description" name="description" rows="3" required><?= $description_value ?></textarea>
        </div>
        <div class="form-group">
            <label for="image">Оберіть нове фото:</label>
            <input type="file" class="form-control" id="image" name="image" onchange="previewImage(this)">
        </div>
        <div class="form-group" id="imagePreviewContainer">
            <label for="imagePreview">Попередній перегляд:</label><br>
            <img id="imagePreview" src="<?= '/'.UPLOADING.'/' . htmlspecialchars($news['image']) ?>" alt="Попередній перегляд" style="max-width: 200px; max-height: 200px;">
        </div>
        <button type="submit" class="btn btn-primary">Зберегти зміни</button>
    </form>

</div>
<script src="/js/bootstrap.bundle.min.js"></script>
<script>
    function previewImage(input) {
        var preview = document.getElementById('imagePreview');
        var file = input.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            preview.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }
</script>
</body>
</html>
