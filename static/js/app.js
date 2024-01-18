const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

  //First function controls dropdown
  //Initialize dashboard at start up
  function init() {

 // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable
  //Use 'names' not 'id' because names are in a list 
   
d3.json(url).then((data) => {   
  //Create an array
  let names = data.names; 
  //id is the variable created, not the existing object
  //Use forEach because we have array (as opposed to for n in range, length_names, wherein range will start at 0)  
   names.forEach((id) => {
dropdownMenu
.append("option")
.text(id)
.property("value", id)
   });
  
// Set the first sample from the list
let sample_one = names[0];

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
let panel = d3.select("#sample-metadata");

panel.html("");


for (key in valueData) {
     panel.append("h5").text(`${key.toUpperCase()}: ${valueData[key]}`)
}
  });
  };



 // New function to build bubble chart

function buildBubbleChart(sample) {
  //D3 to fetch data required for each function
d3.json(url).then(function(data) {
  let samples = data.samples; 
  let sampleArray = samples.filter(sampleDict => sampleDict.id == sample)

//Grab the first sample from array 
let value = sampleArray[0];
//Value here is not a keyword, rather the name of each row of sample array
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

// Set up the layout, this step isn't necessary but offers structure (e.g. can change size) 
let layout = {
  title: "Bacteria Per Sample",
  hovermode: "closest",
  xaxis: {title: "OTU ID"},
};
   
//div tag with id "bubble" (ids are unique) dictates where graph will be placed on page  
Plotly.newPlot("bubble", [trace1], layout);
});
};

//New function to build bar chart
function buildBarChart(sample) {
 
d3.json(url).then((data) => {
  let samples = data.samples;
  let sampleArray = samples.filter(sampleDict => sampleDict.id == sample)
  let value = sampleArray[0];

let otu_ids = value.otu_ids;
let otu_labels = value.otu_labels;
let sample_values = value.sample_values;
//Print data to console to check 
console.log(otu_ids,otu_labels,sample_values);

// Top ten items to display in descending order
//Use fstring otherwise out ids will be treated as continuous integer 
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
