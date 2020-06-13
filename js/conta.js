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
                window.location.href = "index_adm.html";
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
    const valor = document.getElementById("valorConta").value;
    const categoriaId = document.getElementById("categoriaConta").value;
    const status = document.getElementById("statusConta").value;

    if(nome == "" || tipo == "" || valor == "" || categoriaId == "" || status == ""){
        Swal.fire({
            icon: 'error',
            title: 'Opa!',
            text: 'Favor preencher todos os dados',
        })
    }else{
        const conta = {id: Date.now(), nome, tipo, valor, categoriaId, status};

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

function listarConta(){
    contasGravadas = JSON.parse(window.localStorage.getItem("contas"));

    let linha = "";
    contasGravadas.forEach(conta => {
        row = document.getElementById("tbody");
        linha += "<tr>" +
        "<td id='tdId'>" + conta.id +"</td>"+
        "<td id='thNome'>" + conta.nome + "</td>"+
        "<td id='thTipo'>" + conta.tipo + "</td>"+
        "<td id='thValor'>" + conta.valor + "</td>"+
        "<td id='thCategoria'>" + conta.categoriaId + "</td>"+
        "<td id='thStatus'>" + conta.status + "</td>"+
        "<tr>";

        row.innerHTML = linha;
    })
}

validarCategorias();
listarConta();