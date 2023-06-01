<?php

require_once('../bbdd/connection.php');
include_once('../model/symbol.class.php');
include_once('../model/bids.class.php');

$symbol = new Symbol(null,"e","e","e","e","e","e");

echo "-";

if(isset($_POST['response'])){
    $information=json_decode($_POST['response'],true);
}else{
    if(isset($_COOKIE["information"]))
    $information=json_decode($_COOKIE["information"]);
}


$symbol->set_symbol($information["symbol"]);
$coin_data=preg_split("/-/",$information["symbol"]);
$symbol->set_cryptoCode($coin_data[0]);
$symbol->set_coinCode($coin_data[1]);
$symbol->set_bids($information["bids"]);
$symbol->set_asks($information["asks"]);
$hoy=date('Y-m-d H:i:s');
$symbol->set_today($hoy);


try{

    $insert_symbol = "INSERT INTO symbols(symbol, coin_code, crypto_code,created_at)
    VALUES ('".$symbol->get_symbol()."','".$symbol->get_coinCode()."','".$symbol->get_cryptoCode()."','".$symbol->get_today()."')";

    if ($conn->query($insert_symbol) === TRUE) {
        echo "Nuevo simbolo introducido.-";
        //$conn->close();
    } else {
        echo "Error: " .$insert_symbol. "-" .$conn->error.'-';
    }


    $select_id_symbol="SELECT * FROM symbols WHERE symbol='".$symbol->get_symbol()."' AND created_at='".$symbol->get_today()."'";

    $result_select= $conn->query($select_id_symbol);

    if ($result_select->num_rows > 0) {
            // output data of each row
            while($row = $result_select->fetch_assoc()) {
            echo "Resultado: ID: " . $row["symbol_id"]. " - Fecha: " . $row["created_at"]. ".-";
            $symbol->set_id($row["symbol_id"]);
            }
    } else {
        echo "0 results";
    }

    ;

    $lista_bids=$symbol->get_bids();
    $list_bids=[];

    for ($i = 0; $i < count($lista_bids); $i++) {
       
        $bid_data=new Bids(null,null,null);

        $bids_px=$lista_bids[$i]["px"];
        $bids_qty=$lista_bids[$i]["qty"];
        $bids_num=$lista_bids[$i]["num"];

        $bid_data->set_bidsPX($bids_px);
        $bid_data->set_bidsQTY($bids_qty);
        $bid_data->set_bidsNUM($bids_num);

        $list_bids[]=$bid_data;

    }

   

    for ($j = 0; $j <count($list_bids); $j++) {
        $insert_bid = "INSERT INTO bids(symbol, bid_px, bid_qty,	bid_num,created_at)
        VALUES ('".$symbol->get_id()."','".$list_bids[$j]->get_bidsPX()."','".$list_bids[$j]->get_bidsQTY()."','".$list_bids[$j]->get_bidsNUM()."','".$symbol->get_today()."')";

            if ($conn->query($insert_bid) === TRUE) {
                echo "Nueva bid introducida.-";
                
            } else {
                echo "Error: " .$insert_symbol. "->" . $conn->error.'-';
            }
    }

    $array_response=[];
    
    
    $conn->close();

    $array_response["id"]=$symbol->get_id();

    
    echo json_encode($array_response);

} catch (Exception $e) {
    echo 'Excepción capturada: ',  $e->getMessage(), "\n";
}





?>