    var xhr = new XMLHttpRequest();
    var parser;
    xhr.open('GET', 'http://35.234.152.105/db.json', true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if(xhr.readyState != 4) return;
      if(xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
      }else {
            parser = JSON.parse(xhr.responseText);
/* show table */
            for(var i = 0; i < 200; i++){
                addRow(parser[i]);
              }
      } 
    }


/* create table */
      var table = document.createElement('table');
      table.id = "test";
      var createTr = document.createElement('tr');
              var th1 = document.createElement('th');
              th1.innerHTML = "ID";
              var th2 = document.createElement('th');
              th2.innerHTML = "Title";
              var th3 = document.createElement('th');
              th3.innerHTML = "Price";
              var th4 = document.createElement('th');
              th4.innerHTML = "Color";
              var th5 = document.createElement('th');
              th5.innerHTML = "Department";
              createTr.appendChild(th1);
              createTr.appendChild(th2);
              createTr.appendChild(th3);
              createTr.appendChild(th4);
              createTr.appendChild(th5);
              table.appendChild(createTr);
    
      document.body.appendChild(table);


      function addRow(jsonRow) {
          var table = document.getElementById("test");
          var createRow = document.createElement("tr");
          var td1 = document.createElement("td");
          td1.innerHTML = jsonRow.id;
          var td2 = document.createElement("td");
          td2.innerHTML = jsonRow.title;
          var td3 = document.createElement("td");
          td3.innerHTML = jsonRow.price;
          var td4 = document.createElement("td");
          td4.innerHTML = jsonRow.color;
          var td5 = document.createElement("td");
          td5.innerHTML = jsonRow.department;
          createRow.appendChild(td1);
          createRow.appendChild(td2);
          createRow.appendChild(td3);
          createRow.appendChild(td4);
          createRow.appendChild(td5);
          
          table.appendChild(createRow);
        }



  
/* sort table */
      function getVal(tr, index) {
          return tr.children[index].innerText || tr.children[index].textContent;
      };
  
      function comparer(index, asc) {
          return function (a, b) {
            return function (v1, v2) {
              return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);
              }(getVal(asc ? a : b, index), getVal(asc ? b : a, index));
        };
      };
  
      document.querySelectorAll('th').forEach(function (th) {
          return th.addEventListener('click', function () {
            var table = th.closest('table');
            Array.from(table.querySelectorAll('tr:nth-child(n+2)')).sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc)).forEach(function (tr) {
            return table.appendChild(tr);
          });
        });
      });



/* search table */
      function searchTable(){
        var input, filter, tr, td, i;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        tr = document.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td") ; 
          for(j=0 ; j<td.length ; j++)
          {
            let tdata = td[j] ;
            if (tdata) {
              if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break ; 
              } else {
                tr[i].style.display = "none";
              }
            } 
          }
        }
      }