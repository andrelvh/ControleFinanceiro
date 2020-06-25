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
}

validarContas();