function validarContas(){
    let contasGravadas = JSON.parse(window.localStorage.getItem("contas"));

    if(contasGravadas == null){
        Swal.fire({
            title: 'Opa!',
            text: "Conta deve ser cadastrada antes.",
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value) {
                window.location.href = "contas.html";
            }
        })
    }


    let selectCont = "";
    select = document.getElementById("contaLancamento");

    contasGravadas.forEach(conta => {
        selectCont += "<option value=" + conta.id + ">" + conta.nome + "</option>";
    });

    select.innerHTML = selectCont;
}

function cadastrarLancamento(){
    cadLancamento();

    listarLancamento();

    carregarValores();
}

function cadLancamento(){
    contasGravadas = JSON.parse(window.localStorage.getItem("contas"));

    const valor = document.getElementById("valorLancamento").value;
    const contaId = document.getElementById("contaLancamento").value;
    contaDados = localizarConta(contaId);

    var data = new Date();
    
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();

    const str_data = dia + '/' + (mes+1) + '/' + ano;

    var hora = data.getHours();  
    var min = data.getMinutes();
    var seg = data.getSeconds();

    var str_hora = hora + ':' + min + ':' + seg;

    if(valor == ""){
        Swal.fire({
            icon: 'error',
            title: 'Opa!',
            text: 'Favor preencher todos os dados',
        })
    }else{
        const lancamento = {id: Date.now(), conta:contaDados, valor, data:str_data, horario:str_hora};

        let lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));

        if(lancamentosGravados == null){
            window.localStorage.setItem("lancamentos",JSON.stringify([]));
            lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));
            lancamentosGravados.push(lancamento);
            window.localStorage.setItem("lancamentos",JSON.stringify(lancamentosGravados));
            Swal.fire({
                icon: 'success',
                title: 'Lançamento cadastrado com sucesso!',
                showConfirmButton: false,
                timer: 1250
            });
            form1.reset();
            
        }else{

            lancamentosGravados.push(lancamento);
            window.localStorage.setItem("lancamentos",JSON.stringify(lancamentosGravados));
            Swal.fire({
                icon: 'success',
                title: 'Lançamento cadastrado com sucesso!',
                showConfirmButton: false,
                timer: 1250
            });
            form1.reset();
        }
    }
}

function localizarConta(id){
    contasGravadas = JSON.parse(window.localStorage.getItem("contas"));
    let contaIndex = contasGravadas.findIndex(conta => conta.id == id);

    return contasGravadas[contaIndex];
}

function listarLancamento(){
    lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));

    let linha = "";
    lancamentosGravados.forEach(lancamento => {
        row = document.getElementById("tbody");
        linha += "<tr>" +
        "<td id='tdId' style='display: none;'>" + lancamento.id +"</td>"+
        "<td id='thConta'>" + lancamento.conta['nome'] + "</td>"+
        "<td id='thValor'> R$ " + lancamento.valor + "</td>"+
        "<td id='thData'>" + lancamento.data + "</td>"+
        "<td id='thAcoes'><button class='btn btn-outline-success' onclick='exibirLancamento("+lancamento.id+")'><i class='fa fa-edit'></i></button>"+
        "<button class='btn btn-outline-danger' onclick='deletarLancamento("+lancamento.id+")'><i class='fa fa-trash'></i></button></td>"+
        "<tr>";

        row.innerHTML = linha;
    })
}

function exibirLancamento(id){

    let botaoAlterar = "";

    lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));

    let lancamentoIndex = lancamentosGravados.findIndex(lancamento => lancamento.id == id);
    if(lancamentoIndex >= 0){
        document.getElementById("contaLancamento").value = lancamentosGravados[lancamentoIndex].conta["id"];
        document.getElementById("valorLancamento").value = lancamentosGravados[lancamentoIndex].valor;
    }

    botao = document.getElementById("botoes");
    botaoAlterar = "<button class='btn btn-info' type='button' onclick='alterarLancamento("+id+")'>Alterar</button>";

    botao.innerHTML = botaoAlterar;
}

function alterarLancamento(id){

    lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));

    let lancamentoIndex = lancamentosGravados.findIndex(lancamento => lancamento.id == id);
    if(lancamentoIndex >= 0){
        contasGravadas = JSON.parse(window.localStorage.getItem("contas"));

        const valor = parseFloat(document.getElementById("valorLancamento").value).toFixed(2);
        const contaId = document.getElementById("contaLancamento").value;
        contaDados = localizarConta(contaId);

        const str_data = lancamentosGravados[lancamentoIndex].data;
        const str_hora = lancamentosGravados[lancamentoIndex].horario;

        lancamentosGravados[lancamentoIndex] = {id, conta:contaDados, valor, data:str_data, horario:str_hora};

        window.localStorage.setItem("lancamentos",JSON.stringify(lancamentosGravados));

        form1.reset();

        listarLancamento();
        carregarValores();

        botao = document.getElementById("botoes");
        botaoCadastrar = "<button class='btn btn-success' type='button' onclick='cadastrarLancamento()'>Cadastrar</button>";

        botao.innerHTML = botaoCadastrar;

        Swal.fire({
            icon: 'success',
            title: 'Lançamento alterado com sucesso!',
            showConfirmButton: false,
            timer: 1250
        })
    }
}

validarContas();
listarLancamento();