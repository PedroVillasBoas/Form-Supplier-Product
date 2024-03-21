// Criação do array de produtos
var produtos = [];

// Adiciona o produto inicial ao array | Configura os eventos para o produto inicial
function addOutroProduto() 
{
  // index == quantidade de produtos no array
  var index = produtos.length;

  // Cria o HTML para o novo produto
  var html = `
    <div class="panel-body" data-index="${index}">
      <div class="row">
        <div class="col-md-1 form-group">
          <button type="button" class="btn btn-danger" onclick="removerProduto(${index})">
            <img src="../Icons/fluigicon-trash.png">
          </button>
        </div>
        <div class="col-md-11 form-group">
          <div class="panel panel-default">
            <div class="panel-heading">
              <p class="panel-title">Produto ${index + 1}</p>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-md-1 form-group">
                  <i class="illustration illustration-package-diagram illustration-lg" aria-hidden="true"></i>
                </div>
                <div class="col-md-10 col-md-offset-1 form-group">
                  <label for="descrição">Descrição</label>
                  <input type="text" class="form-control" name="descrição${index}" required>
                </div>
                <div class="col-md-2 col-md-offset-1 form-group">
                  <div>
                    <label for="UNDMedida">UND. Medida</label>
                  </div>
                  <div class="btn-group">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                      Selecione Medida <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                      <li><a href="#">Unidade</a></li>
                      <li><a href="#">Caixa</a></li>
                      <li><a href="#">Fardo</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-2 form-group">
                  <label for="QDTDEEstoque">QDTD. em Estoque</label>
                  <input type="text" class="form-control" name="QDTDEEstoque${index}" required>
                </div>
                <div class="col-md-3 form-group">
                  <label for="valorUnitario">Valor Unitário</label>
                  <input type="text" class="form-control" name="valorUnitario${index}" required>
                </div>
                <div class="col-md-3 form-group">
                  <label for="valorTotal">Valor Total</label>
                  <input type="text" class="form-control" name="valorTotal${index}" placeholder="Valor Total" disabled>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Cria um novo produto e adiciona no array
  var novoProduto = {
    descricao: "",
    unidadeMedida: "",
    quantidadeEstoque: 0,
    valorUnitario: 0,
    valorTotal: 0,
  };
  produtos.push(novoProduto);

  // Adiciona o Panel do produto
  var produtoPanel = document.getElementById("produtoPanelBody");
  produtoPanel.insertAdjacentHTML("beforeend", html);

  // Configura os eventos para o novo produto
  atualizarProdutoEvents(index);
}

// Atualiza os eventos para o produto
function atualizarProdutoEvents(index) 
{
  // Adiciona os eventos para o novo produto
  var QDTDEEstoque = document.getElementsByName("QDTDEEstoque" + index)[0];
  var valorUnitario = document.getElementsByName("valorUnitario" + index)[0];
  var valorTotal = document.getElementsByName("valorTotal" + index)[0];

  // Atualiza o valor total do produto quando a quantidade em estoque é alterada
  QDTDEEstoque.addEventListener("change", function () {
    calcularValorTotal(index);
  });

  // Atualiza o valor total do produto quando o valor unitario é alterado
  valorUnitario.addEventListener("change", function () {
    calcularValorTotal(index);
  });

  // Atualiza o valor total do produto quando o valor unitário ou quantidade em estoque são alterados
  valorTotal.addEventListener("change", function () {
    calcularValorTotal(index);
  });
}

// Calcula o valor total do produto
function calcularValorTotal(index) 
{
  // Atualiza o valor total do produto
  var quantidade = parseFloat(document.getElementsByName("QDTDEEstoque" + index)[0].value) || 0;
  var valorUnitario = parseFloat(document.getElementsByName("valorUnitario" + index)[0].value) || 0;

  produtos[index].quantidadeEstoque = quantidade;
  produtos[index].valorUnitario = valorUnitario;
  produtos[index].valorTotal = quantidade * valorUnitario;

  // Atualiza o valor total no campo 'valorTotal' do produto
  document.getElementsByName("valorTotal" + index)[0].value = produtos[index].valorTotal.toFixed(2);
}

// Remove o produto do array e do panel
function removerProduto(index) 
{
  // Verifica se há mais de um produto antes de remover
  if (produtos.length <= 1) 
  {
    alert("Obrigatório a inclusão de pelo menos 1 produto!");
    return;
  }

  // Remove o panel de um produto específico
  var produtoPanel = document.getElementById("produtoPanelBody");
  var panelToRemove = produtoPanel.querySelector(`div[data-index='${index}']`);

  if (panelToRemove) produtoPanel.removeChild(panelToRemove);

  // Remove o produto do array
  produtos.splice(index, 1);

  // Atualiza os índices dos produtos restantes
  atualizarIndices();
}

// Atualiza os índices dos produtos no array e no panel
function atualizarIndices() 
{
  var todosPaineisProdutos = document.getElementById('produtoPanelBody').children;
  for (let i = 0; i < todosPaineisProdutos.length; i++) 
  {
      // Atualiza o data-index 
      todosPaineisProdutos[i].setAttribute('data-index', i);

      // Atualizar os títulos dos panels para refletir os novos índices
      let tituloPanel = todosPaineisProdutos[i].querySelector('.panel-title');
      if (tituloPanel) 
      {
          tituloPanel.textContent = `Produto ${i + 1}`;
      }

      // Atualizar os `name` de cada input para refletir os novos índices
      let inputs = todosPaineisProdutos[i].querySelectorAll('input');
      inputs.forEach(input => {
          // Remove o número atual do nome
          let baseName = input.name.replace(/[0-9]/g, ''); 
          // Adiciona o novo índice ao nome
          input.setAttribute('name', `${baseName}${i}`); 
      });

      // Atualizar os `onclick` de cada botão que remove os produtos para refletir os novos índices
      let btnRemover = todosPaineisProdutos[i].querySelector('button[onclick^="removerProduto"]');
      if (btnRemover) 
      {
          btnRemover.setAttribute('onclick', `removerProduto(${i})`);
      }
  }

  // Atualiza os eventos para todos os produtos
  for (let i = 0; i < produtos.length; i++) 
  {
      atualizarProdutoEvents(i);
  }
}
