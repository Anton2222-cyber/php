<?php
global $dbh;
include_once $_SERVER["DOCUMENT_ROOT"] . "/connection_database.php";
include_once $_SERVER["DOCUMENT_ROOT"] . "/config/constants.php";
// Перевірте, чи передано ідентифікатор новини через параметр POST
if(isset($_POST['id'])) {
    $id = $_POST['id'];

    // Отримання імені файлу фотографії, яке потрібно видалити
    $stmt = $dbh->prepare("SELECT image FROM news WHERE id = ?");
    $stmt->execute([$id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $image = $result['image'];

    // Видалення запису про новину з бази даних
    $stmt = $dbh->prepare("DELETE FROM news WHERE id = ?");
    $stmt->execute([$id]);

    // Видалення фотографії з сервера, якщо вона існує
    if (!empty($image)) {
        $image_path = $_SERVER['DOCUMENT_ROOT'] . '/' . UPLOADING . '/' . $image;
        if (file_exists($image_path)) {
            unlink($image_path);
        }
    }

    // Видалили новину успішно, нічого не повертаємо
    http_response_code(200);
    exit();
} else {
    // Якщо ідентифікатор не передано, повертаємо помилку
    http_response_code(400);
    echo "Помилка: Не вказаний ідентифікатор новини для видалення.";
}
?>
