const usuarios = [];

function cadastrarUsuario(){

    cadUsuario();

    listarUsuario();
}

//cadastro próprio
function cadUsuario(){
    const nome = document.getElementById("nomeCad").value;
    const telefone = document.getElementById("telefoneCad").value;
    const email = document.getElementById("emailCad").value;
    const senha = document.getElementById("senhaCad").value;
    const cep = document.getElementById("cepCad").value;
    const endereco = document.getElementById("enderecoCad").value;
    const numEndereco = document.getElementById("numEnderecoCad").value;
    const cidade = document.getElementById("cidadeCad").value;
    const estado = document.getElementById("estadoCad").value;
    const status = "Ativo";

    if(nome == "" || telefone == "" || email == "" || senha == "" || cep == "" || endereco == "" || numEndereco == "" || cidade == "" || estado == ""){
        Swal.fire({
            icon: 'error',
            title: 'Opa!',
            text: 'Favor preencher todos os dados',
        })
    }else{
        const usuario = {id: Date.now(), nome, telefone, email, senha, cep, endereco, numEndereco, cidade, estado, status};

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
    const email = document.getElementById("emailLog").value;
    const senha = document.getElementById("senhaLog").value;

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
            document.getElementById("senhaLog").value = "";
        }else{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
              
            Toast.fire({
                icon: 'success',
                title: 'Usuário logado com sucesso!'
            })

            window.localStorage.setItem("idLogado",usuariosGravados[usuarioIndex].id);
            setTimeout(function() {
                window.location.href = "index_adm.html";
            }, 1300);
        }
    }
}

function exibirUsuario(){

    usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));
    const idExcluir = JSON.parse(window.localStorage.getItem("idLogado"));

    usuariosGravados.forEach(usuario => {
        if(usuario.id == idExcluir){
            document.getElementById("nomePerfil").value = usuario.nome;
            document.getElementById("telefonePerfil").value = usuario.telefone;
            document.getElementById("emailPerfil").value = usuario.email;
            document.getElementById("cepPerfil").value = usuario.cep;
            document.getElementById("enderecoPerfil").value = usuario.endereco;
            document.getElementById("numEnderecoPerfil").value = usuario.numEndereco;
            document.getElementById("cidadePerfil").value = usuario.cidade;
            document.getElementById("estadoPerfil").value = usuario.estado;
        }
    })
}

function alterarUsuario(){

    usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));

    const idExcluir = JSON.parse(window.localStorage.getItem("idLogado"));

    let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.id == idExcluir);
    if(usuarioIndex >= 0){
        const nome = document.getElementById("nomePerfil").value;
        const telefone = document.getElementById("telefonePerfil").value;
        const email = document.getElementById("emailPerfil").value;
        const senha = document.getElementById("senhaPerfil").value;
        const cep = document.getElementById("cepPerfil").value;
        const endereco = document.getElementById("enderecoPerfil").value;
        const numEndereco = document.getElementById("numEnderecoPerfil").value;
        const cidade = document.getElementById("cidadePerfil").value;
        const estado = document.getElementById("estadoPerfil").value;

        usuariosGravados[usuarioIndex] = {id: idExcluir, nome, telefone, email, senha, cep, endereco, numEndereco, cidade, estado};

        window.localStorage.setItem("usuarios",JSON.stringify(usuariosGravados));

        form1.reset();

        exibirUsuario();

        Swal.fire({
            icon: 'success',
            title: 'Usuário alterado com sucesso!',
            showConfirmButton: false,
            timer: 1250
        })
    }
}

function sair(){
    window.localStorage.setItem("idLogado","");
}

exibirUsuario();