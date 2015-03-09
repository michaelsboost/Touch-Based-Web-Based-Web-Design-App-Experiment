$(document).ready(function() {
  // Toggle Add Element Dialog
  $("#addelement").click(function() {
    $(this).toggleClass("active");
    if ( $(".selected").attr("contenteditable") === "true" ) {
      $(".selected").attr("contenteditable", "false").removeAttr("contenteditable");
    }
    if ( $("#addelement.active").is(":visible") ) {
      $("#addcontent").removeClass("hide");
      $("#stylescontent, #settingsmodual").addClass("hide");
      $("#editelement, #styleelement, #settings").removeClass("active");
    } else {
      $("#addcontent").addClass("hide");
    }
  });
  
  // Toggle Edit Dialog
  $("#editelement").click(function() {
    $(this).toggleClass("active");
    if ( $("#editelement.active").is(":visible") ) {
      $("#addcontent, #stylescontent, #settingsmodual").addClass("hide");
      $("#addelement, #styleelement, #settings").removeClass("active");
      if ( $(".selected").is(":visible") ) {
        $("#dynamic-storage").attr("contenteditable", true);
      }
    } else {
      if ( $("#dynamic-storage").attr("contenteditable") === "true" ) {
        $("#dynamic-storage").attr("contenteditable", false).removeAttr("contenteditable");
      }
    }
  });
  
  // Toggle Styles Dialog
  $("#styleelement").click(function() {
    $(this).toggleClass("active");
    if ( $("#styleelement.active").is(":visible") ) {
      $("#stylescontent").removeClass("hide");
      $("#addcontent, #settingsmodual").addClass("hide");
      $("#addelement, #editelement, #settings").removeClass("active");
    } else {
      $("#stylescontent").addClass("hide");
    }
  });
  
  // Toggle Settings Dialog
  $("#settings").click(function() {
    $(this).toggleClass("active");
    if ( $("#settings.active").is(":visible") ) {
      $("#settingsmodual").removeClass("hide");
      $("#addcontent, #stylescontent").addClass("hide");
      $("#addelement, #editelement, #styleelement").removeClass("active");
    } else {
      $("#settingsmodual").addClass("hide");
    }
  });
  
  // Hide Reveal DIV if all dialogs are hidden
  $("#addelement, #editelement, #styleelement, #settings").click(function() {
    if ( $(".active").is(":visible") ) {
      $("#modual-hint").addClass("hide");
      $("#reveal").removeClass("hide");
      if ( $("#editelement.active").is(":visible") ) {
        $("#reveal").addClass("hide");
        $("#modual-hint").removeClass("hide");
      }
    } else {
      $("#reveal").addClass("hide");
      $("#modual-hint").removeClass("hide");
    }
    
    if ( $("#editelement.active").is(":visible") ) {
      // Do nothing
    } else {
      if ( $("#dynamic-storage").attr("contenteditable") === "true" ) {
        $("#dynamic-storage").attr("contenteditable", false);
      }
    }
  });
  
  // Switches Between Pages of FunctionBar
  $("#moresettings").click(function() {
    $("#handlesbar-page1").addClass("hide");
    $("#handlesbar-page2").removeClass("hide");
  });
  $("#backsettings").click(function() {
    $("#handlesbar-page1").removeClass("hide");
    $("#handlesbar-page2").addClass("hide");
  });
});
