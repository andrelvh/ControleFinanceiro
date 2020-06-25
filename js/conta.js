const contas = [];

function validarCategorias(){
    let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));

    if(categoriasGravadas == null){
        Swal.fire({
            title: 'Opa!',
            text: "Categoria deve ser cadastrada antes.",
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value) {
                window.location.href = "categorias.html";
            }
        })
    }


    let selectCat = "";
    select = document.getElementById("categoriaConta");

    categoriasGravadas.forEach(categoria => {
        selectCat += "<option value=" + categoria.id + ">" + categoria.nome + "</option>";
    });

    select.innerHTML = selectCat;
}


function cadastrarConta(){
    cadConta();

    listarConta();
}

function cadConta(){
    categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));

    const nome = document.getElementById("nomeConta").value;
    const tipo = document.getElementById("tipoConta").value;
    const categoriaId = document.getElementById("categoriaConta").value;

    categoriaDados = localizarCategoria(categoriaId);

    if(nome == "" || tipo == "" || categoriaId == ""){
        Swal.fire({
            icon: 'error',
            title: 'Opa!',
            text: 'Favor preencher todos os dados',
        })
    }else{
        const conta = {id: Date.now(), nome, tipo, categoria:categoriaDados};

        let contasGravadas = JSON.parse(window.localStorage.getItem("contas"));

        if(contasGravadas == null){
            window.localStorage.setItem("contas",JSON.stringify([]));
            contasGravadas = JSON.parse(window.localStorage.getItem("contas"));
            contasGravadas.push(conta);
            window.localStorage.setItem("contas",JSON.stringify(contasGravadas));
            Swal.fire({
                icon: 'success',
                title: 'Conta cadastrada com sucesso!',
                showConfirmButton: false,
                timer: 1250
            });
            form1.reset();
            
        }else{

            let contaIndex = contasGravadas.findIndex(conta => conta.nome == nome);
            if(contaIndex != -1){
                Swal.fire({
                    icon: 'error',
                    title: 'Opa!',
                    text: 'Conta de mesmo nome já cadastrada em nosso sistema.',
                });
            }else{
                contasGravadas.push(conta);
                window.localStorage.setItem("contas",JSON.stringify(contasGravadas));
                Swal.fire({
                    icon: 'success',
                    title: 'Conta cadastrada com sucesso!',
                    showConfirmButton: false,
                    timer: 1250
                });
                form1.reset();
            }
        }
    }
}

function localizarCategoria(id){
    categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
    let categoriaIndex = categoriasGravadas.findIndex(categoria => categoria.id == id);

    return categoriasGravadas[categoriaIndex];
}

function listarConta(){
    contasGravadas = JSON.parse(window.localStorage.getItem("contas"));

    let linha = "";
    contasGravadas.forEach(conta => {
        row = document.getElementById("tbody");
        linha += "<tr>" +
        "<td id='tdId' style='display: none;'>" + conta.id +"</td>"+
        "<td id='thNome'>" + conta.nome + "</td>"+
        "<td id='thTipo'>" + conta.tipo + "</td>"+
        "<td id='thValor' style='display: none;'>" + conta.valor + "</td>"+
        "<td id='thCategoria'>" + conta.categoria['nome'] + "</td>"+
        "<td id='thAcoes'><button class='btn btn-outline-success' onclick='exibirConta("+conta.id+")'><i class='fa fa-edit'></i></button>"+
        "<button class='btn btn-outline-danger' onclick='deletarConta("+conta.id+")'><i class='fa fa-trash'></i></button></td>"+
        "<tr>";

        row.innerHTML = linha;
    })
}

function exibirConta(id){

    let botaoAlterar = "";

    contasGravadas = JSON.parse(window.localStorage.getItem("contas"));

    let contaIndex = contasGravadas.findIndex(conta => conta.id == id);
    if(contaIndex >= 0){
        document.getElementById("nomeConta").value = contasGravadas[contaIndex].nome;
        document.getElementById("tipoConta").value = contasGravadas[contaIndex].tipo;
        document.getElementById("categoriaConta").value = contasGravadas[contaIndex].categoria["id"];
    }

    botao = document.getElementById("botoes");
    botaoAlterar = "<button class='btn btn-info' type='button' onclick='alterarConta("+id+")'>Alterar</button>";

    botao.innerHTML = botaoAlterar;
}

function alterarConta(id){

    contasGravadas = JSON.parse(window.localStorage.getItem("contas"));

    let contaIndex = contasGravadas.findIndex(conta => conta.id == id);
    if(contaIndex >= 0){
        const nome = document.getElementById("nomeConta").value;
        const tipo = document.getElementById("tipoConta").value;
        const categoriaId = document.getElementById("categoriaConta").value;

        categoriaDados = localizarCategoria(categoriaId);

        contasGravadas[contaIndex] = {id, nome, tipo, categoria:categoriaDados};

        window.localStorage.setItem("contas",JSON.stringify(contasGravadas));

        form1.reset();

        listarConta();

        botao = document.getElementById("botoes");
        botaoCadastrar = "<button class='btn btn-success' type='button' onclick='cadastrarConta()'>Cadastrar</button>";

        botao.innerHTML = botaoCadastrar;

        Swal.fire({
            icon: 'success',
            title: 'Conta alterada com sucesso!',
            showConfirmButton: false,
            timer: 1250
        })
    }
}

function deletarConta(id){

    contasGravadas = JSON.parse(window.localStorage.getItem("contas"));

    Swal.fire({
        title: 'Confirma a exclusão da conta?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
            let contaIndex = contasGravadas.findIndex(conta => conta.id == id);
            if(contaIndex >= 0){
                contasGravadas.splice(contaIndex,1);
              window.localStorage.setItem("contas",JSON.stringify(contasGravadas));
              if(contasGravadas.length > 0){
                listarConta();
              }else{
                row = document.getElementById("tbody");
                row.innerHTML = "";
              }
            } 
          Swal.fire(
            'Conta deletada!',
            '',
            'success'
          )
        }
    });
}

validarCategorias();
listarConta();