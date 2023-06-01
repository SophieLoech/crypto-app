<?php

//url symboks
$url_cryptos = "https://api.coingecko.com/api/v3/coins/list";


//call api
$json_cryptos = file_get_contents($url_cryptos);


echo $json_cryptos;

?>