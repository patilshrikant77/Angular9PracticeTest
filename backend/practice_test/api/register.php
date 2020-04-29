<?php
header('Content-Type:application/json');
include_once('../core/initialize.php');

$login= new AdminUser($db);
$data=json_decode(file_get_contents("php://input"));


if($data){
    $login->email=$data->email;
    $login->password=md5($data->password);
    $result= $login->read();
    $num=$result->rowCount();
 if($num===0){
        if($login->create()){
            echo json_encode(array('message'=>'User Created Sucessfully','type'=>true));
        }else{
            echo json_encode(array('message'=>'User not created please try again','type'=>false));
        }
}else{

     echo json_encode(array('message'=>'User aleready exist with this email','type'=>false));
    
}
}else{
    echo json_encode(array('message'=>'Inputs not received','type'=>false));
    
}


?> 