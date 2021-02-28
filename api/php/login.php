
<?php
$con = mysqli_connect('localhost','root','666666','hisense');
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT * FROM `user` WHERE `username`='$username' AND `password`='$password'";
  $res = mysqli_query($con,$sql);
  if (!$res) {
    die('error for mysql: ' . mysqli_error());
  }

  $row = mysqli_fetch_assoc($res);

  if (!$row) {
    // 没有匹配的数据 登录失败
    echo json_encode(array(
      "code" => 0,
      "message" => false,
    ));
  } else {
    // 有匹配的数据 登录成功
    echo json_encode(array(
      "code" => 1,
      "message" => $username,
    ));
  }

?>