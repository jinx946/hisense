<?php
  $username = $_POST['username'];
  $password = $_POST['password'];
  $con = mysqli_connect('localhost','root','666666','hisense');
  $sql = "SELECT * FROM `user` WHERE `username`='$username'";
  $res = mysqli_query($con,$sql);
  if (!$res) {
    die('error for mysql: ' . mysqli_error());
  }
// 取得一些列关联型数组
  $row = mysqli_fetch_assoc($res);
  if ($row) {
    //有数据
    echo json_encode(array(
        "code" => 0,
        "message" => "账号已存在",
      ),JSON_UNESCAPED_UNICODE);
  } else {
   
 $sql2 = "INSERT INTO `user` (`id`,`username`,`password`) VALUES (null,'$username','$password')";
$res2 = mysqli_query($con,$sql2);
echo json_encode(array(
    "code" => 1,
    "message" => $username,
  ));
  }

?>