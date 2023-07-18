<?

$token = "6313365253:AAEBkQEikK20PisOGeKnXpeQxfS8mFhzJ1E";

$getQuery = array(
     "chat_id" 	=> -955308780,
     "text"  	=> "Новое сообщение из формы",
     "parse_mode" => "html",
);
$ch = curl_init("https://api.telegram.org/bot". $token ."/sendMessage?" . http_build_query($getQuery));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);

$resultQuery = curl_exec($ch);
curl_close($ch);

echo $resultQuery;

?>