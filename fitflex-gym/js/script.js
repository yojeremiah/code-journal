// Smooth Scrolling
$('#navigation a, .btn').on('click', function(event) {
  if (this.hash !== '') {
    event.preventDefault();
    const hash = this.hash;
    if ($( "#navigation" ).height() < 76) {
    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 68
      },
      800
    );
    }    
    else if ($( "#navigation").height() < 120) {
      $('html, body').animate(
       {
         scrollTop: $(hash).offset().top - 118
       },
       800
     );     
     }
    else {
     $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 147
      },
      800
    );     
    }
  }
});