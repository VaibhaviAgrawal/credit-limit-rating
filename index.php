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
<div class="card">
<h3 class="card-header bg-info" >Fill the basic details</h3>
 <form id="form" action="page1.php" method="POST">
    <label for="cname">Company name:</label>
  <input type="text" id="cname" name="cname" placeholder="enter company name"><br>
  <label for="creditlimit">Credit Limit:</label>
  <input type="number" id="creditlimit" name="creditlimit" placeholder="in INR"><br>
  <label for="os_days">Outstanding Days:</label>
  <input type="number" id="os_days" name="os_days" placeholder="in Days"><br>
  
<h4><span class="badge badge-pill badge-secondary">Click here to download the template excel file.</span>  </h4>
  
 
<a href="./invoice_details_template.xlsx" download>
  <img src="./invoice_details_template.xlsx" alt="XLSX file" width="104" height="142"> 
</a> <br>

     <!--
     Name of the company: <input type='text' name="cname"> <br>
     Credit Limit of party: <input type='number' name="c_limit" placeholder="in INR"> <br>
     Ourstanding days: <input type='number' name="o_days" placeholder="in days"> <br>
     Start date: <input type="date" name="start_date"> <br>
     End Date: <input type="date" name="end_date"> <br>
     Evaluation Date:  <input type="date" name="eval_date"> <br>
      -->
    
  
<!--<input type="button" onclick="myFunction()" value=" Find the Credit Score" >-->

<input name="form" type="submit" value="Next Page" />
</form>
</div>
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