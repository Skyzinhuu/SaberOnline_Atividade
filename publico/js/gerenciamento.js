document.addEventListener('DOMContentLoaded', () => {
    const formCurso = document.getElementById('form-curso');
    const tabelaCorpo = document.getElementById('tabela-cursos-corpo');
    const cursoIdInput = document.getElementById('cursoId');
    const btnCancelar = document.getElementById('btn-cancelar');
    const feedbackDiv = document.getElementById('mensagem-feedback');

    const apiURL = '/cursos';

    
    function mostrarFeedback(mensagem, sucesso = true) {
        feedbackDiv.innerHTML = `
            <div class="alert alert-${sucesso ? 'success' : 'danger'}" role="alert">
                ${mensagem}
            </div>
        `;
        setTimeout(() => { feedbackDiv.innerHTML = ''; }, 3000);
    }
    
    
    async function carregarCursosNaTabela() {
        try {
            const response = await fetch(apiURL);
            if (!response.ok) throw new Error('Erro ao buscar os cursos.');
            
            const cursos = await response.json();
            tabelaCorpo.innerHTML = ''; 

            if (cursos.length === 0) {
                tabelaCorpo.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum curso foi cadastrado.</td></tr>';
                return;
            }

            cursos.forEach(curso => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${curso.id}</td>
                    <td>${curso.titulo}</td>
                    <td>R$ ${parseFloat(curso.preco).toFixed(2).replace('.', ',')}</td>
                    <td>${curso.vagas || 'N/A'}</td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-editar" data-id="${curso.id}">Editar</button>
                        <button class="btn btn-danger btn-sm btn-excluir" data-id="${curso.id}">Excluir</button>
                    </td>
                `;
                tabelaCorpo.appendChild(tr);
            });
        } catch (error) {
            mostrarFeedback(error.message, false);
        }
    }

  
    async function prepararEdicao(id) {
        try {
            
            const response = await fetch(apiURL);
            const cursos = await response.json();
            const cursoParaEditar = cursos.find(c => c.id === id);

            if (cursoParaEditar) {
                cursoIdInput.value = cursoParaEditar.id;
                document.getElementById('titulo').value = cursoParaEditar.titulo;
                document.getElementById('descricao').value = cursoParaEditar.descricao || '';
                document.getElementById('instrutor').value = cursoParaEditar.instrutor || '';
                document.getElementById('carga_horaria').value = cursoParaEditar.carga_horaria || '';
                document.getElementById('nivel').value = cursoParaEditar.nivel || '';
                document.getElementById('preco').value = cursoParaEditar.preco;
                document.getElementById('vagas').value = cursoParaEditar.vagas || '';
                
                btnCancelar.style.display = 'inline-block';
                formCurso.querySelector('button[type="submit"]').textContent = 'Atualizar';
            }
        } catch (error) {
            mostrarFeedback('Não foi possível carregar os dados do curso para editção dele .', false);
        }
    }

    
    function limparFormulario() {
        formCurso.reset();
        cursoIdInput.value = '';
        btnCancelar.style.display = 'none';
        formCurso.querySelector('button[type="submit"]').textContent = 'Salvar';
    }
    

    formCurso.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = cursoIdInput.value;
        const cursoData = {
            titulo: document.getElementById('titulo').value,
            descricao: document.getElementById('descricao').value,
            instrutor: document.getElementById('instrutor').value,
            carga_horaria: document.getElementById('carga_horaria').value,
            nivel: document.getElementById('nivel').value,
            preco: parseFloat(document.getElementById('preco').value),
            vagas: parseInt(document.getElementById('vagas').value)
        };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiURL}/${id}` : apiURL;
        
        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cursoData)
            });

            const resultado = await response.json();
            if (!response.ok) throw new Error(resultado.mensagem);

            mostrarFeedback(resultado.mensagem, true);
            limparFormulario();
            await carregarCursosNaTabela();

        } catch (error) {
            mostrarFeedback(error.message, false);
        }
    });

    
    tabelaCorpo.addEventListener('click', (e) => {
        const target = e.target;
        const id = target.getAttribute('data-id');
        
        if (target.classList.contains('btn-editar')) {
            prepararEdicao(parseInt(id));
        }
        
        if (target.classList.contains('btn-excluir')) {
            if (confirm(`Tem certeza que deseja excluir o curso de ID ${id}?`)) {
                fetch(`${apiURL}/${id}`, { method: 'DELETE' })
                    .then(response => response.json())
                    .then(resultado => {
                        mostrarFeedback(resultado.mensagem, true);
                        carregarCursosNaTabela();
                    })
                    .catch(error => mostrarFeedback(error.message, false));
            }
        }
    });

    
    btnCancelar.addEventListener('click', limparFormulario);

    
    carregarCursosNaTabela();
});