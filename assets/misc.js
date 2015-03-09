$(document).ready(function() {
  // Handles FunctionBar
  $(window).on("load resize", function() {
    if ( $("#dynamic-storage").width() > 768 ) {
      $("link[href=\"assets/polyui-small.css\"]").attr("href","assets/polyui-mod.css");
    } else if ( $("#dynamic-storage").width() < 768 ) {
      $("link[href=\"assets/polyui-mod.css\"]").attr("href","assets/polyui-small.css");
    }
    
    if ( $(this).width() > 900 ) {
      $("#functionbar").removeAttr("class style");
      $("#functionbar").draggable({
        disabled: true
      });
    } else  {
      $("#functionbar").draggable({
        axis: "y",
        handle: "#handlesbar",
        disabled: false
      });
    }
  }).bind("beforeunload", function(){
    return "Are you sure you want to leave? None of your work will be saved.";
  });
  
  // Select all text that has `.selectallthistxt`
  $(".selectallthistxt").on("click", function() {
    $(this).select();
  });

  // Change Selected Elements HTML Manually
  $(".code").on("keyup", function() {
    $(".selected").html( $(this).val() );
  });
  
});
