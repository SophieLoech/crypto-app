<?php

//url symboks
$url_curriencies = "https://openexchangerates.org/api/currencies.json";


//call api
$json_currencies = file_get_contents($url_curriencies);


echo $json_currencies;

?>