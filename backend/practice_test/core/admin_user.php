<?php
class AdminUser {
    private $conn;
    private $table='tb_admin'; 
    public  $Id;
    public 	$email;
    public 	$password;


    public function __construct($db){
        $this->conn=$db;
    }

    public function read(){
       $query='SELECT Id,email FROM '.$this->table.' WHERE email="'.$this->email.'" and password="'.$this->password.'"';
        $stmt=$this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create(){
        $query = 'INSERT INTO '.$this->table.' (email, password) 
             VALUES("'.$this->email.'", "'.$this->password.'") ';
        $stmt=$this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}

?>