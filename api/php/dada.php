
<?php
$username = $_POST['username'];
$goods_id=$_POST['goods_id'];
$arr=explode(",",$goods_id);
$con = mysqli_connect('localhost','root','666666','hisense');
for($i = 0;$i<count($arr);$i++){
    $goods_id = $arr[$i];
    $sql = "DELETE FROM `car` WHERE `username` = '$username' AND `goods_id`='$goods_id'";
$res = mysqli_query($con,$sql);
}
if(!$res){
    die('数据库链接失败' . mysqli_error($con));
}
 echo json_encode(array('code'=>$res,'msg'=>'删除成功'),JSON_UNESCAPED_UNICODE);
?>