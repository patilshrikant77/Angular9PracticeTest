<?php
class User {
    private $conn;
    private $table='tb_users'; 
    public $Id;
    public 	$userName;
    public 	$userEmail;
    public 	$userWebAddress;
    public 	$userCoveLetter;
    public 	$userAttacment;
    public 	$userWorking;

    public function __construct($db){
        $this->conn=$db;
    }

    public function read(){
        $query='SELECT * FROM '.$this->table;
        $stmt=$this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readByEmail(){
        $query='SELECT userEmail FROM '.$this->table.' WHERE userEmail="'.$this->userEmail.'"';
        $stmt=$this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }


    public function create(){
       $query = ' INSERT INTO '.$this->table.' (userName, userEmail, userWebAddress,userCoveLetter, userAttacment,userWorking) 
       VALUES ("'.$this->userName.'",  "'.$this->userEmail.'","'.$this->userWebAddress.'", "'.$this->userCoveLetter.'","'.$this->userAttacment.'","'.$this->userWorking.'") ';
        $stmt=$this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}

?>