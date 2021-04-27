// -------------------------------------------------------------
// ----------- FUNÇÕES PARA BUSCA DE FILMES POR TERMO ----------
// -------------------------------------------------------------

var buscaFilme = null
var url = null
function recebeValor() {
	// Variavel buscaFilme,recebe o valor que foi passado no input
	//Este valor é passado na URL com nossa chave que permite mil requisições
	// Apos isso chamamos o metodo extrator de Filmes.	
	var buscaFilme = document.getElementById("busca-termo").value
	url = `https://www.omdbapi.com/?s=${buscaFilme}&apikey=d93ed787`	
	extratorIdFilmes()
}

var output = '';
var arrayFilmesId = []
var filmesJSON = null
function extratorIdFilmes() {
	// O fetch busca a caminho que foi recebido na variavel URL, ao obtermos a resposta, é transformada em JSON
	// Com o Json temos os dados, os dados são recebido na variavel FILMESJson, e com ele acessamos o atributo desejado
	// Validamos o tamanho da variavel e buscamos de cada filme seu atributo "imdbID" pois assim conseguimos maiores respostas.
	// Então chamamos o metodo buscaFilmesId.
	fetch(url)
		.then(response => response.json())
		.then(data => {
			filmesJSON = data
			for(var i = 0; i < filmesJSON["Search"].length; i++){
				arrayFilmesId[i] = filmesJSON["Search"][i]["imdbID"];
					}
							console.log(filmesJSON.Poster)
			buscaFilmesById()
		})
}

var arrayBoxOffice = []
var arrayYear = []
var arrayRuntime = []
var arrayImdbRating = []
var filmesIdJSON = []
var arrayImdbVotes = []
var arrayTitle = []

function buscaFilmesById(){
	// Descobrimos que se buscarmos os filmes passando Id's temos muito mais respostas
	// Pegamos o id recebido e passamos ele na url, assim tratamos como no metodo extratorDeFilmes
	// Assim temos mais respostas para gerar gráficos.
	// Chamamos o método verificaAtributos para coletar as informações.
	// Para mostrarmos os catalagos pegamos a propriedade POSTER e inserimos colocando a cada filme encontrado.
	for(var i = 0; i < arrayFilmesId.length; i++) {		
		var buscaFilmesId = `https://www.omdbapi.com/?i=${arrayFilmesId[i]}&apikey=d93ed787`		
		fetch(buscaFilmesId)
			.then(response => response.json())
			.then(data => {
				verificaAtributos(data)
				filmesIdJSON.push(data)
				output +=`
                           		 <div class="col-md-2" style="padding:30px;">
                                		<div class="well text-center">
                                    			<img src="${data.Poster}">
                                    			<h5>${data.Title}</h5>
                                		</div>
                           		 </div>
                            `	
				console.log(data)	
			})			
	}	
	document.getElementById("bnt-gerar-graficos").style.display = ''
	console.log()
}

function verificaAtributos(data) {	
	// Para verificar os atributos, pegamos a propriedade que é devolvida
	// Tratamos os dados para que possamos gerar graficos. 
	
	data.hasOwnProperty("BoxOffice") ? (
		arrayBoxOffice.push(parseInt(data["BoxOffice"]
			.replace("$","")
			.replace(",","")
			.replace("N/A","0")))
	) : ( 
		arrayBoxOffice.push(0)
	)		
	data.hasOwnProperty("Runtime") ? (
		arrayRuntime.push(parseInt(data["Runtime"]
			.replace(" min","")
			.replace("N/A","0")))
	) : (
		arrayRuntime.push(0)
	)		
	data.hasOwnProperty("imdbRating") ? (
		arrayImdbRating.push(parseFloat(data["imdbRating"]
			.replace("N/A","0.0"))) 
	) : (
		arrayImdbRating.push(0.0)
	)

	data.hasOwnProperty("imdbVotes") ? (
		arrayImdbVotes.push(parseInt(data["imdbVotes"]
			.replace("N/A","")
			.replace(",","")
			.replace(",","")))
	) : (
		arrayImdbVotes.push(0)
	)
	data.hasOwnProperty("Year") ? (
		arrayYear.push(parseInt(data["Year"]
			.replace("N/A","0")))		
	) : (
		arrayYear.push(0)
	)		
	data.hasOwnProperty("Title") ? (
		arrayTitle.push(data["Title"])
	) : (
		arrayTitle.push("Sem título")
	)		
}

// -------------------------------------------------------------
// ------ FIM DAS FUNÇÕES PARA BUSCA DE FILMES POR TERMO -------
// -------------------------------------------------------------

// -------------------------------------------------------------
// ---------- FUNÇÕES PARA BUSCA POR TÍTULO --------------------
// -------------------------------------------------------------

var buscaFilme1 = null
var buscaFilme2 = null
var buscaFilme3 = null
var buscaFilme4 = null
var buscaFilme5 = null
var buscaFilme = []
function recebeTitulos() {
	/*	retira os espaços do input e assim insere no array. */
	buscaFilme1 = document.getElementById("titulo1").value.replaceAll(" ","&")
	buscaFilme2 = document.getElementById("titulo2").value.replaceAll(" ","&")
	buscaFilme3 = document.getElementById("titulo3").value.replaceAll(" ","&")
	buscaFilme4 = document.getElementById("titulo4").value.replaceAll(" ","&")
	buscaFilme5 = document.getElementById("titulo5").value.replaceAll(" ","&")
	buscaFilme.push(buscaFilme1)
	buscaFilme.push(buscaFilme2)
	buscaFilme.push(buscaFilme3)
	buscaFilme.push(buscaFilme4)
	buscaFilme.push(buscaFilme5)	
	buscaFilmesByTitulos()
}

function buscaFilmesByTitulos(){
	/* Busca a informação no site pelo titulo */
	for(var i = 0; i < buscaFilme.length; i++) {
		var buscaFilmesId = `https://www.omdbapi.com/?t=${buscaFilme[i]}&apikey=d93ed787`
		console.log(buscaFilmesId)		
		fetch(buscaFilmesId)
			.then(response => response.json())
			.then(data => {
				verificaAtributos(data)
				filmesIdJSON.push(data)	
				
				output +=`
                           		 <div class="col-md-2" style="padding:30px;">
                                		<div class="well text-center">
                                    			<img src="${data.Poster}">
                                    			<h5>${data.Title}</h5>
                                		</div>
                           		 </div>
                            `	
			})			
	}	
	document.getElementById("bnt-gerar-graficos-titulos").style.display = ''
	console.log()
}

// -------------------------------------------------------------
// --------- FIM DAS FUNÇÕES PARA BUSCA POR TÍTULO -------------
// -------------------------------------------------------------

// -------------------------------------------------------------
// ---------- INICIO DAS FUNÇÕES GERADORAS DOS GRÁFICOS --------
// -------------------------------------------------------------

function geraCharts() {
	/* Habilita a div canvas e chama função para gerar os gráficos*/ 
	var canvasdisplay1 = document.getElementById("div-canvas1").style.display
	var canvasdisplay2 = document.getElementById("div-canvas2").style.display
	var canvasdisplay3 = document.getElementById("div-canvas3").style.display
	if(canvasdisplay1 == "none") {
		document.getElementById("div-canvas1").style.display = ''
	}
	if(canvasdisplay2 == "none") {
		document.getElementById("div-canvas2").style.display = ''
	}
	if(canvasdisplay3 == "none") {
		document.getElementById("div-canvas3").style.display = ''
	}
	filmesIdJSON.length == 5 ? geraCharts5Filmes() : geraCharts10Filmes()	
}

function geraCharts5Filmes() {
	/* Insere os posters e graficos na tela*/
	$('#movies').html(output);
	geradorChartjs5Votos()
	geradorChartjs5Rating()
	geradorChartjs5Runtime()
	document.getElementById("btn-enviar-titulo").style.display = 'none'
	document.getElementById("btn-enviar-termo").style.display = 'none'
	document.getElementById("bnt-gerar-graficos-titulos").style.display = 'none'
	btnNovaBusca()
}

function geraCharts10Filmes() {
	/* Insere os posters e graficos na tela*/
	$('#movies').html(output);
	geradorChartjs10Votos()
	geradorChartjs10Rating()
	geradorChartjs10Runtime()
	document.getElementById("btn-enviar-titulo").style.display = 'none'
	document.getElementById("btn-enviar-termo").style.display = 'none'
	document.getElementById("bnt-gerar-graficos").style.display = 'none'
	btnNovaBusca()
}

function btnNovaBusca() {
	/*Faz o refresh na tela*/ 
	let botao =  `<input type= "button" class= "enviar" onclick="window.location.href='index.html'";"  value= "Nova Pesquisa!" /> `
    var elemento = document.getElementById("bot");
    elemento.innerHTML = botao;
}

function geradorChartjs10Votos() {
	/*Gera grafico de barras*/
	
	var ctx = document.getElementById('myChartVotos').getContext('2d');
	var myChart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: arrayTitle,
		datasets: [{
			label: 'NÚMEROS DE VOTOS',
			data: arrayImdbVotes,
			backgroundColor: [
				'rgba(136, 238, 216, 1)',
				'rgba(130, 245, 134, 1)',
				'rgba(204, 219, 105, 1)',
				'rgba(242, 211, 104, 1)',
				'rgba(235, 168, 108, 1)',
				'rgba(240, 132, 115, 1)',
				'rgba(245, 118, 119, 1)',
				'rgba(178, 116, 219, 1)',
				'rgba(116, 116, 242, 1)',
				'rgba(99, 177, 235, 1)'],
			borderColor: [
				'rgba(136, 238, 216, 1)',
				'rgba(130, 245, 134, 1)',
				'rgba(204, 219, 105, 1)',
				'rgba(242, 211, 104, 1)',
				'rgba(235, 168, 108, 1)',
				'rgba(240, 132, 115, 1)',
				'rgba(245, 118, 119, 1)',
				'rgba(178, 116, 219, 1)',
				'rgba(116, 116, 242, 1)',
				'rgba(99, 177, 235, 1)'],
			borderWidth: 3
		}]
	},
	options: {
		plugins: {
            title: {
                display: true,
                text: 'QUANTIDADE DE VOTOS',
				font: {
					weight: 'bold',
					size: 26
				}
			}
		},
		scales: {
			y: {
				beginAtZero: true
			}
		}
	}
	
	});
}

function geradorChartjs10Rating() {
	/*Gera grafico de linhas*/
	var ctx = document.getElementById('myChartRating').getContext('2d');
	var myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: arrayTitle,
		datasets: [{			
			label: 'NOTA',
			data: arrayImdbRating,
			backgroundColor: [
				'rgba(116, 116, 242, 1)'
				],
			borderColor: [
				'rgba(116, 116, 242, 1)'
			],
			borderWidth: 3,

		}]
	},
	options: {
		scales: {
			y: {
				beginAtZero: true
			}
		},
		plugins: {
            title: {
                display: true,
                text: 'AVALIAÇÃO DO FILME NO IMDB', 				
				font: {
					weight: 'bold',
					size: 26
				}
			}
		}				
	}
	
	});
}

function geradorChartjs10Runtime() {
	/*Gera grafico de Radar*/
	var ctx = document.getElementById('myChartRuntime').getContext('2d');
	var myChart = new Chart(ctx, {
	type: 'polarArea',
	data: {
		labels: arrayTitle,
		datasets: [{
			label: 'TEMPO DE DURAÇÂO',
			data: arrayRuntime,
			backgroundColor: [
				'rgba(136, 238, 216, 1)',
				'rgba(130, 245, 134, 1)',
				'rgba(204, 219, 105, 1)',
				'rgba(242, 211, 104, 1)',
				'rgba(235, 168, 108, 1)',
				'rgba(240, 132, 115, 1)',
				'rgba(245, 118, 119, 1)',
				'rgba(178, 116, 219, 1)',
				'rgba(116, 116, 242, 1)',
				'rgba(99, 177, 235, 1)'],
			borderColor: [
				'rgba(136, 238, 216, 1)',
				'rgba(130, 245, 134, 1)',
				'rgba(204, 219, 105, 1)',
				'rgba(242, 211, 104, 1)',
				'rgba(235, 168, 108, 1)',
				'rgba(240, 132, 115, 1)',
				'rgba(245, 118, 119, 1)',
				'rgba(178, 116, 219, 1)',
				'rgba(116, 116, 242, 1)',
				'rgba(99, 177, 235, 1)'],
			borderWidth: 3
		}]
	},
	options: {
		plugins: {
            title: {
                display: true,
                text: 'DURAÇÃO DO FILME EM MINUTOS', 				
				font: {
					weight: 'bold',
					size: 26
				}
			}
		},		
		scales: {			
			y: {
				beginAtZero: true
			}
		}
		
	}
	
	});
}

function geradorChartjs5Votos() {
	/*Gera grafico de barras*/
	var ctx = document.getElementById('myChartVotos').getContext('2d');
	var myChart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: arrayTitle,
		datasets: [{
			label: 'NÚMEROS DE VOTOS',
			data: arrayImdbVotes,
			backgroundColor: [
				'rgba(136, 238, 216, 1)',
				'rgba(130, 245, 134, 1)',
				'rgba(204, 219, 105, 1)',
				'rgba(242, 211, 104, 1)',
				'rgba(235, 168, 108, 1)'],
			borderColor: [
				'rgba(136, 238, 216, 1)',
				'rgba(130, 245, 134, 1)',
				'rgba(204, 219, 105, 1)',
				'rgba(242, 211, 104, 1)',
				'rgba(235, 168, 108, 1)'],
			borderWidth: 3
		}]
	},
	options: {
		plugins: {
            title: {
                display: true,
                text: 'QUANTIDADE DE VOTOS', 				
				font: {
					weight: 'bold',
					size: 26
				}
			}
		},
		scales: {
			y: {
				beginAtZero: true
			}
		}
	}
	
	});
}

function geradorChartjs5Rating() {
	/*Gera grafico de linha*/
	var ctx = document.getElementById('myChartRating').getContext('2d');
	var myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: arrayTitle,
		datasets: [{
			label: 'AVALIAÇÃO',
			data: arrayImdbRating,
			backgroundColor: [
				'rgba(116, 116, 242, 1)'
				],
			borderColor: [
				'rgba(116, 116, 242, 1)'
			],
			borderWidth: 3
		}]
	},
	options: {
		plugins: {
            title: {
                display: true,
                text: 'AVALIAÇÃO DO FILME NO IMDB', 				
				font: {
					weight: 'bold',
					size: 26
				}
			}
		},
		scales: {
			y: {
				beginAtZero: true
			}
		}
	}
	
	});
}

function geradorChartjs5Runtime() {
	/*Gera grafico de radar*/
	var ctx = document.getElementById('myChartRuntime').getContext('2d');
	var myChart = new Chart(ctx, {
	type: 'polarArea',
	data: {
		labels: [
			`${arrayTitle[0]}`,
			`${arrayTitle[1]}`,
			`${arrayTitle[2]}`,
			`${arrayTitle[3]}`, 
			`${arrayTitle[4]}`],
		datasets: [{
			label: 'TEMPO DE DURAÇÂO',
			data: [
				`${arrayRuntime[0]}`,
				`${arrayRuntime[1]}`,
				`${arrayRuntime[2]}`,
				`${arrayRuntime[3]}`,
				`${arrayRuntime[4]}`],
			backgroundColor: [
				'rgba(136, 238, 216, 1)',
				'rgba(130, 245, 134, 1)',
				'rgba(204, 219, 105, 1)',
				'rgba(242, 211, 104, 1)',
				'rgba(235, 168, 108, 1)'],
			borderColor: [
				'rgba(136, 238, 216, 1)',
				'rgba(130, 245, 134, 1)',
				'rgba(204, 219, 105, 1)',
				'rgba(242, 211, 104, 1)',
				'rgba(235, 168, 108, 1)'],
			borderWidth: 3
		}]
	},
	options: {
		plugins: {
            title: {
                display: true,
                text: 'AVALIAÇÃO DO FILME NO IMDB', 				
				font: {
					weight: 'bold',
					size: 26
				}
			}
		},
		scales: {			
			y: {
				beginAtZero: true
			}
		}
		
	}
	
	});
}

// -------------------------------------------------------------
// --------- FIM DAS FUNÇÕES GERADORAS DOS GRÁFICOS ------------
// -------------------------------------------------------------
