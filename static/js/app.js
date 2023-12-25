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
   
   })  } )
  };


  // Build bubble chart
function buildBubble(sample) {
  //D3 to fetch data
d3.json(url).then(function(data) {
  let samples = data.samples; 
  let sampleArray = samples.filter(sampleDict => sampleDict.id == sample)
});

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
      }};


   
    Plotly.newPlot("bubble", trace1);
// //   //Initialize x and y arrays
// //   let otu_names = []
// //   let otu_numbers = []

// //     //For loop to poulate array 
// //     for (let i=0; i <names.legnth; i++) {
// //       row = names[i];
// //       otu_names.push(row.otu_labels);
// //       otu_numbers.push(row.otu_id);

//   }
  
//   };
// //   //Filter Day 2 Activity 4
// //   //Slice data Day 2 Activity 9

init();