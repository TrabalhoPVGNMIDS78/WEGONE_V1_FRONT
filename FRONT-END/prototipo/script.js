// Função para mostrar uma seção e ocultar as outras
function mostrarSecao(id) {
    document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";
}

// Função para mostrar a tela de login, cadastro ou o conteúdo principal
function mostrarTela(tela) {
    document.getElementById('login-cadastro').style.display = 'none';
    document.getElementById('cadastro-box').style.display = 'none';
    document.getElementById('conteudo').style.display = 'none';

    if (tela === 'app') {
        document.getElementById('conteudo').style.display = 'block';
        mostrarSecao('inicio');
    } else if (tela === 'cadastro') {
        document.getElementById('cadastro-box').style.display = 'flex';
    } else {
        document.getElementById('login-cadastro').style.display = 'flex';
    }
}

// Função que abre a tela de login
function abrirLogin() {
    mostrarTela('app');
}

// Função que realiza o login do usuário
function loginUsuario() {
    const usuario = document.getElementById('login-usuario').value;
    const cadastro = document.getElementById('login-cadastroId').value;
    const senha = document.getElementById('login-senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.cadastro === cadastro && u.senha === senha);

    if (usuarioEncontrado) {
     localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
     mostrarTela('app');
    } else {
        alert('Usuário ou senha inválidos.');
    }

    document.getElementById("login-usuario").value = "";
    document.getElementById("login-cadastroId").value = "";
    document.getElementById("login-senha").value = "";
}

// Função que abre a tela de cadastro
function abrirCadastro() {
    mostrarTela('cadastro');
}

// Função que realiza o cadastro do usuário
function cadastrarUsuario() {
    const nome = document.getElementById("cad-nome").value.trim();
    const cadastro = document.getElementById("cad-cadastro").value.trim();
    const email = document.getElementById("cad-email").value.trim();
    const senha = document.getElementById("cad-senha").value;
    const confirmar = document.getElementById("cad-confirmar").value;

    const erroSenha = document.getElementById("erro-senha");
    const erroConfirmar = document.getElementById("erro-confirmar");

    // Limpa erros anteriores
    erroSenha.textContent = "";
    erroConfirmar.textContent = "";

    const regexSenha = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    let valido = true;

    if (!regexSenha.test(senha)) {
        erroSenha.textContent = "A senha precisa de 8+ caracteres, letra, número e caractere especial.";
        valido = false;
    }

    if (senha !== confirmar) {
        erroConfirmar.textContent = "As senhas não coincidem.";
        valido = false;
    }

    if (!valido) return;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({ nome, cadastro, email, senha, usuario: nome });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuário cadastrado com sucesso!');

    // Cadastro OK
    alert("Cadastro realizado com sucesso!");
    document.getElementById("cad-nome").value = "";
    document.getElementById("cad-cadastro").value = "";
    document.getElementById("cad-email").value = "";
    document.getElementById("cad-senha").value = "";
    document.getElementById("cad-confirmar").value = "";
    mostrarTela('app');
}

// Função que abre a tela de login
function abrirLogin() {
    mostrarTela('login-cadastro');
}

// Função para solicitar a senha antes de realizar ações sensíveis
function solicitarSenha(acao, evento, callback) {
    evento.preventDefault();
    const senha = prompt(`Digite a senha para ${acao}:`);
    if (senha === "1234") {
        alert(`${acao} autorizado com sucesso.`);
        if (typeof callback === "function") callback();
    } else {
        alert("Senha incorreta. Ação cancelada.");
    }
}

// Função que realiza o cadastro de uma nova orientação
function realizarCadastro(event) {
    solicitarSenha("Cadastrar", event, () => {
        alert("Cadastro realizado!");
        document.getElementById("titulo").value = "";
        document.getElementById("tipo").selectedIndex = 0;
        document.getElementById("conteudo").value = "";
     });
}

// Função que realiza a edição de uma orientação existente
function realizarEdicao(event) {
    solicitarSenha("Editar", event, () => {
        alert("Edição realizada!");
        document.getElementById("id-editar").value = "";
        document.getElementById("titulo-editar").value = "";
        document.getElementById("tipo-editar").selectedIndex = 0;
        document.getElementById("conteudo-editar").value = "";
    });
}

// Função que realiza a exclusão de uma orientação
function realizarExclusao(event) {
    solicitarSenha("Excluir", event, () => {
        alert("Exclusão realizada!");
        document.getElementById("id-excluir").value = "";
    });
}

// Função que realiza a pesquisa de orientações
function realizarPesquisa(event) {
    event.preventDefault();
    const termo = document.getElementById('pesquisa').value.trim().toLowerCase();
    const resultadoDiv = document.getElementById('resultado-pesquisa');
    document.getElementById("pesquisa").value = "";

    if (termo === "") {
        resultadoDiv.innerHTML = "<p>Digite algo para pesquisar.</p>";
    } else {
        resultadoDiv.innerHTML = `
        <h3>Resultado Encontrado:</h3>
        <p><strong>Título:</strong> ${termo.charAt(0).toUpperCase() + termo.slice(1)}</p>
        <p><strong>Tipo:</strong> Manual de Operação</p>
        <p><strong>Conteúdo:</strong> Exemplo de conteúdo da orientação pesquisada.</p>
    `;
    }
}

// Função para exibir o menu de perfil
function toggleMenu() {
    document.getElementById("menu-perfil").classList.toggle("show");
}

// Função para confirmar a saída da conta
function confirmarSaida() {
    if (confirm("Deseja realmente sair da conta?")) {
        localStorage.removeItem('usuarioLogado');
        mostrarTela('login');
    }
}

// Função que será executada ao carregar a página
window.onload = () => {
    mostrarTela('login');
};

// Carregar dados do usuário logado no perfil ao abrir a seção perfil
function carregarPerfil() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado) return;

    document.getElementById('nome').value = usuarioLogado.nome || "";

    if (usuarioLogado.foto) {
        // Se tiver foto base64 salva, cria uma imagem para mostrar no input (preview)
        const fotoInput = document.getElementById('foto');
        const preview = document.createElement('img');
        preview.src = usuarioLogado.foto;
        preview.style.maxWidth = '100px';
        preview.style.display = 'block';
    if (!fotoInput.nextSibling) {
        fotoInput.parentNode.insertBefore(preview, fotoInput.nextSibling);
    } else {
        fotoInput.parentNode.replaceChild(preview, fotoInput.nextSibling);
    }
  }
}

// Salvar alterações do perfil (nome, senha e foto)
document.querySelector('#perfil form').addEventListener('submit', e => {
    e.preventDefault();
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado) return alert("Erro: nenhum usuário logado.");
    
    const nome = document.getElementById('nome').value.trim();
    const senha = document.getElementById('senha').value;
    const fotoInput = document.getElementById('foto');

  // Atualiza nome
    if (nome) usuarioLogado.nome = nome;

  // Atualiza senha (se preenchido)
    if (senha) usuarioLogado.senha = senha;

  // Atualiza foto (se carregou uma)
    if (fotoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            usuarioLogado.foto = evt.target.result;
            salvarUsuarioAtualizado(usuarioLogado);
        }
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        salvarUsuarioAtualizado(usuarioLogado);
    }

    document.getElementById("nome").value = "";
    document.getElementById("senha").value = "";

});

function salvarUsuarioAtualizado(usuarioAtualizado) {
    // Atualiza localStorage usuário logado
    // localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
 
    // Atualiza lista de usuários
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.usuario === usuarioAtualizado.usuario);
    if (index > -1) {
        usuarios[index] = usuarioAtualizado;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    alert('Perfil atualizado com sucesso!');
    mostrarSecao('inicio'); // Volta para início ou outra seção que preferir
}

// Atualiza perfil ao mostrar a seção perfil
const observer = new MutationObserver(() => {
    if (document.getElementById('perfil').style.display === 'block') {
        carregarPerfil();
    }
});
observer.observe(document.querySelector('main'), { attributes: true, subtree: true, attributeFilter: ['style'] });
