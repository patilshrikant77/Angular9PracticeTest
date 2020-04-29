<?php
header('Content-Type:application/json');
include_once('../core/initialize.php');
$data=json_decode(file_get_contents("php://input"));

$dir_to_save = "../userfiles/";

if($data){
$users= new User($db);
$users->userName =$data->userName;
$users->userEmail =$data->userEmail;
$users->userWebAddress  =$data->userWebAddress;
$users->userCoveLetter =$data->userCoveLetter;
$users->userWorking  =$data->userWorking;
//echo json_encode($data->userAttacment);

$users->userAttacment =($data->userAttacment && $data->userAttacment->filename)?$data->userAttacment->filename:'';

$result= $users->readByEmail();
$num=$result->rowCount();
if($num ===0){
    if($data->userAttacment && $data->userAttacment->filename && $data->userAttacment->value){
         $userFile=file_put_contents($dir_to_save.$data->userAttacment->filename, base64_decode($data->userAttacment->value));
        if(!$userFile){
             echo json_encode(array('message'=>'Unable to upload file please try again letter','type'=>true));
             die();
        }
    }
     if($users->create()){
            echo json_encode(array('message'=>'Data Submited Sucessfully','type'=>true));
        }else{
            echo json_encode(array('message'=>'Data not Submited created please try again','type'=>false));
        }

    }else{
        echo json_encode(array('message'=>'Email aleready in used','type'=>false));
    }
}else{
    echo json_encode(array('message'=>'Inputs not received','type'=>false));
}



?>