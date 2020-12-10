(function ($) {
    Drupal.behaviors.graph_module = {
    attach: function (context, settings) {
      $('#edit-field-chart-type', context).change(function(){
        var type = $(this).val();
        if (type == 'Bar'){
          $( "#edit-field-maximum-chart-size-0-value" ).attr( "disabled", true ).css( "background", "lightgrey" );
        }
        else {
          $("#edit-field-maximum-chart-size-0-value").removeAttr("disabled").css( "background", "white" );
        }
      })
    }
  };
})(jQuery);

