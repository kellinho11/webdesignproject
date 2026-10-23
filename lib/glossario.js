// Os termos do site, num lugar só: a página /glossario lista todos e as dicas (.term) da home leem a
// definição daqui. `where` é a seção da home onde o termo aparece.
export const TERMS = [
  { id: 'qubit', term: 'Qubit', def: 'A unidade de informação quântica. Como o bit, é medido como 0 ou 1; antes da medição, pode estar nos dois ao mesmo tempo.', where: ['#topo', 'Hero'] },
  { id: 'superposicao', term: 'Superposição', def: 'Estado em que o qubit combina 0 e 1 com pesos definidos. É o que deixa um circuito avaliar muitos caminhos de uma vez.', where: ['#tecnologia', 'Tecnologia'] },
  { id: 'emaranhamento', term: 'Emaranhamento', def: 'Ligação entre qubits: medir um define o resultado do outro, por mais longe que estejam.', where: ['#topo', 'Hero'] },
  { id: 'interferencia', term: 'Interferência', def: 'Os caminhos de um circuito se somam ou se anulam, como ondas. O algoritmo arma essa soma para a resposta certa crescer.', where: ['#tecnologia', 'Tecnologia'] },
  { id: 'medicao', term: 'Medição', def: 'Ler o qubit. A superposição colapsa em 0 ou 1, com a chance dada pelos pesos.', where: ['#investidores', 'Investidores'] },
  { id: 'porta-h', term: 'Porta H (Hadamard)', def: 'Põe um qubit em |0⟩ em superposição igual de 0 e 1. É a primeira porta de quase todo circuito.', where: ['#tecnologia', 'Tecnologia'] },
  { id: 'porta-rz', term: 'Porta Rz', def: 'Gira a fase do qubit em torno do eixo Z. É assim que os dados do problema entram no circuito.', where: ['#casos-de-uso', 'Casos de Uso'] },
  { id: 'porta-swap', term: 'Porta SWAP', def: 'Troca o estado de dois qubits. No chip, aproxima qubits que precisam interagir.', where: ['#quantum-engineering', 'Quantum Engineering'] },
  { id: 'esfera-de-bloch', term: 'Esfera de Bloch', def: 'Desenho do estado de um qubit: o polo norte é |0⟩, o sul é |1⟩ e o resto da superfície são as superposições.', where: ['#topo', 'Hero'] },
  { id: 'shot', term: 'Shot', def: 'Uma execução do circuito seguida de medição. Como cada medição é aleatória, o resultado vem do histograma de muitos shots.', where: ['#demo', 'Demo'] },
  { id: 'decoerencia', term: 'Decoerência', def: 'Perda da superposição por contato com o ambiente (calor, ruído). O tempo T1 mede quanto o qubit aguenta.', where: ['#quantum-engineering', 'Quantum Engineering'] },
  { id: 'criostato', term: 'Criostato de diluição', def: 'A geladeira do computador quântico: seis estágios que levam o chip de 300 K a 15 mK, mais frio que o espaço.', where: ['#quantum-engineering', 'Quantum Engineering'] },
  { id: 'qpu', term: 'QPU', def: 'Quantum Processing Unit: o chip quântico, equivalente quântico da CPU.', where: ['#quantum-engineering', 'Quantum Engineering'] },
  { id: 'qaoa', term: 'QAOA', def: 'Algoritmo quântico para otimização: procura a melhor combinação ajustando o circuito em camadas.', where: ['#casos-de-uso', 'Casos de Uso'] },
  { id: 'vqe', term: 'VQE', def: 'Algoritmo híbrido que calcula a energia de moléculas: o quântico mede, o clássico ajusta, repetidamente.', where: ['#casos-de-uso', 'Casos de Uso'] },
  { id: 'grover', term: 'Algoritmo de Grover', def: 'Algoritmo de busca quântica: encontra um item em N possibilidades com cerca de √N tentativas.', where: ['#casos-de-uso', 'Casos de Uso'] },
  { id: 'annealing', term: 'Quantum Annealing', def: 'Técnica quântica que encontra a melhor solução deixando o sistema se acomodar no estado de menor energia, como uma bola rolando até o fundo do vale.', where: ['#tecnologia', 'Tecnologia'] },
];

const BY_ID = Object.fromEntries(TERMS.map((t) => [t.id, t]));
export const def = (id) => BY_ID[id].def;
