<?php

class Symbol{ 
    private $id;
    private $symbol;
    private $coin_code;
    private $crypto_code;
    private $today;
    private $bids=[];
    private $asks=[]; 

    public function __construct($id,$symbol,$coin_code,$crypto_code,$today,$bids,$asks) {
       $this->id=$id;
        $this->symbol=$symbol;
        $this->coin_code=$coin_code;
        $this->crypto_code=$crypto_code;
        $this->today=$today;
        $this->bids=$bids;
        $this->asks=$asks;
    }

    //getters
    public function get_id(){
       return $this->id;
    }
    public function get_symbol(){
       return $this->symbol;
    }
    public function get_coinCode(){
        return $this->coin_code;
    }
    public function get_cryptoCode(){
        return $this->crypto_code;
    }
    public function get_today(){
        return $this->today;
    }
    public function get_bids(){
        return $this->bids;
    }
    public function get_asks(){
        return $this->asks;
    }
    

    //setters
    public function set_id($id){
        $this->id = $id;
     }
    public function set_symbol($symbol){
       $this->symbol = $symbol;
    }
    public function set_coinCode($coin_code){
        $this->coin_code=$coin_code;
    }
    public function set_today($today){
        $this->today=$today;
    }
    public function set_cryptoCode($crypto_code){
        $this->crypto_code=$crypto_code;
    }
  
    public function set_bids($bids){
        $this->bids=$bids;
    }
    public function set_asks($asks){
        $this->asks=$asks;
    }
 } 

?>