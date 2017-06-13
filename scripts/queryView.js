'use strict';

(function(module){
  const query = {};
  query.showRequestPage = function(){
    $('#request-container').show();
    $('#clonet-wrapper').hide();
    $('#header').show();
    $('#barcode-container').hide();
    $('#about-table').hide();
    $('#about-title').hide();
    $('#nav-links #query-request-tab').hide().siblings().show();
    $('#section-video-container').hide();
    $('#page-name').text("BactNet Query");

  }
  query.getString = function(hospital, barcode){
    console.log(hospital, barcode);
    // var listItems = [];
    $.get('/entries/'+hospital+'/'+barcode)
    .then(data =>
      {
        var listItems=data;
        // data.forEach(ele => listItems.push(ele));
        // console.log(listItems);
        $('#result-ul').append(`<li>`+ 'Results for  <bold>' +  barcode +'  at  '+hospital+ '</bold></li>');
        listItems.map(ele => {
        $('#result-ul').append(`<li>`+ele.antibiotic+ '  -   Resistance: '+ ele.resistance + '%,   Recommended: ' + ele.recommended + `</li>`);
        })
       });
}
let $hospital;
let $barcode;
query.submitRequest = function() {
  $('#submit').on('click',  function(e) {
    e.preventDefault();
    $('#result-ul').empty();
    $('#you-view').hide();
    $hospital = $("#hospital-filter").val();
    $barcode = $("#bacCode").val();
    console.log($hospital, $barcode);
    var response = query.getString($hospital, $barcode);
    //console.log(response);
  })
}

  $('#reset').on('click', function(){
    $('#you-view').show();
    $('#result-ul').empty();
    $('#hospital-filter').val("Any").attr("selected","true");
    $('#sequence').val('').attr("placeholder","barcode");
  });
  query.submitRequest();

  module.query = query;
})(window);
