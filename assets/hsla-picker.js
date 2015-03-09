/**
 * HSLA Color Picker 1.0
 * © 2014 Michael Schwartz
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope $this it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, you can view/download it from...
 * https://www.gnu.org/licenses/gpl-2.0.html
 */
 
 (function($) {
  $.fn.HSLAColorPicker = function(container) {
    var $this = $(this);
    container = $(container).get(0);
    $(container).addClass("hsla-cpick-container").html('<table class="cpick"> <tr> <td><div class="colorwheel"><input class="colorpick-hue" value="328" min="0" max="360" type="range"></div></td> </tr> <tr> <td><div class="colorpick-s-bg"><input class="colorpick-s" min="0" max="100" value="100" type="range"></div></td> </tr> <tr> <td><div class="colorpick-l-bg"><input class="colorpick-l" min="0" max="100" value="100" type="range"></div></td> </tr> <tr> <td><div class="colorpick-a-bg"><input class="colorpick-a" step=".01" min="0" max="1" value="1" type="range"></div></td> </tr> </table>');
    
    var ApplyHSLACodeNPrev = function() {
      if ( $(container).children().find(".colorpick-a").val() === "1" ) {
        $this.val( "hsl(" + $(container).children().find(".colorpick-hue").val() + ", " + $(container).children().find(".colorpick-s").val() + "%, " + $(container).children().find(".colorpick-l").val() + "%)").change();
      } else {
        $this.val( "hsla(" + $(container).children().find(".colorpick-hue").val() + ", " + $(container).children().find(".colorpick-s").val() + "%, " + $(container).children().find(".colorpick-l").val() + "%, " + $(container).children().find(".colorpick-a").val() + ")").change();
      }
      if ( $(container).children().find(".colorpick-a").val() === "0" ) {
        $this.val("transparent").change();
      }
      if ( $(container).children().find(".colorpick-l").val() > 50 ) {
        $this.css({
          "background-color": $this.val(),
          "color": "#000"
        });
      } else {
        $this.css({
          "background-color": $this.val(),
          "color": "#fff"
        });
      }

      // Alpha Saturation
      $(container).children().find(".colorpick-s-bg").css({
        "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".colorpick-hue").val() + "," + $(".colorpick-s").val() + "%," + $(".colorpick-l").val() + "%)" + " 100%)"
      });
      // Alpha Lightness
      $(container).children().find(".colorpick-l-bg").css({
        "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".colorpick-hue").val() + "," + $(".colorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
      });
      // Alpha Preview
      $(container).children().find(".colorpick-a-bg").css({
        "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".colorpick-hue").val() + "," + $(".colorpick-s").val() + "%," + $(".colorpick-l").val() + "%)" + " 100%)"
      });
    };

    $this.on('mousedown touchstart focus', function(e) {
      ApplyHSLACodeNPrev();
    });

    // Apply HSLA Code from Sliders
    $(container).children().find(".colorpick-hue, .colorpick-s, .colorpick-l, .colorpick-a").on('change', function() {
      ApplyHSLACodeNPrev();
    });
    ApplyHSLACodeNPrev();
  };
}) (jQuery) ;
