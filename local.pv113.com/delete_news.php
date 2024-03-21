<?php
global $dbh;
include_once $_SERVER["DOCUMENT_ROOT"] . "/connection_database.php";

// Перевірте, чи передано ідентифікатор новини через параметр POST
if(isset($_POST['id'])) {
    $id = $_POST['id'];

    // Виконайте запит на видалення новини з використанням підготовленого оператора
    $stmt = $dbh->prepare("DELETE FROM news WHERE id = ?");
    $stmt->execute([$id]);

    // Видалили новину успішно, нічого не повертаємо
    http_response_code(200);
    exit();
} else {
    // Якщо ідентифікатор не передано, повертаємо помилку
    http_response_code(400);
    echo "Помилка: Не вказаний ідентифікатор новини для видалення.";
}
?>
