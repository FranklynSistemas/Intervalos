
window.onload = function(e) {
             
var inputInterval = document.getElementById("inIntervalo"),
	resultado = document.getElementById("divResultado");
var intervalos = [];

function ingresaIntervalo(intervalo){
	if(intervalos.length === 0 ){
		intervalos.push(intervalo);
	}else{
		var nuevoInterval = verificaIntervalo(intervalo);
		console.log(nuevoInterval);
		if(nuevoInterval.pos !== -1){
			intervalos.splice(nuevoInterval.pos,1, nuevoInterval.interval);
		}else{
			intervalos.push(intervalo);
		}
	}
	muestraResultado();
}

function verificaIntervalo(intervalo){
	var newIntervalo = [];
	for (var i = 0; i < intervalos.length; i++) {
			if(intervalos[i][0] < intervalo[0] && intervalo[0] < intervalos[i][1] && intervalos[i][1] < intervalo[1]){
				newIntervalo = [intervalos[i][0],intervalo[1]];
				return {pos: i, interval: newIntervalo};
			}else if(intervalo[0] < intervalos[i][0] && intervalos[i][0] < intervalo[1] && intervalo[1] < intervalos[i][1]){
				newIntervalo = [intervalo[0],intervalos[i][1]];
				return {pos: i, interval: newIntervalo};
			}
	}
	return {pos: -1, interval: []};
}

function muestraResultado(){
	var html = "<ul class='lista'>";
	for (var i = 0; i < intervalos.length; i++) {
		html += "<li>"+intervalos[i][0]+" _____________ "+intervalos[i][1]+"</li>";
	}
	html += "</ul>";
	inputInterval.value = "";
	resultado.innerHTML = html;
}

function ordenaArray(a,b){
	return a < b ? [a,b] : [b,a];
}

document.getElementById("btnProcesar").addEventListener("click", function(){
	var interval = inputInterval.value,
		regExp = new RegExp("(\\d+).*?(\\d+)",["i"]);
	if(interval.length < 3  || !regExp.test(interval)){
		console.log("No Valido");
	}else{
		ingresaIntervalo( ordenaArray( parseInt(interval.split(",")[0]) , parseInt(interval.split(",")[1]) ) );	
	}
	
}); 
};