const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//EVERY FUNCTION NEEDS A D3 CALL 

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);  
    let names = data.names; 
    console.log(names);
   
     }
  );

  //initialize dashboard at start up
  function init() {

 // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

     // Assign the value of the dropdown menu option to a variable
        //use names not ID because names are in a list  
d3.json(url).then((data) => {   
  let names = data.names; 
  //name_id is the variable created  
   names.forEach((name_id) => {
dropdownMenu
.append("option")
.text(name_id)
.property("value", name_id)
  
// Set the first sample from the list
let sample_one = names[0];

// Log the value of sample_one
console.log(sample_one);

// Initialize plots 
//HOW CAN WE DO THIS BEFORE INTRODCUING THIS FUNCTION 
buildMetadata(sample_one);
//buildBarChart(sample_one);
//buildBubbleChart(sample_one);


//New function to build metadata demographics  
function buildMetadata(sample) {
  d3.json(url).then((data) => {
    let metadata = data.metadata;
    let value = metadata.filter(result => result.id == sample);
    console.log(value)
    let valueData = value[0]
//UNCLEAR HERE, only printing 
let PANEL = d3.select("#sample-metadata");

PANEL.html("");

for (key in valueData) {
     PANEL.append("h5").text(`${key.toUpperCase()}: ${valueData[key]}`)
}
  });
  };
});


  // New functions to build bubble chart
// function buildBubbleChart(sample) {
//   //D3 to fetch data
// d3.json(url).then(function(data) {
//   let samples = data.samples; 
//   let sampleArray = samples.filter(sampleDict => sampleDict.id == sample)

//   //Grab the first index from array needed?
// let value = sampleArray[0];
// //value here is not a keyword, rather the name of each row of sample array
// //why don't we have to create a list and push each row to the list
// let otu_ids = value.otu_ids;
// let otu_labels = value.otu_labels;
// let sample_values = value.sample_values;
// console.log(otu_ids,otu_labels,sample_values);
// // Set up the layout
// let layout = {
//   title: "Bacteria Per Sample",
//   hovermode: "closest",
//   xaxis: {title: "OTU ID"},
// }



//   let trace1 = {
//     x: otu_ids,
//     y: sample_values,
//     text: otu_labels,
//     mode: "markers",
//     marker: {
//         size: sample_values,
//         color: otu_ids,
//         colorscale: "Earth"
//     }
//       };
//     });
   
// }; };
   
//     Plotly.newPlot("bubble", [trace1], layout);
  }
  //still part of function init 
)}

  // Function that updates dashboard when sample is changed
function optionChanged(newSample) { 
  // Log the new value
  console.log(newSample); 
  // Call functions 
  buildMetadata(newSample);
  //buildBarChart(value);
  //buildBubbleChart(value);
 // buildGaugeChart(value);
};
init();