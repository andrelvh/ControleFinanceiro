const usuarios = [];

function cadastrarUsuario(){

    cadUsuario();

    listarUsuario();
}

//cadastro próprio
function cadUsuario(){
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const endereco = document.getElementById("endereco").value;
    const cidade = document.getElementById("cidade").value;
    const telefone = document.getElementById("telefone").value;

    if(nome == "" || email == "" || senha == "" || endereco == "" || cidade == "" || telefone == ""){
        Swal.fire({
            icon: 'error',
            title: 'Opa!',
            text: 'Favor preencher todos os dados',
        })
    }else{
        const usuario = {id: Date.now(), nome, email, senha, endereco, cidade, telefone};

        let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));

        if(usuariosGravados == null){
            window.localStorage.setItem("usuarios",JSON.stringify([]));
            usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));
            usuariosGravados.push(usuario);
            window.localStorage.setItem("usuarios",JSON.stringify(usuariosGravados));
            Swal.fire({
                icon: 'success',
                title: 'Usuário cadastrado com sucesso!',
                showConfirmButton: false,
                timer: 1250
            });
            form1.reset();
            
        }else{

            let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.email == email);
            if(usuarioIndex != -1){
                Swal.fire({
                    icon: 'error',
                    title: 'Opa!',
                    text: 'E-mail já cadastrado em nosso sistema.',
                });
            }else{
                usuariosGravados.push(usuario);
                window.localStorage.setItem("usuarios",JSON.stringify(usuariosGravados));
                Swal.fire({
                    icon: 'success',
                    title: 'Usuário cadastrado com sucesso!',
                    showConfirmButton: false,
                    timer: 1250
                });
                form1.reset();
            }
        }
    }
}

function login(){
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));

    let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.email == email);
    if(usuarioIndex == -1){
        Swal.fire({
            icon: 'error',
            title: 'Opa!',
            text: 'E-mail não cadastrado em nosso sistema.',
        });
    }else{
        if(usuariosGravados[usuarioIndex].senha != senha){
            Swal.fire({
                icon: 'error',
                title: 'Opa!',
                text: 'Senha não cadastrada em nosso sistema.',
            });
            document.getElementById("senha").value = "";
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Usuário logado com sucesso!',
                showConfirmButton: false,
                timer: 1250
            })
            setTimeout(function() {
                window.location.href = "index_adm.html";
            }, 1300);
        }
    }
}

function listarUsuario(){

    usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));

    let linha = "";
    usuariosGravados.forEach(usuario => {
        row = document.getElementById("tbody");
        linha += "<tr>" +
        "<td id='tdId'>" + usuario.id +"</td>"+
        "<td id='thNome'>" + usuario.nome + "</td>"+
        "<td id='thEmail'>" + usuario.email + "</td>"+
        "<td id='thEndereco'>" + usuario.endereco + "</td>"+
        "<td id='thCidade'>" + usuario.cidade + "</td>"+
        "<td id='thTelefone'>" + usuario.telefone + "</td>"+
        "<td id='thAcoes'><button class='btn btn-outline-success' onclick='exibirUsuario("+usuario.id+")'><i class='fa fa-edit'></i></button>"+
        "<button class='btn btn-outline-danger' onclick='deletarUsuario("+usuario.id+")'><i class='fa fa-trash'></i></button></td>"
        + "<tr>";

        row.innerHTML = linha;
    })
}

function deletarUsuario(id){

    usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));

    Swal.fire({
        title: 'Confirma a exclusão do usuário?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
            let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.id == id);
            if(usuarioIndex >= 0){
              usuariosGravados.splice(usuarioIndex,1);
              window.localStorage.setItem("usuarios",JSON.stringify(usuariosGravados));
              if(usuariosGravados.length > 0){
                listarUsuario();
              }else{
                row = document.getElementById("tbody");
                row.innerHTML = "";
              }
            } 
          Swal.fire(
            'Usuário deletado!',
            '',
            'success'
          )
        }
    });
}

function exibirUsuario(id){

    let botaoAlterar = "";

    usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));

    let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.id == id);
    if(usuarioIndex >= 0){
        document.getElementById("nome").value = usuariosGravados[usuarioIndex].nome;
        document.getElementById("email").value = usuariosGravados[usuarioIndex].email;
        document.getElementById("senha").value = usuariosGravados[usuarioIndex].senha;
        document.getElementById("endereco").value = usuariosGravados[usuarioIndex].endereco;
        document.getElementById("cidade").value = usuariosGravados[usuarioIndex].cidade;
        document.getElementById("telefone").value = usuariosGravados[usuarioIndex].telefone;
    }

    botao = document.getElementById("botoes");
    botaoAlterar = "<button class='btn btn-info' type='button' onclick='alterarUsuario("+id+")'>Alterar</button>";

    botao.innerHTML = botaoAlterar;
}

function alterarUsuario(id){

    usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));

    let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.id == id);
    if(usuarioIndex >= 0){
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const endereco = document.getElementById("endereco").value;
        const cidade = document.getElementById("cidade").value;
        const telefone = document.getElementById("telefone").value;

        usuariosGravados[usuarioIndex] = {id, nome, email, senha, endereco, cidade, telefone};

        window.localStorage.setItem("usuarios",JSON.stringify(usuariosGravados));

        form1.reset();

        listarUsuario();

        botao = document.getElementById("botoes");
        botaoCadastrar = "<button class='btn btn-success' type='button' onclick='cadastrarUsuario()'>Cadastrar</button>";

        botao.innerHTML = botaoCadastrar;

        Swal.fire({
            icon: 'success',
            title: 'Usuário alterado com sucesso!',
            showConfirmButton: false,
            timer: 1250
        })
    }
}

listarUsuario();