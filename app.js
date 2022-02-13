
let bmi = document.getElementById("current-bmi");




function getWeights(){
    var populatedObject = localStorage.getItem('chartJSON');
    var parsedObject = JSON.parse(populatedObject);
    if (parsedObject === null) {
        return [];
    }
    var weights = parsedObject.weights;
    console.log(weights);
    return weights;
}
function getDates(){
    var populatedObject = localStorage.getItem('chartJSON');
    var parsedObject = JSON.parse(populatedObject);
    if (parsedObject === null) {
        return [];
    }
    var dates = parsedObject.dates;
    console.log(dates);
    return dates;
}
function getRecentBMI(){
    var retrievedObject = localStorage.getItem('chartJSON');
    var parsedObject = JSON.parse(retrievedObject);
    if (parsedObject === null) {
        return "no data";
    }
    
    let mostRecentWeight = parsedObject.weights[parsedObject.weights.length-1];
    //calculate BMI
    let mostRecentBMI = 703 * mostRecentWeight / (73*73) ;
    mostRecentBMI = mostRecentBMI.toFixed(2);
    let returnString = "Your BMI is " + mostRecentBMI;
    if (mostRecentBMI < 18.5){
        returnString = returnString + " (underweight)";
    }
    else if (mostRecentBMI < 25){
        returnString = returnString + " (normal weight)";
    }
    else if (mostRecentBMI < 30){
        returnString = returnString + " (overweight)";
    }
    else{
        returnString = returnString + " (obese)";
    }
    return returnString;
}


function appendLocalStorage(weight, date){
    //if either weight or date is null, do nothing
    if(weight === ""|| date === ""){
        return;
    }
    var retrievedObject = localStorage.getItem('chartJSON');
    var jsonObject = {
        "weights": [weight],
        "dates":[date]
    }
    if (retrievedObject === null) {
        console.log("no data");
        localStorage.setItem('chartJSON', JSON.stringify(jsonObject));
        return [];
    }
    else{
        
        var populatedObject = localStorage.getItem('chartJSON');
        console.log(populatedObject);
        var parsedObject = JSON.parse(populatedObject);
        if (parsedObject == null) {
            localStorage.setItem('chartJSON', JSON.stringify(jsonObject));
        }
        else{
            var weights = parsedObject.weights;
            var dates = parsedObject.dates;
            weights.push(weight);
            dates.push(date);
            jsonObject.weights = weights;
            jsonObject.dates = dates;
            localStorage.setItem('chartJSON', JSON.stringify(jsonObject));
        }
    }
                
}

const labels = getDates();

  const data = {
    labels: labels,
    datasets: [{
      label: 'Weight',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: getWeights(),
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  
  function logWeight() {
      console.log("logWeight");
    var date = new Date(Date.now());
    var dateString = date.toLocaleString();
    console.log(date);
    bmi.innerText = getRecentBMI();
    // Get the value of the input field with id="numb"
    let weight = document.getElementById("weight").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (isNaN(weight) || weight <= 0  || weight == "") {
      text = "Input not valid";

    } else {
      text = "Input OK";

      appendLocalStorage(weight, dateString);
      addData(myChart, dateString, weight);
      

    }
    document.getElementById("valid").innerHTML = text;

  }

  function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}







const myChart = new Chart(
document.getElementById('myChart'),
config
);






function wipeData(){
    localStorage.clear();
    window.location.reload();
}


let weights = getWeights();
  
let list = document.getElementById("myList");
  
weights.forEach((item)=>{
  if (item === null){

    return;
  }
  else{
    let li = document.createElement("li");
    li.innerText = item +" Pounds"+ "\n" + getDates()[weights.indexOf(item)];
    list.appendChild(li);
  }
})

bmi.innerText = getRecentBMI();