document.getElementById('salvarFornecedor').addEventListener('click', function() {

    if (!checkObrigatorio() || !verificarCamposRequeridos())
    {
        return;
    }

    // Mostra o modal de loading
    $('#loadingModal').modal('show'); 

    // Simula um delay pra o Modal de Loading
    setTimeout(function() {
        $('#loadingModal').modal('hide'); 
        alert("Dados enviados com sucesso!");
    }, 2000);

    // Cria e Baixa o JSON
    criarEbaixarJSON(criarJson());

});

// Cria o JSON e baixa
function criarEbaixarJSON(data) 
{
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "fornecedor.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Faz o Check se existe pelo menos 1 anexo e 1 produto
function checkObrigatorio()
{
    let anexoCheck = anexos.length;
    let produtosCheck = produtos.length;

    if (anexoCheck <= 0 || produtosCheck <= 0)
    {
        if (produtosCheck <= 0)
        {
            alert("Obrigatório pelo menos 1 produto!");
            return;
        }

        alert("Obrigatório pelo menos 1 anexo!");
        return;
    }
    else
    {
        return true;
    }

}

// Verifica se os campos obrigatórios foram preenchidos
function verificarCamposRequeridos() 
{
    // Coleta todos os elementos que têm o atributo 'required'
    var camposRequeridos = document.querySelectorAll('[required]');
    
    // Verifica cada campo para ver se foi preenchido com alguma coisa
    var todosPreenchidos = Array.from(camposRequeridos).every(campo => {

        if (campo.value.trim() !== "") 
        {
            return true;
        } 
        else 
        {
            alert("Preencha todos os campos obrigatórios!");
            return false;
        }
    });

    return todosPreenchidos;
}


// Pega os dados dos campos, produtos e anexos e cria um JSON formatado
function criarJson() 
{
    // Coleta de dados dos campos de input
    var razaoSocial = document.getElementById('razaoSocial').value;
    var nomeFantasia = document.getElementById('nomeFantasia').value;
    var cnpj = document.getElementById('cnpj').value;
    var inscricaoEstadual =  document.getElementById('inscricaoEstadual').value;
    var inscricaoMunicipal = document.getElementById('inscricaoMunicipal').value;
    var nomeContato = document.getElementById('nomePessoaContato').value;
    var telefoneContato = document.getElementById('telefone').value;
    var emailContato = document.getElementById('email').value;



    // Estruturando o JSON
    jsonDados = {
        razaoSocial: razaoSocial,
        nomeFantasia: nomeFantasia,
        cnpj: cnpj,
        inscricaoEstadual: inscricaoEstadual,
        inscricaoMunicipal: inscricaoMunicipal,
        nomeContato: nomeContato,
        telefoneContato: telefoneContato,
        emailContato: emailContato,


        produtos: produtos.map((produto, indice) => ({
            indice: indice + 1,
            descricaoProduto: produto.descricao,
            unidadeMedida: produto.unidadeMedida,
            qtdeEstoque: produto.qtdeEstoque,
            valorUnitario: produto.valorUnitario,
            valorTotal: produto.valorTotal
        })),
        anexos: anexos.map((anexo, indice) => ({
            indice: indice + 1,
            nomeArquivo: anexo.nome,
            blobArquivo: anexo.blobUrl
        }))
    };

    // Para exibir bonitinho no console
    console.log(JSON.stringify(jsonDados, null, 2));

    return jsonDados;
}
