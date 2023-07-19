<?
$token = "6313365253:AAEBkQEikK20PisOGeKnXpeQxfS8mFhzJ1E";
$chatId = "-955308780";

if ($_POST) {
     $arr = [
          'Имя:' => $_POST['firstName'],
          'Фамилия:' => $_POST['lastName'],
          'Телефон' => $_POST['phone'],
          'Почта:' => $_POST['email']
     ];

     foreach ($arr as $key => $value) {
          $txt .= "<b>" . $key . "</b> " . $value . "\n";
     };

     $getQuery = array(
          "chat_id" => $chatId,
          'text' => $txt,
          "parse_mode" => "html",
     );

     $ch = curl_init("https://api.telegram.org/bot" . $token . "/sendMessage?" . http_build_query($getQuery));
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
     curl_setopt($ch, CURLOPT_HEADER, false);

     $resultQuery = curl_exec($ch);
     curl_close($ch);

     echo json_encode("ok");
}
