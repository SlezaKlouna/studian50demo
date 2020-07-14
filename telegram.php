<?php


/* https://api.telegram.org/bot1267496296:AAEW1FTqyIk6Btidz1sXmlR17-VRgkrXlWc/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['user_name'];
$email = $_POST['user_email'];
$message = $_POST['user_message'];
$token = "1267496296:AAEW1FTqyIk6Btidz1sXmlR17-VRgkrXlWc";
$chat_id = "-429532337";
$arr = array(
  'Пользователь: ' => $name,
'Email: ' => $email,
'Сообщение' => $message
);

foreach($arr as $key => $value) {
$txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
header('Location: http://studian50.com/');
} else {
echo "Error";
}

?>
