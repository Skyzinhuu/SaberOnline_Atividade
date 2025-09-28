document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const cursoId = parseInt(params.get('curso'));

    if (cursoId) {
        fetch(`/cursos/${cursoId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Curso não foi encontrado.');
                }
                return response.json();
            })
            .then(curso => {
                document.getElementById('curso-titulo').textContent = curso.titulo;
                document.getElementById('curso-descricao').innerHTML = `<strong>Descrição:</strong> ${curso.descricao || 'Não foi informado'}`;
                document.getElementById('curso-instrutor').textContent = curso.instrutor || 'Não informado';
                document.getElementById('curso-carga').textContent = curso.carga_horaria || 'Não informada';
                document.getElementById('curso-nivel').textContent = curso.nivel || 'Não informado';
                document.getElementById('curso-vagas').textContent = curso.vagas || 'N/A';
                document.getElementById('curso-preco').textContent = parseFloat(curso.preco).toFixed(2).replace('.', ',');
                
                const quantidadeInput = document.getElementById('quantidade');
                const valorTotalSpan = document.getElementById('valor-total');
                
                if (curso.vagas) {
                    quantidadeInput.setAttribute('max', curso.vagas);
                }

                function calcularTotal() {
                    const quantidade = parseInt(quantidadeInput.value);
                    if (quantidade > 0) {
                        const total = quantidade * parseFloat(curso.preco);
                        valorTotalSpan.textContent = total.toFixed(2).replace('.', ',');
                    } else {
                        valorTotalSpan.textContent = '0,00';
                    }
                }
                quantidadeInput.addEventListener('input', calcularTotal);
                calcularTotal();
            })
            .catch(error => {
                document.getElementById('curso-titulo').textContent = "Curso não foi encontrado!";
                console.error('Erro ao buscar detalhes sobre o curso:', error);
            });
    } else {
        document.getElementById('curso-titulo').textContent = "ID do curso não fo fornecido.";
    }
});
