// Inputs do formulário
const cep = document.querySelector('#cep');
const endereco = document.querySelector('#endereco');
const bairro = document.querySelector('#bairro');
const municipio = document.querySelector('#municipio');
const estado = document.querySelector('#estado');

// Span do CEP 
const message = document.querySelector('#cepInvalido');


// Evento de 'focusout' para preencher os campos do endereço | Clicar fora do campo de CEP
cep.addEventListener('focusout', async() => {

    // Verifica se o CEP é válido
    try 
    {
        // Expressões regulares para validar o CEP
        const validarCep = /^[0-9]+$/;
        const cepValido = /^[0-9]{8}$/;

        // Verifica se o CEP é válido
        if(!validarCep.test(cep.value) || !cepValido.test(cep.value))
        {
            // Lança um erro
            throw { cepInvalido: 'CEP inválido!'}
        }

        // Requisição para a API do ViaCEP
        const resposta = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

        // Verifica se a resposta da requisição é ok
        if(!resposta.ok)
        {
            // Lança um erro com a resposta da requisição em formato JSON
            throw await resposta.json();
        }

        // Preenche os campos do endereço com os dados da requisição
        const dadosCep = await resposta.json();
        endereco.value = dadosCep.logradouro;
        bairro.value = dadosCep.bairro;
        municipio.value = dadosCep.localidade;
        estado.value = dadosCep.uf;

    }
    // Tratamento de erro 
    catch (error) 
    {
        // Verifica se o erro é de CEP inválido
        if(error?.cepInvalido)
        {
            // Exibe a mensagem de erro e limpa o campo de CEP e os campos do endereço
            message.textContent = error.cepInvalido;
            setTimeout(() => {
                message.textContent = '';
            }, 5000);
            cep.value = '';
            endereco.value = '';
            bairro.value = '';
            municipio.value = '';
            estado.value = '';
        }
    }

});
