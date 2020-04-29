<?php

header('Content-Type:application/json');
include_once('../core/initialize.php');

$users= new User($db);
$result= $users->read();
$num=$result->rowCount();
if($num >0){
    $users_arr=array();
    $users_arr['data']=array();
    while($row=$result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $user_items=array(
            'Id'=>$Id,
            'userName'=>$userName,
            'userEmail'=>$userEmail,
            'userWebAddress'=>$userWebAddress,
            'userCoveLetter'=>$userCoveLetter,
            'userAttacment'=>$userAttacment,
            'userWorking'=>$userWorking
             
        );
        array_push($users_arr['data'],$user_items);
        
    }
   
    echo json_encode(array($users_arr,'type'=>true));

}else{
    echo json_encode(array('message'=>'No Records Found','type'=>false));
}


?>