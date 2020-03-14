## Instruções:

**Sessão do usuário:** 
O *blip*(ferramenta do chat) mantém os dados da sessão em um cookie e em localStorage.

Para que o *chatbot* tenha o fluxo desejado **planejei a exclusão da sessão do chat dentro da página de entrada do usuário**, na **página onde é solicitado o telefone/cpf do cliente** deve ser executado a seguinte função *javascript*
![Imagem da tela da LP de entrada que deve conter script para remoção de sessão](https://imgur.com/p2FgxFQ)

    localStorage.removeItem("blipSdkUAccount");

a finalidade desta função é resetar a sessão de usuário caso ele tenha acessado outra *Landing Page*, assim evitando que o fluxo anterior impeça que o fluxo da nova LP seja executado, já que é o mesmo chat compartilhado para todas as páginas.

