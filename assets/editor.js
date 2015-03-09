$(document).ready(function() {
  var CallSelectOptions = function() {
    $("#handle-select-options").html("");
    $(".selected option").each(function() {
      var thisoption = $(this);
      inpt.clone().val( this.value ).add( $("<a class=\"del-select-option\" href=\"javascript:void(0)\">&nbsp;<i class=\"fa fa-minus\"></i></a><br>") ).on('input', function() {
        thisoption.val( this.value ).text( this.value );
      })
      .appendTo("#handle-select-options");
    });
    
    // Delete Option
    $(".del-select-option").on("click", function() {
      $(".selected").find("option[value=\""+ $(this).prev().val() +"\"]").remove();
      $(this).prev().remove();
      $(this).next().remove();
      $(this).remove();
    });
  };
  var CallULOptions = function() {
    $("#handle-ul-options").html("");
    $(".selected li").each(function() {
      var DIS = $(this);
      $("<input type=\"text\" />").clone().val( DIS.html() ).add( $("<a class=\"del-ulli\" href=\"javascript:void(0)\">&nbsp;<i class=\"fa fa-minus\"></i></a><br>") ).on('input', function() {
        DIS.html( this.value );
      })
      .appendTo( "#handle-ul-options" );
    });
    
    // Delete Option
    $(".del-ulli").on("click", function() {
      $(this).prev().remove();
      $(this).next().remove();
      $(this).remove();
      $(".selected").html("");
      
      $("#handle-ul-options input[type=text]").each(function() {
        var inptr = $(this);
        $("<li>").clone().html( inptr.val() )
        .appendTo( ".selected" );
      });
    });
  };
  var CallOLOptions = function() {
    $("#handle-ol-options").html("");
    $(".selected li").each(function() {
      var DIS = $(this);
      $("<input type=\"text\" />").clone().val( DIS.html() ).add( $("<a class=\"del-olli\" href=\"javascript:void(0)\">&nbsp;<i class=\"fa fa-minus\"></i></a><br>") ).on('input', function() {
        DIS.html( this.value );
      })
      .appendTo( "#handle-ol-options" );
    });
    
    // Delete Option
    $(".del-olli").on("click", function() {
      $(this).prev().remove();
      $(this).next().remove();
      $(this).remove();
      $(".selected").html("");
      
      $("#handle-ol-options input[type=text]").each(function() {
        var inptr = $(this);
        $("<li>").clone().html( inptr.val() )
        .appendTo( ".selected" );
      });
    });
  };
  
  // Select Elements
  var SelectElements = function() {
    $("#dynamic-storage").children().on("mouseup touchend", function(e) {
      if ( $(".selected").is(":visible") ) {
        $(".selected").removeClass("selected");
      }
      
      $(e.target).addClass("selected");
      checkParent();
      movePrev();
      moveNext();
      check4Child();
      
      if ( $(".selected").is(":visible") ) {
        $(".selected").removeClass("selected");
      }
      
      $(e.target).addClass("selected");
      
      CallSelection();
      CheckSelection();
      
      if ( $("#addelement.active").is(":visible") ) {
        $("#reveal").animate({ scrollTop: 0 }, "fast");
      } else {
        if ( $("#editelement.active").is(":visible") ||  $("#styleelement.active").is(":visible") ) {
          // Do nothing
        } else {
          $("#addelement").trigger("click");
          $("#reveal").animate({ scrollTop: 0 }, "fast");
        }
      }
    });
    
    $(document).find("#dynamic-storage *").on("dblclick", function() {
      if ( $("#dynamic-storage").attr("contenteditable") === "false" ) {
        $("#editelement").trigger("click");
      }
    });
  };
  // Call Selection
  var CallSelection = function() {
    $(".selected-element").val( $(".selected").attr("class").replace(/ /g," "));
    $(".selected-tag").val( $(".selected").prop("tagName").toLowerCase() );
    $(".code").val( $(".selected").html() );
    
    checkParent();
    
    // Check if first & last child is selected
    if ( $(".selected").is(":first-child") && $(".selected").is(":last-child") ) {
      if ( $("#moveprev").hasClass() === "hide" ) {
        // Do nothing
      } else if ( $("#movenext").hasClass() === "hide" ) {
        // Do nothing
      } else {
        $("#moveprev, #movenext").addClass("hide");
        $("#tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
        return false;
      }
    // Check if first child is selected
    } else if ( $(".selected").is(":first-child") ) {
      if ( $("#moveprev").hasClass() === "hide" ) {
        // Do nothing
      } else {
        $("#moveprev").addClass("hide");
        $("#movenext, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
        return false;
      }
      // Check if last child is selected
    } else if ( $(".selected").is(":last-child") ) {
      if ( $("#movenext").hasClass() === "hide" ) {
        // Do nothing
      } else {
        $("#movenext").addClass("hide");
      }
      $("#moveprev, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
    } else {
      // Check if in middle
      $("#moveprev, #movenext, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
    }
    
    check4Child();
    CheckSelection();
    return false;
  };
  
  // If element has options, display them
  var CheckSelection = function() {
    // If <element> is selected -- show it's properties & hide others
    if ( $(".selected").is(":visible") ) {
      if ( $(".selected-tag").val() === "a" ) {
          $("#link-options").removeClass("hide");

          $("#link-name-val").val( $(".selected").attr("name") );
          $("#link-href-val").val( $(".selected").attr("href") );
      } else if ( $(".selected-tag").val() === "img" ) {
        $("#img-options").removeClass("hide");
        
        $("#img-src-val").val( $(".selected").attr("src") );
      } else if ( $(".selected-tag").val() === "select" ) {
        $("#select-options").removeClass("hide");
        
        var inpt = $("<input type=\"text\" />");
        
        CallSelectOptions();
      } else if ( $(".selected-tag").val() === "ol" ) {
        $("#ol-options").removeClass("hide");

        CallOLOptions();
      } else if ( $(".selected-tag").val() === "ul" ) {
        if ( $(".selected-element").val().toLowerCase().contains("tabs tabs-modual ") ) {
          $("#tabs-options").removeClass("hide");
        } else if ( $(".selected").attr("role") === "navigation" ) {
            $("#options > div").addClass("hide");
        } else {
          $("#options > div").addClass("hide");
          $("#ul-options").removeClass("hide");

          CallULOptions();
        }
      } else if ($.inArray($(".selected-tag").val().trim().toLowerCase(), ["iframe", "embed"]) > -1) {
        $("#video-options").removeClass("hide");
        
        $("#iframe-width-val").val( $(".selected").attr("width") );
        $("#iframe-height-val").val( $(".selected").attr("height") );
        $("#iframe-src-val").val( $(".selected").attr("src") );
      } else if ($.inArray($(".selected-tag").val().trim().toLowerCase(), ["input[type=text]", "input"]) > -1) {
        $("#input-options").removeClass("hide");
        
        $("#input-val").val( $(".selected").attr("src") );
        $("#input-placeholder-val").val( $(".selected").attr("placeholder") );
      } else if ($.inArray($(".selected-tag").val().trim().toLowerCase(), ["textarea"]) > -1) {
        $("#textarea-options").removeClass("hide");
        
        $("#textarea-val").val( $(".selected").attr("src") );
        $("#textarea-placeholder-val").val( $(".selected").attr("placeholder") );
      } 
    }
  };
  
  // If prev element accessable make it selectable
  var movePrev = function() {
    $("#options > div").addClass("hide");
    // Detect If New Selection Has Tag
    if ( $(".selected").prev().is(":visible") ) {
      // Show/Add Tag & Class
      $(".selected-tag").val( $(".selected").prev().prop("tagName").toLowerCase() );
      $(".selected").removeClass("selected").prev().addClass("selected");
      $(".selected-element").val( $(".selected").attr("class").replace(/ /g," ") );
      $(".code").val( $(".selected").html() );
      checkParent();
    }
    
    // Check if first & last child is selected
    if ( $(".selected").is(":first-child") && $(".selected").is(":last-child") ) {
      if ( $("#moveprev").hasClass() === "hide" ) {
        // Do nothing
      } else if ( $("#movenext").hasClass() === "hide" ) {
        // Do nothing
      } else {
        $("#moveprev, #movenext").addClass("hide");
        $("#toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
        return false;
      }
    // Check if first child is selected
    } else if ( $(".selected").is(":first-child") ) {
      if ( $("#moveprev").hasClass() === "hide" ) {
        // Do nothing
      } else {
        $("#moveprev").addClass("hide");
        $("#movenext, #toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
        return false;
      }
      // Check if last child is selected
    } else if ( $(".selected").is(":last-child") ) {
      if ( $("#movenext").hasClass() === "hide" ) {
        // Do nothing
      } else {
        $("#movenext").addClass("hide");
      }
      $("#moveprev, #toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
    } else {
      // Check if in middle
      $("#moveprev, #movenext, #toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
    }
    check4Child();
  };
  // If next element accessable make it selectable
  var moveNext = function() {
    $("#options > div").addClass("hide");
    // Detect If New Selection Has Tag
    if ( $(".selected").next().is(":visible") ) {
      // Show/Add Tag & Class
      $(".selected-tag").val( $(".selected").next().prop("tagName").toLowerCase() );
      $(".selected").removeClass("selected").next().addClass("selected");
      $(".selected-element").val( $(".selected").attr("class").replace(/ /g," ") );
      $(".code").val( $(".selected").html() );
      checkParent();
    }
    
    // Check if first & last child is selected
    if ( $(".selected").is(":first-child") && $(".selected").is(":last-child") ) {
      if ( $("#moveprev").hasClass() === "hide" ) {
        // Do nothing
      } else if ( $("#movenext").hasClass() === "hide" ) {
        // Do nothing
      } else {
        $("#moveprev, #movenext").addClass("hide");
        $("#toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
        return false;
      }
    // Check if first child is selected
    } else if ( $(".selected").is(":first-child") ) {
      if ( $("#moveprev").hasClass() === "hide" ) {
        // Do nothing
      } else {
        $("#moveprev").addClass("hide");
        $("#movenext, #toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
        return false;
      }
      // Check if last child is selected
    } else if ( $(".selected").is(":last-child") ) {
      if ( $("#movenext").hasClass() === "hide" ) {
        // Do nothing
      } else {
        $("#movenext").addClass("hide");
      }
      $("#moveprev, #toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
    } else {
      // Check if in middle
      $("#moveprev, #movenext, #toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
    }
    check4Child();
  };
  // If child is accessable make it selectable
  var check4Child = function() {
    $("#options > div").addClass("hide");
    // Check if it has child if not hide button
    //if ( $(".selected").children().is(":hidden") ) {
      //$("#tochild").addClass("hide");
      //return false;
    //}
    
    if ( $(".selected").children().length <= 0 ) {
      $("#tochild").addClass("hide");
    }
  };
  // #dynamic-storage & #functionbar must not be selectable
  var checkParent = function() {
    $("#options > div").addClass("hide");
   if ( $(".selected").parent().is("#dynamic-storage") ) {
      $("#toparent").addClass("hide");
    }
  };
  // Clear Selection
  var ClearSelection = function() {
    $(".selected-tag, .selected-element, .code").val("");
    if ( $(".selected").is(":visible") ) {
      if ( $("#editTagAttributes.hide").is(":visible") ) {
        // Do nothing
      } else {
        $("#editTagAttributes").addClass("hide");
      }
      $(".selected").removeClass("selected");
    }
    $("#moveprev, #movenext, #toparent, #tochild, #editelement, #deselectelement, #delelement").addClass("hide");
    $("#options").children().addClass("hide");
  };
  // Change selected element's tag function
  var changeTagName = function() {
    var $val = $(".selected-tag").val().trim().toLowerCase();

    // If no value is set return to default
    if ($.inArray($val, [""]) > -1) {
      $(".selected").replaceWith( "<span class=\""+ $(".selected-element").val() +"\" \>");
      $(".selected").html( $(".code").val() );
      // Check if it's a textbox
    } else if ($.inArray($val, ["input[type=text]", "input", "textbox"]) > -1) {
      $(".selected").replaceWith( "<input type=\"text\"" + ( $("#input-val").val() === "" ? "" : " value=\"" + $("#input-val").val() + "\"" ) + ( $("#input-placeholder-val").val() === "" ? "" : " placeholder=\"" + $("#input-placeholder-val").val() + "\"" ) + "\>");
      $(".selected").val( $(".code").val() );

      // Check if it's an input button
    } else if ( $val === "input[type=button]" ) {
      $(".selected").replaceWith( "<input type=\"button\" class=\""+ $(".selected-element").val() +"\" \>");
      $(".selected").val( $(".code").val() );

      // Check if it's a textarea
    } else if ( $val === "textarea" ) {
      $(".selected").replaceWith( "<" + $val + " class=\""+ $(".selected-element").val() +"\" \>");
      $(".selected").val( $(".code").val() );

      // Use text as a placeholder to make a span tag
    } else if ( $val === "text" ) {
      $(".selected").replaceWith( "<span class=\""+ $(".selected-element").val() +"\" \>");
      $(".selected").html( $(".code").val() );
    } else if ( $val === "a" ) {
      $(".selected").replaceWith( "<a "+ ( $(".selected-element").val() === "" ? "" : "class=\"" + $(".selected-element").val() + "\"" ) + ( $("#link-name-val").val() === "" ? "" : "name=\"" + $("#link-name-val").val() + "\"" ) + ( $("#link-href-val").val() === "" ? "" : "href=\"" + $("#link-href-val").val() + "\"" ) + "\>");
      $(".selected").html( $(".code").val() );
    } else if ( $val === "img" ) {
      $(".selected").replaceWith( "<img "+ ( $("#img-src-val").val() === "" ? "" : "src=\"" + $("#img-src-val").val() + "\"" ) + "\>");
      $(".selected").html( $(".code").val() );
    } else {
      // Make any others specified
      $(".selected").replaceWith( "<" + $val + " class=\""+ $(".selected-element").val() +"\" \>");
      $(".selected").html( $(".code").val() );
    }

    // Return tagName
    $(".selected-tag").val( $(".selected").prop("tagName").toLowerCase() );
  };
  SelectElements();
  ClearSelection();
  
  // Add Elements
  $(function() {
    $("#addcontent .element, #addcontent .grid").on("click", function() {
      var $se = $(".selected-element").val().trim().toLowerCase();
      
      if ( $(".selected").is(":visible") ) {
        $( $(this).next(".add-element").html() ).appendTo(".selected");
        CallSelection();
      } else {
        if ($.inArray($se, ["", " ", "."]) > -1) {
          $( $(this).next(".add-element").html() ).appendTo("#dynamic-storage");
        } else {
          $( $(this).next(".add-element").html() ).appendTo( $(".selected-element").val() );
        }
      }
      
      if ( $(this).attr("class") === "element customhtml-modual" ) {
        $("#options > div:not('#custom-options')").addClass("hide");
        $("#custom-options").toggleClass("hide");
        $("#reveal").animate({ scrollTop: 0 }, "fast");
      } else if ( $(this).attr("class") === "element iconsforlayout" ) {
        $("#options > div:not('#icon-options')").addClass("hide");
        $("#icon-options").toggleClass("hide");
        $("#reveal").animate({ scrollTop: 0 }, "fast");
      } else if ( $(this).attr("class") === "element gridforlayout" ) {
        $("#options > div:not('#grid-options')").addClass("hide");
        $("#grid-options").toggleClass("hide");
        $("#reveal").animate({ scrollTop: 0 }, "fast");
      } else {
        $("#options > div").addClass("hide");
        $("#reveal").animate({ scrollTop: 0 }, "fast");
      }
      
      if ( $(".selected").attr("contenteditable") === "true" ) {
        $(".selected").attr("contenteditable", "false").removeAttr("contenteditable");
      }
      
      SelectElements();
    });

    // Add Icons
    $("#icon-options a").on("click", function() {
      if ( $(".selected").is(":visible") ) {
        $( "<span>"+ $(this).html() +"</span>" ).appendTo( $(".selected") );
        SelectElements();
      } else {
        $( "<span>"+ $(this).html() +"</span>" ).appendTo( $("#dynamic-storage") );
        SelectElements();
      }
    });
    $("#closeicondialog").click(function() {
      $("#icon-options").addClass("hide");
    });

    // Add Custom HTML
    $("#add-custom-html").click(function() {
      if ( $(".selected").is(":visible") ) {
        $( $("#custom-html").val() ).appendTo( $(".selected") );
        SelectElements();
      } else {
        $( $("#custom-html").val() ).appendTo( $("#dynamic-storage") );
        SelectElements();
      }
    });

    // Add Select Option
    $(".add-select-option").click(function() {
      $("#handle-select-options").html("");
      $(".selected").append("<option value=\""+ $("#new-select-option").val() +"\">"+ $("#new-select-option").val() +"</option>");
      $("#new-select-option").val("");
      CallSelection();
    });
    // Add UL Option
    $("#add-ul-option").click(function() {
      $("#handle-ul-options").html("");
      $(".selected").append("<li>"+ $("#new-ulli-text").val() +"</li>");
      $("#new-ulli-text").val("");
      CallULOptions();
    });
    // Add OL Option
    $("#add-ol-option").click(function() {
      $("#handle-ol-options").html("");
      $(".selected").append("<li>"+ $("#new-olli-text").val() +"</li>");
      $("#new-olli-text").val("");
      CallOLOptions();
    });
  });
  
  // Edit Elements
  $("#textarea-val").on("keyup", function() {
    $(".selected").val( $(this).val() );
  });
  $("#textarea-placeholder-val").on("keyup", function() {
    $(".selected").attr("placeholder", $(this).val() );
  });
    
  // Handles Styles
  $("#reveal .droppable header").on("click", function() {
    $(this).toggleClass("enabledoption");
    $(this).children().filter("span").toggleClass("fa-square-o").toggleClass("fa-check-square-o");
    $(this).next().filter(".drop").toggleClass("hide");
  });
  $(".picker").bind("load focus blur change", function() {
    $( $(".global-style").val() ).css({
      "background-color": $(this).val()
    });

    $(".picker").val( $( $(".global-style").val() ).css("background-color") );
  }).HSLAColorPicker(".place-picker");
  
  // Change Tag & Class On Selected Element
  $("#change-selected-tag").click(function() {
    if ( $(".selected").is(":visible") ) {
      changeTagName();
    }
    SelectElements();
  });
    
  // Handles Next/Prev/Parent/Children Selections
  $(function() {
    // Make Parent Selected 
    $("#toparent").click(function() {
      if ( $(".selected").is(":visible") ) {
       if ( $(".selected").parent().is("#dynamic-storage") ) {
          $("#toparent").addClass("hide");
          CallSelection();
        } else {
          $(".selected-tag").val( $(".selected").parent().prop("tagName").toLowerCase() );
          $(".selected").parent().addClass("selected").children().removeClass("selected");
          $(".code").val( $(".selected").html() );
          movePrev();
          CallSelection();
        }
        
        // Check if first & last child is selected
        if ( $(".selected").is(":first-child") && $(".selected").is(":last-child") ) {
          if ( $("#moveprev").hasClass() === "hide" ) {
            // Do nothing
          } else if ( $("#movenext").hasClass() === "hide" ) {
            // Do nothing
          } else {
            $("#moveprev, #movenext").addClass("hide");
            $("#tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
            return false;
          }
        // Check if first child is selected
        } else if ( $(".selected").is(":first-child") ) {
          if ( $("#moveprev").hasClass() === "hide" ) {
            // Do nothing
          } else {
            $("#moveprev").addClass("hide");
            $("#movenext, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
            return false;
          }
          // Check if last child is selected
        } else if ( $(".selected").is(":last-child") ) {
          if ( $("#movenext").hasClass() === "hide" ) {
            // Do nothing
          } else {
            $("#movenext").addClass("hide");
          }
          $("#moveprev, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
        } else {
          // Check if in middle
          $("#moveprev, #movenext, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").removeClass("hide");
        }
      } else {
        // No element selected
        $("#moveprev, #movenext, #toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").addClass("hide");
      }
    });
    
    // Make Child Selected 
    $("#tochild").click(function() {
      if ( $(".selected").is(":visible") ) {
        // Detect First Tag
        if ( $(".selected").children().first().length > 0 ) {
          $(".selected-tag").val( $(".selected").children().first().prop("tagName").toLowerCase() );
          $(".selected").removeClass("selected").children().first().addClass("selected");
          $(".code").val( $(".selected").html() );
          movePrev();
          CallSelection();
          check4Child();
          
          if ( $(".selected").is(":first-child") ) {
            CheckSelection();
          }
        } else {
          ClearSelection();
        }
      } else {
        // No element selected
        $("#moveprev, #movenext, #toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").addClass("hide");
      }
    });
    
    // Make Previous Selected 
    $("#moveprev").click(function() {
      if ( $(".selected").is(":visible") ) {
        movePrev();
        check4Child();
        CallSelection();
        
        if ( $(".selected").is(":first-child") ) {
          check4Child();
          CheckSelection();
        }
      } else {
        // No element selected
        $("#moveprev, #movenext, #toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").addClass("hide");
      }
    });
    
    // Make Next Selected 
    $("#movenext").click(function() {
      if ( $(".selected").is(":visible") ) {
        moveNext();
        CallSelection();
      } else {
        // No element selected
        $("#moveprev, #movenext, #toparent, #tochild, #editelement, #deselectelement, #delelement, #editTagAttributes").addClass("hide");
      }
    });
  });

  // New Layout
  $("#new-layout").click(function() {
    if ( $("#deselectelement").is(":visible") ) {
      $("#deselectelement").trigger("click");
      $("#dynamic-storage").html("");
    } else {
      $("#dynamic-storage").html("");
    }
  });
  
  // Delete & Deselect an Element
  $("#deselectelement").click(function() {
    ClearSelection();
    SelectElements();
  });
  $("#delelement").click(function() {
    $(".selected").remove();
    ClearSelection();
    SelectElements();
  });
  
  // ShortcutKeys
  $(function() {
    // New Document
    shortcut.add("Ctrl+N", function() {
      $("#new-layout").trigger("click");
    });
    // Export layout hotkey
    shortcut.add("Ctrl+E", function() {
      console.log("Export layout");
    });
    // Save to cloud
    shortcut.add("Ctrl+S", function() {
      console.log("Save to cloud");
    });
    // Add Elements
    shortcut.add("Insert", function() {
      $("#addelement").trigger("click");
    });
    // Style Elements
    shortcut.add("Ctrl+M", function() {
      $("#styleelement").trigger("click");
    });
    // Go To Child Element
    shortcut.add("Shift+Enter", function() {
      if ( $(".selected").is(":visible") ) {
        if ( $("#tochild").is(":visible") ) {
          $("#tochild").trigger("click");
        }
        // else {
          // if ( $("#toparent").is(":visible") ) {
            // if ( $("#editelement.active").is(":visible") ) {
              // Do nothing
            // } else {
              // $("#editelement").trigger("click");
              // $("#dynamic-storage").focus();
              // shortcut.remove("Enter");
            // }
          // }
        // }
      }
    });
    // Go To Parent Element
    shortcut.add("Esc", function() {
      if ( $(".selected").is(":visible") && $("#toparent").is(":visible") ) {
        if ( $("input, textarea").is(":focus") ) {
          // Do nothing
        } else {
          $("#toparent").trigger("click");
        }
      } else if ( $(".selected").is(":visible") && $("#toparent").is(":hidden") ) {
        if ( $("input, textarea").is(":focus") ) {
          // Do nothing
        } else if ( $("#editelement.active").is(":visible") ) {
          $("#editelement").trigger("click");
        } else {
          ClearSelection();
        }
      }
    });
    // Select Prev Element
    shortcut.add("CtrL+Up", function() {
      if ( $(".selected").is(":visible") ) {
        if ( $("#moveprev").is(":visible") ) {
          if ( $("input, textarea").is(":focus") || $("#editelement.active").is(":visible") || $("#styleelement.active").is(":visible") ) {
            return false;
          } else {
            $("#moveprev").trigger("click");
          }
        }
      }
    });
    // Select Next Element
    shortcut.add("CtrL+Down", function() {
      if ( $(".selected").is(":visible") ) {
        if ( $("#movenext").is(":visible") ) {
          if ( $("input, textarea").is(":focus") || $("#editelement.active").is(":visible") || $("#styleelement.active").is(":visible") ) {
            return false;
          } else {
            $("#movenext").trigger("click");
          }
        }
      }
    });

    $(document).keydown(function(e) {
      if ( $(".selected").is(":visible") ) {
        // Del to Delete element
        if (e.which === 46) {
          if ( $("#editelement.active").is(":visible") || $("input[type=text], textarea").is(":focus") ) {
            // Do nothing
          } else {
            $("#delelement").trigger("click");
          }
        }
      }
      
      // Change tagName from "Enter" Key
      if ($(".selected-tag, .selected-element").is(":focus")) {
        if (e.which === 13) {
          changeTagName();
        }
        SelectElements();
      }
    }).keyup(function() {
      if ( $("#editelement").hasClass() === "active") {
        // Up & Down Arrow Keys To Select/Deselect Element in Editable
        if (e.which === 38 || 40 )  {
          $("#dynamic-storage").children().each(function() {
            $(this).removeClass("selected").addClass("selected");
          });
        }
      }
    });
  });
});
