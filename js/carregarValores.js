function carregarValores(){
    lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));

    var totalEntrada = 0;
    var totalSaida = 0;
    var saldo = 0;

    lancamentosGravados.forEach(lancamento => {
        if(lancamento.conta['tipo'] == "Entrada"){
            totalEntrada += parseFloat(lancamento.valor);
        }else if(lancamento.conta['tipo'] == "Saida"){
            totalSaida += parseFloat(lancamento.valor);
        }

        saldo = totalEntrada - totalSaida;
    })
    
    document.getElementById("totalEntrada").innerHTML = "R$ " + parseFloat(totalEntrada).toFixed(2);
    document.getElementById("totalSaida").innerHTML = "R$ " + parseFloat(totalSaida).toFixed(2);
    document.getElementById("saldo").innerHTML = "R$ " + parseFloat(saldo).toFixed(2);
}

carregarValores();