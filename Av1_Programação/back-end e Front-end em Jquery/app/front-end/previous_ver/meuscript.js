$.ajax({
    url: 'http://localhost:5000/listar_personagens',
    method: 'GET',
    dataType: 'json',
    success: listar,
    error: function() {
        alert("erro! Verifique o back-end.")
    }
});
function listar(personagem){
    for (var persona in personagem){
        dados_personagem = '<tr>' + '<td>' + personagem[persona].nome + '</td>'+ '<td>' + personagem[persona].vida + '</td>'+ '<td>' + personagem[persona].ataque + '</td>'+ '<td>' + personagem[persona].defesa + '</td>' + '<td>' + personagem[persona].pacto + '</td>' + '</tr>';
        $('#Personagens_corpo_tabela').append(dados_personagem)
    }
}