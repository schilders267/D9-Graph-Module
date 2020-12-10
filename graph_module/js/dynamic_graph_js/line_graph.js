(function ($) {

  Drupal.behaviors.graph_module = {
    attach: function (context, settings) {
      var line_graph_color = settings.dynamic_graph_js.line_graph_color;
      console.log(line_graph_color);
      window.line_graph_color = line_graph_color;

      // set the dimensions and margins of the graph
      var margin = {top: 10, right: -100, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      $(context).find("div.Line").once("some-arbitrary-key").each(function () {
        //console.log(line_graph_color + 'color method 1');
        console.log(window.line_graph_color + 'from each statement');
        //console.log($(this));
        var title = $(this).attr("label");
        //console.log(title);
        var svg = d3.select("[label='" + title + "']")

          .append("svg")
          .attr("viewBox", "0 0 " + width + " " + height)
          .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        var data_file = d3.select("[label='" + title + "']").attr("data");
        var top_text = d3.select("[label='" + title + "']").attr("top_text");
        var left_text = d3.select("[label='" + title + "']").attr("left_text");
        var max_days = d3.select("[label='" + title + "']").attr("max_days");
        max_days = Number(max_days);

        //Read the data
        d3.json(data_file, function (error, data) {

          // format the data
          data.forEach(function (d) {
            d.value = +d.value;
            d.appr = +d.appr;

          });
          var max_index = 0
          /*
              fetch(data_file)
                .then(function(resp) {
                  return resp.json();
                })
                .then(function(data){
                   max_index = data.length;
                   console.log(max_index);
                });*/

          var request = new XMLHttpRequest();
          request.open("GET", data_file, false);
          request.send(null)
          var my_JSON_object = JSON.parse(request.responseText);
          max_index = my_JSON_object.length;

          var x = d3.scaleBand()
            .domain(data.map(function (d) {
              return d.index;
            }))
            .rangeRound([0, width], 0, 0)
            .padding(0, 0);

          svg.append("g")
            .attr("transform", "translate(-4," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0)
              .tickValues(0));


          // Add Y axis
          var y = d3.scaleLinear()
            .domain([0, max_days])
            .range([height, 0]);

          svg.append("g")
            .attr("transform", "translate(-5,0)")
            .call(d3.axisLeft(y)
              .tickSizeOuter(0));
          var transformx = 0;
          switch (max_index) {
            case 5:
              transformx = -69;
              break;
            case 6:
              transformx = -59;
              break;
            case 7:
              transformx = -53;
              break;
            case 8:
              transformx = -46;
              break;
            case 9:
              transformx = -41;
              break;
            case 10:
              transformx = -36;
          }

          svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#24413b")
            .attr("stroke-width", 4)
            .attr("d", d3.line()
              .x(function (d) {
                return (x(d.index) + x.bandwidth() / 2) + transformx
              })
              .y(function (d) {
                return y(d.value)
              })
            )
          // Add the area

          svg.append("path")
            .datum(data)
            .attr("fill", "#76bab2")
            .attr("fill-opacity", 1)
            .attr("stroke", "none")
            .attr("d", d3.area()
              .x(function (d) {
                return (x(d.index) + x.bandwidth() / 2) + transformx
              })
              .y0(height)
              .y1(function (d) {
                return y(d.value)
              })
            )

          // Add the line
          svg.selectAll("myCircles")
            .data(data)
            .enter()
            .append("circle")
            .attr("fill", "#24413b")
            .attr("stroke", "none")
            .attr("cx", function (d) {
              return (x(d.index) + x.bandwidth() / 2) + transformx
            })
            .attr("cy", function (d) {
              return y(d.value)
            })
            .attr("r", 3)

          svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -70)
            .attr("x", -200)
            .attr("dy", ".71em")
            .style("font-family", "Source Sans Pro")
            .style("font-size", "15px")
            .style("fill", "black")
            .style("text-anchor", "middle")
            .style("font-weight", "normal")
            .text(left_text)
            .call(d3.axisLeft(y));

          svg.append("text")
            .attr("y", 0)
            .attr("x", 250)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .text(top_text)
            .style("font-size", "15px")
            .style("fill", "#000")
            .call(d3.axisBottom(x));

          var i = 0;
          data.forEach(function (d) {
            var xval = (x(d.index) + x.bandwidth() / 2) + transformx;

            svg.append("text")
              .attr("transform", "rotate(0)")
              .attr("x", xval)
              .attr("y", 370)
              .attr("dy", ".71em")
              .style("text-anchor", "middle")
              .text(d.year)
              .style("fill", "#000")
              .style("font-size", "12px")
              .call(d3.axisBottom(x));

            d.appr = +d.appr;
            var fontsize = "12px";
            if (max_index > 7) {
              fontsize = "10px";
            }
            if (max_index > 9) {
              fontsize = "9px";
            }
            svg.append("text")
              .attr("transform", "rotate(0)")
              .attr("y", 390)
              .attr("x", xval)
              .attr("dy", ".71em")
              .style("text-anchor", "middle")
              .text("(" + d.appr + " approvals)")
              .style("fill", "#000")
              .style("font-size", fontsize)
              .call(d3.axisBottom(x));

//Make sure the first number above dot has enough room next to y axis
            var yval = height - (height - y(d.value)) - 37;
            if (i == 0) {
              xval = i + 10;
              yval = yval - 12;
            }
            svg.append("text")
              .attr("transform", "rotate(0)")
              .attr("y", yval)
              .attr("x", xval)
              .attr("dy", ".71em")
              .style("text-anchor", "middle")
              .text(d.value)
              .style("fill", "#000")
              .style("font-size", "15px")
              .style("font-weight", "bold")
              .call(d3.axisBottom(x));
            i = i + 1;

          });



      });
  // append axis to this g
    // your y-axis will be in the margin, so adjust margins.left to fit

    });
  }
}
})(jQuery);
