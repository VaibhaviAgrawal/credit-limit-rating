<?php session_start(); ?>

<?php 
if($_POST){
    $_SESSION['monthly_billing']=$_POST['monthly_billing'];
    $_SESSION['avg_per_bill']=$_POST['avg_per_bill'];
    $_SESSION['avg_os_days']=$_POST['avg_os_days'];
    $_SESSION['avg_delay']=$_POST['avg_delay'];
    $_SESSION['min_bill']=$_POST['min_bill'];
    $_SESSION['max_bill']=$_POST['max_bill'];
    $_SESSION['fastest_paid']=$_POST['fastest_paid'];
    $_SESSION['delayest_paid']=$_POST['delayest_paid'];




define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');

$link=mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);

if(!$link){die('Could not connect: ' . mysqli_error());
}

$db_selected=mysqli_select_db( $link, DB_NAME);

if(!$db_selected){
    die('Can\'t use' . DB_NAME. ': ' . mysqli_error());
}
$value=$_SESSION['monthly_billing'];
$value1=$_SESSION['avg_per_bill'];
$value2=$_SESSION['avg_os_days'];
$value3=$_SESSION['avg_delay'];
$value4=$_SESSION['min_bill'];
$value5=$_SESSION['max_bill'];
$value6=$_SESSION['fastest_paid'];
$value7=$_SESSION['delayest_paid'];



$sql="INSERT INTO table1 (monthly_billing, avg_per_bill, avg_os_days, avg_delay, min_bill, max_bill, 
fastest_paid, delayest_paid


) VALUES ('$value','$value1','$value2','$value3','$value4','$value5','$value6','$value7')";
if (!mysqli_query($link, $sql)){
    die('Error: '. mysqli_error($link));
}
mysqli_close($link); 
?>

<!DOCTYPE html>
<html lang="en">

<head>
     <!-- Required meta tags always come first -->
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <meta http-equiv="x-ua-compatible" content="ie=edge">
 
     <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
     <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">
     <link rel="stylesheet" href="node_modules/bootstrap-social/bootstrap-social.css">
     <link rel="stylesheet" href="css/styles.css">
    <title>The Impact Learning</title>


</head>

<body>
<header class="jumbotron">
        <div class="container">
            <div class="row row-header">
                <div class="col-12 col-sm-6">
                    <h1>The Impact Learning</h1>
                    <p></p>
                </div>
                <div class="col-12 col-sm-6 align-self-center">
                    <img src="img/logo.png" class="img-fluid">
                    
                </div>
            </div>
        </div>
    </header>
    <div class="container">
    <div class="col-12 col-sm-8 offset-sm-2">
    <h3> Congratulations, You have successfully submitted the Credit rating form. </h3>

    </div>
  </div>
  <footer class="footer">
        <div class="container">
            <div class="row justify-content-center">             
                        <div class="col-auto">
                            <p> The Impact Learning (A Venture of A & P Business Consulting LLP)</p>
                            <p> If you need help
                       <div class="btn-group" role="button">
                 
                    <a role="button" class="btn btn-success" href="mailto:partners@theimpactlearning.com"><i class="fa fa-envelope-o"></i>Email</a>
                </div>
                        </p>
                        </div>
                   </div>
            </div>
    </footer>

     <!-- jQuery first, then Popper.js, then Bootstrap JS. -->
     <script src="node_modules/jquery/dist/jquery.slim.min.js"></script>
     <script src="node_modules/popper.js/dist/umd/popper.min.js"></script>
     <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
</body>
</html>
<script src="jquery-1.10.2.min.js" type="text/javascript"></script>  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.7.7/xlsx.core.min.js"></script>  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xls/0.7.4-a/xls.core.min.js"></script>  

    <script src="source.js"></script>
<?php } ?>
