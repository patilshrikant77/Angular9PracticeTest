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
 if($num >0){
     $users_arr=array();
     $users_arr['data']=array();
     while($row=$result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $user_items=array(
             'Id'=>$Id,
             'email'=>$email,
        );
         array_push($users_arr['data'],$user_items);
        
     }
    echo json_encode(array($users_arr,'type'=>true));

 }else{
    echo json_encode(array('message'=>'Invalid Login','type'=>false));
 }
}else{
    echo json_encode(array('message'=>'Inputs not received','type'=>false)); 
}




?>