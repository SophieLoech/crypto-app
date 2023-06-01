<?php

//url symboks
$url_symbols = "https://api.blockchain.com/v3/exchange/symbols";

//call api
$json_symbols = file_get_contents($url_symbols);
echo $json_symbols;

?>