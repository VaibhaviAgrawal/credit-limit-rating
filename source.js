 
var x;
var Invoice_date=[]; //list of all invoice dates
var Invoice_Num=[]; //invoice numbers
var Invoice_amo=[]; //invoice amounts
var Due_date=[]; //due date of that bill
var overdue_amount=[]; // overdue amount
var rec_date=[]; //recieved date
var total_days=[]; //total days= recieved day-billing date
var jan_bills=[]; //index of jan bills
var feb_bills=[]; //index of feb bills
var march_bills=[];
var april_bills=[];
var may_bills=[];
var jun_bills=[];
var jul_bills=[];
var aug_bills=[];
var sept_bills=[];
var oct_bills=[];
var nov_bills=[];
var dec_bills=[];
var monthly_billing; //monthly billing=total amount/12
var numerator; // total amount
var denominator; //no use
var avg_per_bill; //avg per bill= total amount/total number of bills
var os_days; // the input that we take when intering the form
var starting_date;
var ending_date;
var evaluation_date=new Date ();
var bucket_0_30days=[]; //contains index of the bills which are paid in 30 days
var bucket_31_45days=[];
var bucket_46_60days=[];
var bucket_61_90days=[];
var bucket_91_180days=[];
var bucket_180_plus=[];
var cum_per_no_of_bills=[]; 
var exceed_expectation;
var Meets_expectation=0;
var Below_expectation;
var poor_performance;
var Below_poor_expectation;
var A_plus=0;
var A=0;
var B=0;
var C=0;
var D=0;
var creditlimit;
var array_for_graph1=[Invoice_date[jan_bills[1]],
                        Invoice_date[feb_bills[1]],
                        Invoice_date[march_bills[1]],
                        Invoice_date[april_bills[1]],
                        Invoice_date[may_bills[1]],
                        Invoice_date[jun_bills[1]],
                        Invoice_date[jul_bills[1]],
                        Invoice_date[aug_bills[1]],
                        Invoice_date[sept_bills[1]],
                        Invoice_date[oct_bills[1]],
                        Invoice_date[nov_bills[1]],
                        Invoice_date[dec_bills[1]]

];


    function ExportToTable() {  
         var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
         /*Checks whether the file is a valid excel file*/  
         if (regex.test($("#excelfile").val().toLowerCase())) {  
             var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
             if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {  
                 xlsxflag = true;  
             }  
             /*Checks whether the browser supports HTML5*/  
             if (typeof (FileReader) != "undefined") {  
                 var reader = new FileReader();  
                 reader.onload = function (e) {  
                     var data = e.target.result;  
                     /*Converts the excel data in to object*/  
                     if (xlsxflag) {  
                         var workbook = XLSX.read(data, { type: 'binary' });  
                     }  
                     else {  
                         var workbook = XLS.read(data, { type: 'binary' });  
                     }  
                     /*Gets all the sheetnames of excel in to a variable*/  
                     var sheet_name_list = workbook.SheetNames;  
      
                     var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
                     sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                         /*Convert the cell value to Json*/  
                         if (xlsxflag) {  
                             var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
                         }  
                         else {  
                             var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
                         }  
                         if (exceljson.length > 0 && cnt == 0) {  
                             BindTable(exceljson, '#exceltable');  
                             cnt++;  
                         }  
                     });  
                     $('#exceltable').show();  
                 }  
                 if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                     reader.readAsArrayBuffer($("#excelfile")[0].files[0]);  
                 }  
                 else {  
                     reader.readAsBinaryString($("#excelfile")[0].files[0]);  
                 }  
             }  
             else {  
                 alert("Sorry! Your browser does not support HTML5!");  
             }  
         }  
         else {  
             alert("Please upload a valid Excel file!");  
         }  

        
         /* */
    
   
     }  

//Other two functions which are called in the above function are BindTable() and BindTableHeader().

    function BindTable(jsondata, tableid) {/*Function used to convert the JSON array to Html Table*/  
         var columns = BindTableHeader(jsondata, tableid); /*Gets all the column headings of Excel*/  
         for (var i = 0; i < jsondata.length; i++) {  
             var row$ = $('<tr/>');  
             for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
                 var cellValue = jsondata[i][columns[colIndex]];  
                 if (cellValue == null)  
                     cellValue = "";  
                 row$.append($('<td/>').html(cellValue));  
             }  
             $(tableid).append(row$);  
         }
           
     }  
     function BindTableHeader(jsondata, tableid) {/*Function used to get all column names from JSON and bind the html table header*/  
         var columnSet = [];  
         var headerTr$ = $('<tr/>');  
         for (var i = 0; i < jsondata.length; i++) {  
             var rowHash = jsondata[i];  
             for (var key in rowHash) {  
                 if (rowHash.hasOwnProperty(key)) {  
                     if ($.inArray(key, columnSet) == -1) {/*Adding each unique column names to a variable array*/  
                         columnSet.push(key);  
                         headerTr$.append($('<th/>').html(key));  
                     }  
                 }  
             }  
         }  
         $(tableid).append(headerTr$);  
         return columnSet;  
     }  
/*
function Get_element(row, col){
    return document.getElementById("exceltable").rows[row].cells[col].innerHTML

} */
function myFunction() {
    x=document.getElementById("exceltable")
   // console.log(x.rows.length);
   // console.log("hello");
       for( var i=1; i<x.rows.length;i++){
        //console.log("hey");
        Invoice_date.push(new Date(x.rows[i].cells[1].innerHTML));
        Invoice_Num.push(x.rows[i].cells[2].innerHTML);
        Invoice_amo.push(parseInt(x.rows[i].cells[3].innerHTML));
        Due_date.push(new Date(x.rows[i].cells[4].innerHTML));
        overdue_amount.push(parseInt(x.rows[i].cells[5].innerHTML));
        rec_date.push(new Date(x.rows[i].cells[6].innerHTML));}
        //bucketing monthly bills
        for(var i=0; i<Invoice_date.length; i++){
            if(Invoice_date[i].getMonth()==0){jan_bills.push(i);}
            else if (Invoice_date[i].getMonth()==1){feb_bills.push(i);}
            else if (Invoice_date[i].getMonth()==2){march_bills.push(i);}
            else if (Invoice_date[i].getMonth()==3){april_bills.push(i);}
            else if (Invoice_date[i].getMonth()==4){may_bills.push(i);}
            else if (Invoice_date[i].getMonth()==5){jun_bills.push(i);}
            else if (Invoice_date[i].getMonth()==6){jul_bills.push(i);}
            else if (Invoice_date[i].getMonth()==7){aug_bills.push(i);}
            else if (Invoice_date[i].getMonth()==8){sept_bills.push(i);}
            else if (Invoice_date[i].getMonth()==9){oct_bills.push(i);}
            else if (Invoice_date[i].getMonth()==10){nov_bills.push(i);}
            else if (Invoice_date[i].getMonth()==11){dec_bills.push(i);}
            else{}
        }

        
            numerator=0;
            denominator=0;
            if(jan_bills.length!=0){
                for(var j=0; j<jan_bills.length; j++){
                    numerator=numerator+Invoice_amo[jan_bills[j]];   
                }
               // console.log(denominator);
                denominator=denominator+1;
            }
            if(feb_bills.length!=0){
                for(var j=0; j<feb_bills.length; j++){
                    numerator=numerator+Invoice_amo[feb_bills[j]];   
                }
                //console.log(denominator);

                denominator=denominator+1;
            }
            if(march_bills.length!=0){
                for(var j=0; j<march_bills.length; j++){
                    numerator=numerator+Invoice_amo[march_bills[j]];   
                }
               // console.log(denominator);

                denominator=denominator+1;
            }
            if(april_bills.length!=0){
                for(var j=0; j<april_bills.length; j++){
                    numerator=numerator+Invoice_amo[april_bills[j]];   
                }
                denominator=denominator+1;
               // console.log(denominator);

            }
            if(may_bills.length!=0){
                for(var j=0; j<may_bills.length; j++){
                    numerator=numerator+Invoice_amo[may_bills[j]];   
                }
                denominator=denominator+1;
               // console.log(denominator);

            }
            if(jun_bills.length!=0){
                for(var j=0; j<jun_bills.length; j++){
                    numerator=numerator+Invoice_amo[jun_bills[j]];   
                }
                denominator=denominator+1;
              //  console.log(denominator);

            }
            if(jul_bills.length!=0){
                for(var j=0; j<jul_bills.length; j++){
                    numerator=numerator+Invoice_amo[jul_bills[j]];   
                }
                denominator=denominator+1;
              //  console.log(denominator);

            }
            if(aug_bills.length!=0){
                for(var j=0; j<aug_bills.length; j++){
                    numerator=numerator+Invoice_amo[aug_bills[j]];   
                }
                denominator=denominator+1;
              //  console.log(denominator);

            }
            if(sept_bills.length!=0){
                denominator=denominator+1;
              //  console.log(denominator);
                for(var j=0; j<sept_bills.length; j++){
                    numerator=numerator+Invoice_amo[sept_bills[j]];   
                }
                

            }
            if(oct_bills.length!=0){
                for(var j=0; j<oct_bills.length; j++){
                    numerator=numerator+Invoice_amo[oct_bills[j]];   
                }
                denominator=denominator+1;
             //   console.log(denominator);

            }
            if(nov_bills.length!=0){
                for(var j=0; j<nov_bills.length; j++){
                    numerator=numerator+Invoice_amo[nov_bills[j]];   
                }
                denominator=denominator+1;
               // console.log(denominator);

            }
            if(dec_bills.length!=0){
                for(var j=0; j<dec_bills.length; j++){
                    numerator=numerator+Invoice_amo[dec_bills[j]];   
                }
                denominator=denominator+1;
              //  console.log(denominator);

            }
            for(var i=0; i<Invoice_Num.length; i++){
                total_days.push(      (rec_date[i].getTime()-Invoice_date[i].getTime()  )   /   (1000 * 3600 * 24)   );
            }



            



            var total_os_days=0; // sum of total days.
            for(var i=0; i<Invoice_Num.length; i++){
                total_os_days=total_os_days+(   total_days[i]   );
            }
        
            monthly_billing=parseInt(numerator/12);
            document.getElementById("monthly_billing").innerHTML= (monthly_billing) + " Rupees";
            document.getElementById("avg_per_bill").innerHTML= (parseInt(numerator/Invoice_Num.length))+" Rupees";
            document.getElementById("avg_os_days").innerHTML= (parseInt(total_os_days/Invoice_date.length))+" Days";
            document.getElementById("avg_delay").innerHTML= (parseInt(total_os_days/Invoice_date.length)-parseInt(os_days))+" Days";
            document.getElementById("min_bill").innerHTML= Math.min(... Invoice_amo)+" Rupees";
            document.getElementById("max_bill").innerHTML= Math.max(... Invoice_amo)+" Rupees";
            document.getElementById("fastest_paid").innerHTML= Math.min (... total_days)+ " Days";
            document.getElementById("delayest_paid").innerHTML= Math.max (... total_days)+" Days";
           // document.getElementById("start_date").innerHTML="Starting Date is "+ starting_date;
            for(var i=0; i<total_days.length; i++){
                if(total_days[i]<=30){
                    bucket_0_30days.push(i);
                }
                else if (31<=total_days[i] && total_days[i]<=45){
                    bucket_31_45days.push(i);
                }
                else if (46<=total_days[i] && total_days[i]<=60){
                    bucket_46_60days.push(i);
                }
                else if (61<=total_days[i] && total_days[i]<=90){
                    bucket_61_90days.push(i);
                }
                else if (91<=total_days[i] && total_days[i]<=180){
                    bucket_91_180days.push(i);
                }
                else {
                    bucket_180_plus.push(i);
                }
            }
function sum_of_amount(list){
    var s=0;
    for(var e=0; e<list.length; e++){
        s=s+Invoice_amo[list[e]];
    }
    return s;

}
var billing_based_credit_rating;
            var sum=bucket_0_30days.length;
           cum_per_no_of_bills.push(parseInt((sum/Invoice_Num.length)*100));
           sum=sum+bucket_31_45days.length;
           cum_per_no_of_bills.push(parseInt((sum/Invoice_Num.length)*100));
           sum=sum+bucket_46_60days.length;
           cum_per_no_of_bills.push(parseInt((sum/Invoice_Num.length)*100));
            sum=sum+bucket_61_90days.length;
           cum_per_no_of_bills.push(parseInt((sum/Invoice_Num.length)*100));
            sum=sum+bucket_91_180days.length;
           cum_per_no_of_bills.push(parseInt((sum/Invoice_Num.length)*100));
            sum=sum+bucket_180_plus.length;
           cum_per_no_of_bills.push(parseInt((sum/Invoice_Num.length)*100));

        
            if(cum_per_no_of_bills[0]>80){
                billing_based_credit_rating='A'
            }
            else if(cum_per_no_of_bills[1]>80){
                billing_based_credit_rating='B';
            }
            else if(cum_per_no_of_bills[2]>80){
                billing_based_credit_rating='C';
            }
            else{
                billing_based_credit_rating='D';
            }
            
            var table= document.getElementById("payment_timeline");
            var row0=table.insertRow(0);
            row0.insertCell(0).innerHTML="Days";
            row0.insertCell(1).innerHTML="0-30days";
            row0.insertCell(2).innerHTML="31-45 days";
            row0.insertCell(3).innerHTML="46-60 days";
            row0.insertCell(4).innerHTML="61-90 days";
            row0.insertCell(5).innerHTML="91-180 days";
            row0.insertCell(6).innerHTML="180+ days";
            row0.insertCell(7).innerHTML="Total";
            row0.insertCell(8).innerHTML="Within 45 days %";
            row0.insertCell(9).innerHTML="More than 45 days %";
            var row1=table.insertRow(1);
            row1.insertCell(0).innerHTML="No. of bills";
            row1.insertCell(1).innerHTML=bucket_0_30days.length;
            row1.insertCell(2).innerHTML=bucket_31_45days.length;
            row1.insertCell(3).innerHTML=bucket_46_60days.length;
            row1.insertCell(4).innerHTML=bucket_61_90days.length;
            row1.insertCell(5).innerHTML=bucket_91_180days.length;
            row1.insertCell(6).innerHTML=bucket_180_plus.length;
            row1.insertCell(7).innerHTML=Invoice_Num.length;
            row1.insertCell(8).innerHTML=parseInt(((bucket_0_30days.length+bucket_31_45days.length)/Invoice_Num.length)*100);
            row1.insertCell(9).innerHTML=100-parseInt(((bucket_0_30days.length+bucket_31_45days.length)/Invoice_Num.length)*100);
            var row2=table.insertRow(2);
            row2.insertCell(0).innerHTML="Total Amount";
            row2.insertCell(1).innerHTML=sum_of_amount(bucket_0_30days);
            row2.insertCell(2).innerHTML=sum_of_amount(bucket_31_45days);
            row2.insertCell(3).innerHTML=sum_of_amount(bucket_46_60days);
            row2.insertCell(4).innerHTML=sum_of_amount(bucket_61_90days);
            row2.insertCell(5).innerHTML=sum_of_amount(bucket_91_180days);
            row2.insertCell(6).innerHTML=sum_of_amount(bucket_180_plus);
            //var total_amount=row2.cells[1].innerHTML+row2.cells[2].innerHTML+row2.cells[3].innerHTML+row2.cells[4].innerHTML+row2.cells[5].innerHTML+row2.cells[6].innerHTML;
            row2.insertCell(7).innerHTML="-";
            row2.insertCell(8).innerHTML='Billing based credit rating ';
            row2.cells[8].bgColor="  #1178ac  ";

            
            row2.insertCell(9).innerHTML='<b>' +billing_based_credit_rating+'</b>';
            row2.cells[9].bgColor="  #1178ac  ";
            document.getElementById("demo1").innerHTML="Billing based Credit Rating is "+ billing_based_credit_rating;


            starting_date=new Date (Math.min(... Invoice_date));
            ending_date=new Date(Math.max(... Invoice_date));

            Below_expectation=exceed_expectation*(-1);
            poor_performance=exceed_expectation*(-1.5);
            Below_poor_expectation=exceed_expectation*(-2.5);

    function ageing(date){
        var x= new Date();
        return parseInt((x.getTime()-date.getTime())/ (1000 * 3600 * 24)) ;

    }
    function final_answer(starting_date, ending_date, evaluation_date){
        var d= new Date(starting_date);
        var cumulative=0;
        var InrDays=0;
        while(d<= new Date (Math.max(... rec_date))){
            var age=ageing(d);
            var ind=Invoice_date.map(Number).indexOf(+d);
            
           // console.log(ind);
            if(Invoice_date.map(Number).includes(+d)){
                cumulative=cumulative+Invoice_amo[ind]*(-1);
                 InrDays=InrDays+Invoice_amo[ind]*(-1)*age;
            }
            if(rec_date.map(Number).includes(+d)){
                var in1=rec_date.map(Number).indexOf(+d);
                cumulative=cumulative+Invoice_amo[in1];
                 InrDays=InrDays+Invoice_amo[in1]*age;
            }
            
            var credit_allowed=creditlimit*(age+os_days);
            var result=InrDays+credit_allowed;
        console.log(d+ "    " + cumulative + "    "+ age + "    " + InrDays + "    "+ credit_allowed + "   "+ result);
            
            if(result>=exceed_expectation){
                A_plus=A_plus+1;
            }
            else if (result>=Meets_expectation){
                A=A+1;
            }
            else if (result>=Below_expectation){
                B=B+1;
            }
            else if (result>=poor_performance){
                C=C+1
            }
            else if (result<=poor_performance){
                D=D+1;
            }
            d.setDate(d.getDate()+1);
        }
        

        var all=A_plus+A+B+C+D;
        console.log(all);
        var per_A_plus=parseInt(A_plus*100/all);
        //console.log(per_A_plus);
        var per_A=parseInt(A*100/all);
        var per_B=parseInt(B*100/all);
        var per_C=parseInt(C*100/all);
        var per_D=parseInt(D*100/all);
        var table= document.getElementById("Cbil_cal");
        var row0=table.insertRow(0);
        row0.insertCell(0).innerHTML="Rate"
        row0.insertCell(1).innerHTML="A+";
        row0.insertCell(2).innerHTML="A";
        row0.insertCell(3).innerHTML="B";
        row0.insertCell(4).innerHTML="C";
        row0.insertCell(5).innerHTML="D";
        var row1=table.insertRow(1);
        row1.insertCell(0).innerHTML="Numbers"
        row1.insertCell(1).innerHTML=A_plus;
        row1.insertCell(2).innerHTML=A;
        row1.insertCell(3).innerHTML=B;
        row1.insertCell(4).innerHTML=C;
        row1.insertCell(5).innerHTML=D;
        var c=per_A_plus+per_A;
        if(c>=80){
            //console.log(c);
            return 'A';
        }
        c=c+per_B;
        if(c>=80){
            //console.log(c);

            return 'B';
        }
        c=c+per_C;
        if(c>=80){
            //console.log(c);

            return 'C';
        }
        c=c+per_D;
        if(c>=80){
            //console.log(c);

            return 'D';
        }
        return "something wrong";
    }
           // var row3=table.insertRow(3);
          
          


                        
        document.getElementById("demo").innerHTML="Credit Rating is "+final_answer(starting_date, ending_date, evaluation_date);

  
  let myChart1 = document.getElementById('myChart1').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    let massPopChart = new Chart(myChart1, {
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets:[{
          label:'Number of Bills',
          data:[
            jan_bills.length, feb_bills.length, march_bills.length, april_bills.length, 
            may_bills.length, jun_bills.length, jul_bills.length, aug_bills.length, sept_bills.length, oct_bills.length, 
            nov_bills.length , dec_bills.length
          ],
         // backgroundColor:'green',
          //backgroundColor:[
            //'rgba(255, 99, 132, 0.6)',
            //'rgba(54, 162, 235, 0.6)',
            //'rgba(255, 206, 86, 0.6)',
            //'rgba(75, 192, 192, 0.6)',
            //'rgba(153, 102, 255, 0.6)',
            //'rgba(255, 159, 64, 0.6)',
            //'rgba(255, 99, 132, 0.6)'
   // ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
        title:{
          display:true,
          text:'No. of Billings Per Month',
          fontSize:20
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });


    let myChart2 = document.getElementById('myChart2').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontColor = '#777';
  
  var jan=0;
  for(var i=0; i<jan_bills.length; i++){
      jan=jan+Invoice_amo[jan_bills[i]];
  }
  var feb=0;
  for(var i=0; i<feb_bills.length; i++){
      feb=feb+Invoice_amo[feb_bills[i]];
  }
  var mar=0;
  for(var i=0; i<march_bills.length; i++){
      mar=mar+Invoice_amo[march_bills[i]];
  }
  var apr=0;
  for(var i=0; i<april_bills.length; i++){
      apr=apr+Invoice_amo[apr_bills[i]];
  }
  var may=0;
  for(var i=0; i<may_bills.length; i++){
      may=may+Invoice_amo[may_bills[i]];
  }
  var jun=0;
  for(var i=0; i<jun_bills.length; i++){
      jun=jun+Invoice_amo[jun_bills[i]];
  }
  
  var jul=0;
  for(var i=0; i<jul_bills.length; i++){
      jul=jul+Invoice_amo[jul_bills[i]];
  }
  var aug=0;
  for(var i=0; i<aug_bills.length; i++){
      aug=aug+Invoice_amo[aug_bills[i]];
  }
  var sept=0;
  for(var i=0; i<sept_bills.length; i++){
      sept=sept+Invoice_amo[sept_bills[i]];
  }
  var oct=0;
  for(var i=0; i<oct_bills.length; i++){
      oct=oct+Invoice_amo[oct_bills[i]];
  }
  var nov=0;
  for(var i=0; i<nov_bills.length; i++){
      nov=nov+Invoice_amo[nov_bills[i]];
  }
  var dec=0;
  for(var i=0; i<dec_bills.length; i++){
      dec=dec+Invoice_amo[dec_bills[i]];
  }
  
    let massPopChart1 = new Chart(myChart2, {
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets:[{
          label:'Total Billing Amount',
          data:[
            jan, feb, mar, apr, may, jun, jul ,aug, sept, oct, nov, dec
          ],
         backgroundColor:'green',
          //backgroundColor:[
            //'rgba(255, 99, 132, 0.6)',
            //'rgba(54, 162, 235, 0.6)',
            //'rgba(255, 206, 86, 0.6)',
            //'rgba(75, 192, 192, 0.6)',
            //'rgba(153, 102, 255, 0.6)',
            //'rgba(255, 159, 64, 0.6)',
            //'rgba(255, 99, 132, 0.6)'
   // ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
        title:{
          display:true,
          text:'Billing Amount Per Month',
          fontSize:20
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });

    let myChart3 = document.getElementById('myChart3').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontColor = '#777';
  
  var jan1=0;
 
  var feb1=0;
  
  var mar1=0;
 
  var apr1=0;
 
  var may1=0;
  
  var jun1=0;
  
  var jul1=0;
 
  var aug1=0;
  
  var sept1=0;
 
  var oct1=0;
  
  var nov1=0;
  
  var dec1=0;
  for(var i=0; i<rec_date.length; i++){
      if(rec_date[i].getMonth()==0){jan1=jan1+Invoice_amo[i]}
      else if(rec_date[i].getMonth()==1){feb1=feb1+Invoice_amo[i]}
      else if(rec_date[i].getMonth()==2){mar1=mar1+Invoice_amo[i]}
      else if(rec_date[i].getMonth()==3){apr1=apr1+Invoice_amo[i]}
      else if(rec_date[i].getMonth()==4){may1=may1+Invoice_amo[i]}
      else if(rec_date[i].getMonth()==5){jun1=jun1+Invoice_amo[i]}
      else if(rec_date[i].getMonth()==6){jul1=jul1+Invoice_amo[i]}
      else if(rec_date[i].getMonth()==7){aug1=aug1+Invoice_amo[i]}
      else if(rec_date[i].getMonth()==8){sept1=sept1+Invoice_amo[i]}
      else if(rec_date[i].getMonth()==9){oct1=oct1+Invoice_amo[i]}
      else if(rec_date[i].getMonth()==10){nov1=nov1+Invoice_amo[i]}
      else if(rec_date[i].getMonth()==11){dec1=dec1+Invoice_amo[i]}
      else{}
  }
  
    let massPopChart3 = new Chart(myChart3, {
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets:[{
          label:'Total Paid Amount',
          data:[
            jan1, feb1, mar1, apr1, may1, jun1, jul1 ,aug1, sept1, oct1, nov1, dec1
          ],
         backgroundColor:'Yellow',
          //backgroundColor:[
            //'rgba(255, 99, 132, 0.6)',
            //'rgba(54, 162, 235, 0.6)',
            //'rgba(255, 206, 86, 0.6)',
            //'rgba(75, 192, 192, 0.6)',
            //'rgba(153, 102, 255, 0.6)',
            //'rgba(255, 159, 64, 0.6)',
            //'rgba(255, 99, 132, 0.6)'
   // ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
        title:{
          display:true,
          text:'Payment Amount Per Month',
          fontSize:20
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });
  
} 
