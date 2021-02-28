<?php
// $username = 15820177709;
// $goods_id= 435;
// $goods_do = 'add';
$username = $_POST['username'];
// $goods_id=$_POST['goods_id'];
$con = mysqli_connect('localhost','root','666666','hisense');
$sql = "SELECT * FROM `car` WHERE `username`='$username'";
$res = mysqli_query($con,$sql);
if (!$res) {
    die('error for mysql: ' . mysqli_error());
  }
  $car = array();
  $row = mysqli_fetch_assoc($res);
//   $row = mysqli_fetch_assoc($res);
   //有值的时候，就把值添加到$arr中;
   while($row){
    array_push($car,$row);
    $row = mysqli_fetch_assoc($res);
}
    echo json_encode($car,JSON_UNESCAPED_UNICODE);


?>