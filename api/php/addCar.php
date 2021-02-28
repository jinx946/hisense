<?php
$username = $_POST['username'];
$goods_id=$_POST['goods_id'];
$goods_num=$_POST['goods_num']; 
$goods_type=$_POST['goods_type'];
$con = mysqli_connect('localhost','root','666666','hisense');
$sql = "SELECT * FROM `car` WHERE `username`='$username' AND `goods_id`='$goods_id'";
$res = mysqli_query($con,$sql);
if (!$res) {
    die('error for mysql: ' . mysqli_error());
  }
  $row = mysqli_fetch_assoc($res);
  if(!$row){
    //   说明goods_id不存在
    // 创造一个
    $addSql = "INSERT INTO `car` VALUES (null, '$username', '$goods_id', '$goods_num','$goods_type')";
    $addRes = mysqli_query($con,$addSql);
    if(!$addRes){
        die('数据库链接错误' . mysqli_error($con));
    }
    echo json_encode(array('code'=>$addRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE);
  }else{
    //   有数据数据加一
    $goods_num = $row['goods_num']+$goods_num;
    $updat = "UPDATE `car` SET `goods_num` = '$goods_num' WHERE `username` = '$username' AND `goods_id` = '$goods_id'";
    $updataRes = mysqli_query($con,$updat);
    if(!$updataRes){
        die('数据库链接错误' . mysqli_error($con));
    }
    echo json_encode(array('code'=>$updataRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE);
  }
?>