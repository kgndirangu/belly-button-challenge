const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const samples = d3.json(url);
console.log(samples); 

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });

  let otu_numbers = []
  let otu_names = []

  //For loop to poulate array 
  for (let i=0; i <samples.legnth; i++) {
row = samples[i];
otu_names.push(row.otu_labels);
otu_numbers.push(row.otu_id);

  }

  let trace = {
    x: otu_names,
    y: otu_numbers,
    type: "bar"
  };

  let otu = [trace];
  Plotly.newPlot("plot", otu);
  