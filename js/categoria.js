const categorias = [];

function cadastrarCategoria(){
    cadCategoria();

    listarCategoria();
}

function cadCategoria(){
    const nome = document.getElementById("nomeCat").value;

    if(nome == ""){
        Swal.fire({
            icon: 'error',
            title: 'Opa!',
            text: 'Favor preencher o nome da categoria',
        })
    }else{
        const categoria = {id: Date.now(), nome};

        let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));

        if(categoriasGravadas == null){
            window.localStorage.setItem("categorias",JSON.stringify([]));
            categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
            categoriasGravadas.push(categoria);
            window.localStorage.setItem("categorias",JSON.stringify(categoriasGravadas));
            Swal.fire({
                icon: 'success',
                title: 'Categoria cadastrada com sucesso!',
                showConfirmButton: false,
                timer: 1250
            });
            form1.reset();

        }else{
            let categoriaIndex = categoriasGravadas.findIndex(categoria => categoria.nome == nome);
            if(categoriaIndex != -1){
                Swal.fire({
                    icon: 'error',
                    title: 'Opa!',
                    text: 'Categoria já cadastrada em nosso sistema.',
                });
                form1.reset();
            }else{
                categoriasGravadas.push(categoria);
                window.localStorage.setItem("categorias",JSON.stringify(categoriasGravadas));
                Swal.fire({
                    icon: 'success',
                    title: 'Categoria cadastrada com sucesso!',
                    showConfirmButton: false,
                    timer: 1250
                });
                form1.reset();
            }
        }
    }
}

function listarCategoria(){
    categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));

    let linha = "";
    categoriasGravadas.forEach(categoria => {
        row = document.getElementById("tbody");
        linha += "<tr>" +
        "<td id='tdId'>" + categoria.id +"</td>"+
        "<td id='thNome'>" + categoria.nome + "</td>"+
        "<td id='thAcoes'><button class='btn btn-outline-success' onclick='exibirCategoria("+categoria.id+")'><i class='fa fa-edit'></i></button>"+
        "<tr>";

        row.innerHTML = linha;
    })
}

function exibirCategoria(id){

    let botaoAlterar = "";

    categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));

    let categoriaIndex = categoriasGravadas.findIndex(categoria => categoria.id == id);
    if(categoriaIndex >= 0){
        document.getElementById("nomeCat").value = categoriasGravadas[categoriaIndex].nome;
    }

    botao = document.getElementById("botoes");
    botaoAlterar = "<button class='btn btn-info' type='button' onclick='alterarCategoria("+id+")'>Alterar</button>";

    botao.innerHTML = botaoAlterar;
}

function alterarCategoria(id){

    categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));

    let categoriaIndex = categoriasGravadas.findIndex(categoria => categoria.id == id);
    if(categoriaIndex >= 0){
        const nome = document.getElementById("nomeCat").value;

        categoriasGravadas[categoriaIndex] = {id, nome};

        window.localStorage.setItem("categorias",JSON.stringify(categoriasGravadas));

        form1.reset();

        listarCategoria();

        botao = document.getElementById("botoes");
        botaoCadastrar = "<button class='btn btn-success' type='button' onclick='cadastrarCategoria()'>Cadastrar</button>";

        botao.innerHTML = botaoCadastrar;

        Swal.fire({
            icon: 'success',
            title: 'Categoria alterada com sucesso!',
            showConfirmButton: false,
            timer: 1250
        })
    }
}

listarCategoria();