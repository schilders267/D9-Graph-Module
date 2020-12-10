jQuery(document).ready(function() {
jQuery("div.Bar").each(function(){

  // set the dimensions and margins of the graph
/*var margin = {top: 0, right: 0, bottom: 0, left: 0},
width = 700 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;*/
var margin = {top: 10, right: -100, bottom: 30, left: 30},
width = 650 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;
var chartmax = 350;
// set the ranges
var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);
var y = d3.scaleLinear()
      .range([height, 0]);

const ticksAmount = 4;
const tickStep = 25;

var title = jQuery(this).attr("label");
//console.log(title);
var svg = d3.select("[label='" + title + "']")
.append("svg")
.attr("viewBox", "0 0 " + width +" "+ height)
.append("g")
.attr("transform", 
      "translate(" + margin.left + "," + margin.top + ")");
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin



var data_file = d3.select("[label='" + title + "']").attr("data");
var top_text =  d3.select("[label='" + title + "']").attr("top_text");
var left_text = d3.select("[label='" + title + "']").attr("left_text");
// get the data
d3.json(data_file, function(error, data) {
if (error) throw error;
// format the data
data.forEach(function(d) {
d.Perc = +d.Perc;
d.Appr = +d.Appr;

}); 

// Scale the range of the data in the domains
x.domain(data.map(function(d) { return d.Year; }));
y.domain([0, 100]);

// append the rectangles for the bar chart
svg.selectAll(".bar")
  .data(data)
.enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) {
    //return ((i * (width / data.length) + (width / data.length) / 2) - (x.bandwidth() / 4));
   return x(d.Year) + x.bandwidth() /  4;
  })
  .attr("width", x.bandwidth() / 2)
  .attr("y", function(d) { return y(d.Perc); })
  .attr("height", function(d) { return height - y(d.Perc); });
  

//Percentage text top of bars
  svg.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text(function(d) {
           return d.Perc + '%';

  })
  .attr("text-anchor", "middle")
  .attr("x", function(d, i) {
       return (i * (width / data.length) + (width / data.length) / 2)})
  .attr("y", function(d) {
    return height - (height - y(d.Perc) + 5);
    
})
  .style("font-family", "Source Sans Pro")
  .style("font-size", "15px")
  .style("font-weight", "bold")
  .attr("fill", "black");


// END Percentage text


// add the x Axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .style("font-size", "12px")
  .call(d3.axisBottom(x)
  .tickSizeOuter(0));

svg.append("text")
    .attr("y", 0)
    .attr("x", 250)
    .attr("font-weight", 500)
    .attr("dy", ".71em")
    .style("text-anchor", "middle")
    .style("font-weight", 500)
    .text(top_text)
    .style("font-size", "15px")
    .style("fill","#000000")
    .call(d3.axisBottom(x));
  
    var formatPercent = d3.format(".0%");


// add the y Axis
svg.append("g").call(d3.axisLeft(y).tickValues(d3.range(0, 100 + tickStep, tickStep)).tickSizeOuter(0));
//Works in chrome for percent:
//svg.append("g").call(d3.axisLeft(y).tickValues(d3.range(0, 100 + tickStep, tickStep)).tickFormat(d => d + "%").tickSizeOuter(0));

svg.append("text")
.attr("transform", "rotate(-90)")
  .attr("y", -70)
  .attr("x", -200)
  .attr("dy", ".71em")
  .style("font-family", "Source Sans Pro")
  .style("font-size", "15px")
  .style("fill","black")
  .style("text-anchor", "middle")
  .text(left_text)
  .call(d3.axisLeft(y));
  
    //Append approvals data to bottom

 /* data.forEach(function(d) {
  d.Appr = +d.Appr;
  svg.append("text")
    .attr("transform", "rotate(0)")
    .attr("y", 390)
    .attr("x", function(d, i) {
      return (i * (width / 5) + (width / 5) / 2)})
    .attr("dy", ".71em")
    .text("(" + d.Appr + " approvals)")
    .style("fill","#000000")
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .call(d3.axisBottom(x));
  
  }); */ 
  var i = 0;

  data.forEach(function(d) {
    var xval = (i * (width / data.length) + (width / data.length) / 2);

  d.Appr = +d.Appr;
          svg.append("text")
            .attr("transform", "rotate(0)")
            .attr("y", 390)
            .attr("x", xval)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .text("(" + d.Appr + " approvals)")
            .style("fill","#000000")
            .style("font-size","12px")
            .call(d3.axisBottom(x));
      i = i +1;
  });
});

});
if(jQuery(".bef-exposed-form")){
 // jQuery(".bef-exposed-form").scrollToMe();
}
});
/*jQuery.fn.extend({
  
    scrollToMe: function () {
      try{
      var x = jQuery(this).offset().top - 100;
      jQuery('html,body').animate({scrollTop: x}, 400);
      }
      catch(e){
        //console.log('not this page');
      }
    
 }});*/