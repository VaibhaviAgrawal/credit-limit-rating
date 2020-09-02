<?php session_start(); ?>

<?php if($_POST){
    $_SESSION['cname']=$_POST['cname'];
    $_SESSION['creditlimit']=$_POST['creditlimit'];
    $_SESSION['os_days']=$_POST['os_days'];
    
    //echo gettype($_SESSION['os_days']);



    define('DB_NAME', 'assignment-2');
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
$value= $_SESSION{'cname'};
$value2= $_SESSION{'creditlimit'};
$value3= $_SESSION{'os_days'};

$sql="INSERT INTO table1 (cname, creditlimit, os_days) VALUES ('$value', '$value2', '$value3')";
if (!mysqli_query($link, $sql)){
    die('Error: '. mysqli_error($link));
}
mysqli_close($link);

?>
<script>
os_days=<?php echo $_SESSION['os_days']  ?> ;
creditlimit=parseInt(<?php echo $_SESSION['creditlimit'] ?>)
exceed_expectation=parseInt( <?php echo $_SESSION['creditlimit']?> )* os_days;


</script>
<!DOCTYPE html>
<html lang="en">

<head>
     <!-- Required meta tags always come first -->
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <meta http-equiv="x-ua-compatible" content="ie=edge">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
 
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
<p id="form">

<div class="card">
                    <h3 class="card-header bg-info text-white">Basic Details</h3>
                    <div class="card-body">
                        <dl class="row">
                            <dt class="col-6"><?php
echo '<b>Company Name:</b> ' ; ?></dt>
                            <dd class="col-6"><?php echo $_SESSION['cname']; ?></dd>
                            <dt class="col-6"><?php echo '<b>Credit Limit:</b> '; ?></dt>
                            <dd class="col-6"><?php echo $_SESSION['creditlimit']. " INR"; ?></dd>
                            <dt class="col-6"><?php echo '<b>Outstanding days: </b>';?></dt>
                            <dd class="col-6"><?php echo $_SESSION['os_days']. " Days"; ?></dd>
                            
                        </dl>
                    </div>
</div>
</p>
<form >
<h4><span class="badge badge-pill badge-secondary">Upload the details of invoices.</span>  </h4>
 <input type="file" id="excelfile" />   <br>
    <input type="button" id="viewfile" value="Export To Table" onclick="ExportToTable()" /> 
    
    <table class="table table-striped table-bordered" id="exceltable" style="text-align:center">  </table>  



<h4><span class="badge badge-pill badge-secondary">Press the button to Find the Credit Score</span>  </h4>
    

    
    <input type="button" onclick="myFunction()" value=" Find the Credit Score" >
    <div class="row row-content">
        <div class="col-12 col-sm-9">
            <h2>Basic Figures</h2>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Company Credit Limit:</th>
                            <th><?php echo $_SESSION['creditlimit']." INR"; ?></th>
                            <th>Outstanding Days:</th>
                            <th><?php echo $_SESSION['os_days']." Days"; ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Monthly Billing:</th>
                            <td id="monthly_billing"></td>
                            <td><b>Avg O/S Days</b></td>
                            <td id="avg_os_days"></td>
                        </tr>
                        <tr>
                            <th>Avg per Bill:</th>
                            <td  id="avg_per_bill"></td>
                            <td><b>Average Delay</b></td>
                            <td id="avg_delay"></td>
                        </tr>
                        <tr>
                            <th>Min Bill:</th>
                            <td id="min_bill"></td>
                            <td><b>Fastest paid in:</b></td>
                            <td id="fastest_paid"></td>
                        </tr>
                        <tr>
                            <th>Max Bill:</th>
                            <td id="max_bill"></td>
                            <td><b>Most Delayed paid in:</b></td>
                            <td id="delayest_paid"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
         <div class="col-12 col-sm-3">
        </div>
   </div> 

  
    <div class="card" >
    <h3 class="card-header bg-info"> Credit Rating based on days</h3>

    <table class="table table-striped table-bordered table-hover" id="payment_timeline" > </table>

    </div>
    <br>
    <h4> <span id="demo1" class="badge badge-info"></span> </h4>
<br>
    <div class="card">
    <h3 class="card-header bg-info"> Credit Rating based on Limit and days </h3>
    <table id="Cbil_cal" class="table table-striped table-bordered table-hover"> </table>
    </div>
    <br>

    <h4> <span id="demo" class="badge badge-info"></span> </h4>
    

                     


                     <!--<button onclick="goBack()">Go Back</button>-->
   </form>
  </div>
  </div>
  <div class="container">
  
  <div class="row row-content justify-content-center">
        <div class="col-12 col-sm-9 ">
  <canvas id="myChart1"> </canvas>
  <canvas id="myChart2"> </canvas>
  <canvas id="myChart3"> </canvas>
  <a href="./index.php">Go back to the Starting page</a>


  </div>
  </div>
   </div>
   <script>
    
  </script>
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
