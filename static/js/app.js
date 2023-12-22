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

//      
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


//   let trace = {
//     x: otu_names,
//     y: otu_numbers,
//     type: "bar"
//   };

//   let otu = [trace];

//   Plotly.newPlot("plot", otu);
  
// //   //Filter Day 2 Activity 4
// //   //Slice data Day 2 Activity 9

init();