// Carrega o arquivo de anexo
FLUIGC.utilities.parseInputFile("#fileInput");

// Variáveis globais
let anexos = [];
let anexoId = 0;

// Adiciona o evento de mudança no input de arquivo
document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    // Quando o arquivo é lido, cria um blobUrl e armazena no sessionStorage
    reader.onload = function(event) {
        var blob = new Blob([event.target.result], {type: file.type});
        var blobUrl = URL.createObjectURL(blob);

        // Incrementa o id do anexo
        anexoId++;
        
        // Armazenar o blobUrl no sessionStorage
        sessionStorage.setItem(file.name, blobUrl);

        // Adiciona o anexo na lista de anexos
        anexos.push({
            id: anexoId,
            nome: file.name,
            blobUrl: blobUrl
        });

        // Adiciona o anexo na lista + seus botões
        adicionarAnexoVisualmente(anexoId, file.name, blobUrl);
    };

    // Lê o arquivo como um array buffer
    reader.readAsArrayBuffer(file);
});

// Adiciona o anexo na lista visualmente
function adicionarAnexoVisualmente(id, nome, blobUrl) 
{
    var anexoHTML = `
        <div class="row" data-id="${id}">
            <div class="col-md-1 form-group">
                <button type="button" class="btn btn-danger" onclick="removerAnexo('${id}')">
                    <img src="../Icons/fluigicon-trash.png">
                </button>
            </div>
            <div class="col-md-1 form-group">
                <a href="${blobUrl}" download="${nome}">
                <button type="button" class="btn btn-info">
                    <img src="../Icons/fluigicon-eye-open.png" alt="Visualizar Anexo" title="Visualizar Anexo">
                </button>
                </a>
            </div>
            <div class="col-md-10 form-group">
                <p>${nome}</p>
            </div>
        </div>
    `;
    
    var anexosDiv = document.getElementById('itensDiv');
    anexosDiv.insertAdjacentHTML('beforeend', anexoHTML);
}

// Remove o anexo da lista e do sessionStorage | Atualiza o array de anexos
function removerAnexo(id) 
{
    if (anexos.length <= 1) 
    {
        alert('Obrigatório pelo menos 1 anexo!');
        return;
    }

    // Encontra o índice do anexo com o ID
    const index = anexos.findIndex(anexo => anexo.id == id);

    // Se um anexo válido for encontrado
    if (index !== -1) 
    {
        // Remove o anexo do array
        anexos.splice(index, 1);

        // Remove visualmente o anexo
        const anexoToRemove = document.querySelector(`.row[data-id="${id}"]`);
        if (anexoToRemove) 
        {
            anexoToRemove.parentElement.removeChild(anexoToRemove);
        }
    } 
    else 
    {
        console.log("Anexo não encontrado para remoção.");
    }
}
