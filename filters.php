<?php

require_once('../bbdd/connection.php');
include_once('../model/bids.class.php');


echo "-";

if(isset($_POST['identificator'])&&isset($_POST['option']) ){
    $id=$_POST['identificator'];
    $filter=$_POST['option'];
}


try{

$array_response=[];

   switch($filter){
        case '1':

            $select_filter_1="SELECT * FROM bids WHERE symbol=".$id." ORDER BY bid_num ASC";
            $result_select_1= $conn->query($select_filter_1);

            if ($result_select_1->num_rows > 0) {
                    // output data of each row
                    while($row = $result_select_1->fetch_assoc()) {
                        //echo "Resultado: ID: " . $row["symbol"]. " - Número de registros: " . $result_select_1->num_rows. ".-";
                        //$symbol->set_id($row["symbol_id"]);
                        $array_response[]=$row;
                    }
            } else {
                echo "0 results";
            }

        break;
    }  

      
    //$conn->close();
    echo'[-]-';
    echo json_encode($array_response);


} catch (Exception $e) {
    echo 'Excepción capturada: ',  $e->getMessage(), "\n";
}





?>