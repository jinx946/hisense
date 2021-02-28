<?php
// $username = 15820177709;
// $goods_id= 3791;
// $goods_num = 12;
$username = $_POST['username'];
$goods_id=$_POST['goods_id'];
$goods_num=$_POST['goods_num']; 
$con = mysqli_connect('localhost','root','666666','hisense');
    $sql = "UPDATE `car` SET `goods_num`= '$goods_num' WHERE `username` = '$username' AND `goods_id` = '$goods_id'";
$res = mysqli_query($con,$sql);
if(!$res){
    die('数据库链接失败' . mysqli_error($con));
}
echo json_encode(array('code'=>$res,'msg'=>'修改成功'),JSON_UNESCAPED_UNICODE);
?>