<?php

class Bids{ 
    private $bids_px;
    private $bids_qty;
    private $bids_num;
    

    public function __construct($bids_px,$bids_qty,$bids_num) {
        $this->bids_px=$bids_px;
        $this->bids_qty=$bids_qty;
        $this->bids_num=$bids_num;
    }

  

    //getters
    public function get_bidsPX(){
       return $this->bids_px;
    }
    public function get_bidsQTY(){
       return $this->bids_qty;
    }
    public function get_bidsNUM(){
        return $this->bids_num;
    }
    
    //setters
    public function set_bidsPX($bids_px){
       $this->bids_px = $bids_px;
    }
    public function set_bidsQTY($bids_qty){
        $this->bids_qty=$bids_qty;
    }
    public function set_bidsNUM($bids_num){
        $this->bids_num=$bids_num;
    }
    
    
 } 

?>