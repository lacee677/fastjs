var url = window.location.href;
url = decodeURI(url)
var hasParameter = false;


if(url.split("?")){
  url = url.split("?")
  if(url[1].split("=")){
    url = url[1].split("=")
    if(url[1].split(",")){
      url = url[1].split(",")
      hasParameter = true;
    }
  }
}

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function fillZeros(st) {
  if ((st.toString().length) < 2) {
    return "0" + st.toString();
  }
  return st;
}

function getProgramFromTheServer() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://www.gombaszog.sk/api/program");
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        var answer = JSON.parse(xmlhttp.responseText);
        console.log("Programok frissítve!");
        renderPrograms(answer);
      }
      else {
        console.log("Hiba: " + xmlhttp.statusText);
      }
    }
  }
  xmlhttp.send();
}

function renderPrograms(programs) {
  var actProgram = document.getElementById("contentdiv");

  for (var i = 0; i < programs.program.length; i++) {
    actProgram.appendChild(programItemCreator(programs.program[i].name, programs.program[i].description, programs.program[i].partner, programs.program[i].location, new Date(programs.program[i].start), new Date(programs.program[i].end)));
  }
}

function programItemCreator(title, description, organizer, location, start, end) {

  var days = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];

  function day(cday) { // day of the week
    return days[cday];
  }

  var mainNode = document.createElement("DIV");

  var titleNode = document.createElement("DIV");
  var dayNode = document.createElement("DIV");
  var locationNode = document.createElement("span");
  var timeBlock = document.createElement("DIV");
  var timeStartNode = document.createElement("SPAN");
  var timeEndNode = document.createElement("SPAN");
  var timeSpanNode = document.createElement("SPAN");
  var descriptionNode = document.createElement("SPAN");

  var startShow = fillZeros(start.getHours()) + ":" + fillZeros(start.getMinutes());
  var day = day(start.getDay());
  var endShow = ((new Date(end - start)).getMinutes() === 1) ? "" : " - " + fillZeros(end.getHours()) + ":" + fillZeros(end.getMinutes());
  var timeSpan = ((new Date(end - start).getDay() - 4) == 0) ? "" : new Date(end - start).getDay() - 4;
  timeSpan += " " + fillZeros(new Date(end - start).getHours() - 1) + ":" + fillZeros(new Date(end - start).getMinutes());
  var locShow = location ? location : "";
  var orgShow = organizer ? organizer : "";
  var titleShow = title ? title : "";
  var description = description;

  parameter = "";
  tempStart = 0;

  found = false;

  for(var i = 0; i < url.length; i++){
    url[i] = decodeHtml(url[i])
    if(locShow == url[i]){
      found = true;
    }
  }
  if(url.length)
  console.log(url)

  if (((start.getDay() == parseInt(parameter) && start.getHours() > 5) || (start.getHours() < 5 && start.getDay() == tempStart) || parameter == "" )&& ( found == true || hasParameter == false)) {
    mainNode.setAttribute("class", "items");
    locationNode.setAttribute("class", "location");
    timeStartNode.setAttribute("class", "programtime-start");
    timeStartNode.setAttribute("class", "programtime-end");
    titleNode.setAttribute("class", "itemtitle");

    mainNode.appendChild(titleNode);
    mainNode.appendChild(timeBlock);
    timeBlock.appendChild(timeStartNode);
    timeBlock.appendChild(timeEndNode);
    timeBlock.appendChild(timeSpanNode);
    timeBlock.appendChild(locationNode);
    timeBlock.appendChild(descriptionNode);

    timeStartNode.innerHTML = day + " | " + startShow;
    timeEndNode.innerHTML = endShow;
    timeSpanNode.innerHTML = " > " + timeSpan + ' | ' ;
    locationNode.innerHTML = locShow + ' | ';
    titleNode.innerHTML = titleShow;
    descriptionNode.innerHTML = description;
  }

  return mainNode;
}
