const usuarioFixo = {
    nomeUsuario: 'aluno',
    senhaUsuario: '123'
};
export function autenticar(usuario, senha) {
    if (usuario === usuarioFixo.nomeUsuario && senha === usuarioFixo.senhaUsuario) {
        return true;
    }
    return false;
}