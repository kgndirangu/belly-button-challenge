const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//EVERY FUNCTION NEEDS A D3 CALL 

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);  
    let names = data.names; 
    console.log(names);
        });

  //First function control dropdown
  //initialize dashboard at start up
  function init() {

 // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

     // Assign the value of the dropdown menu option to a variable
        //use 'names' not 'id' because names are in a list 
        //easier to use forEach becasue we have array as opposed to for n in range lenght_names, range will be 0, 1, 2 
d3.json(url).then((data) => {   
  //this becomes an array
  let names = data.names; 
  //id is the variable created, not the existing object  
   names.forEach((id) => {
dropdownMenu
.append("option")
.text(id)
.property("value", id)
   });
  
// Set the first sample from the list
let sample_one = names[0];

// Log the value of sample_one
console.log(sample_one);

// Initialize plots 

buildMetadata(sample_one);
buildBarChart(sample_one);
buildBubbleChart(sample_one);
});
};

//New function to build metadata demographics  
function buildMetadata(sample) {
  d3.json(url).then((data) => {
    let metadata = data.metadata;
    let value = metadata.filter(result => result.id == sample);
    console.log(value);
    let valueData = value[0];

d3.select("#sample-metadata").html("");
let PANEL = d3.select("#sample-metadata");

PANEL.html("");


for (key in valueData) {
     PANEL.append("h5").text(`${key.toUpperCase()}: ${valueData[key]}`)
}
  });
  };



 // New functions to build bubble chart
 //HOW DO WE KNOW WHERE CHART GOES ON PAGE?
function buildBubbleChart(sample) {
  //D3 to fetch data
d3.json(url).then(function(data) {
  let samples = data.samples; 
  let sampleArray = samples.filter(sampleDict => sampleDict.id == sample)

  //Grab the first index from array needed?
let value = sampleArray[0];
//value here is not a keyword, rather the name of each row of sample array
//why don't we have to create a list and push each row to the list
let otu_ids = value.otu_ids;
let otu_labels = value.otu_labels;
let sample_values = value.sample_values;
console.log(otu_ids,otu_labels,sample_values);

let trace1 = {
  x: otu_ids,
  y: sample_values,
  text: otu_labels,
  mode: "markers",
  marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: "Earth"
  }
};

// Set up the layout, can also change size 
let layout = {
  title: "Bacteria Per Sample",
  hovermode: "closest",
  xaxis: {title: "OTU ID"},
};
   
//"bubble" div tag with id "bubble" remmber ids are unique  
Plotly.newPlot("bubble", [trace1], layout);
});
};

//New function to build bar chart
function buildBarChart(sample) {
  //this is repetion of above code, can these be combined?
 
d3.json(url).then((data) => {
  let samples = data.samples;
  let sampleArray = samples.filter(sampleDict => sampleDict.id == sample)
  let value = sampleArray[0];

let otu_ids = value.otu_ids;
let otu_labels = value.otu_labels;
let sample_values = value.sample_values;
//print data to console 
console.log(otu_ids,otu_labels,sample_values);

// Top ten items to display in descending order
let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
let xticks = sample_values.slice(0,10).reverse();
let labels = otu_labels.slice(0,10).reverse();

// Set up the trace for the bar chart
let trace2 = {
    x: xticks,
    y: yticks,
    text: labels,
    type: "bar",
    orientation: "h"
};

// Layout
let layout = {
    title: "Top 10 Bacteria Cultures Present"
};

// Call Plotly to plot the bar chart
Plotly.newPlot("bar", [trace2], layout)
});
};

  // Function that updates dashboard when sample is changed
function optionChanged(x) { 
  // Log the new value
  console.log(x); 
  // Call functions 
  buildMetadata(x);
  buildBarChart(x);
  buildBubbleChart(x);
 };
init();
