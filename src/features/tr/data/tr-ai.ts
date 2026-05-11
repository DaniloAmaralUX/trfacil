export type TRAISectionId =
  | 'object'
  | 'justification'
  | 'requirements'
  | 'specifications'

export type TRAIAction = 'suggest' | 'rewrite' | 'expand'

export type TRAISuggestion = {
  title: string
  content: string
}

export const trAIActionLabels: Record<TRAIAction, string> = {
  suggest: 'Sugerir texto',
  rewrite: 'Reescrever',
  expand: 'Expandir',
}

export const trAISectionLabels: Record<TRAISectionId, string> = {
  object: 'Objeto',
  justification: 'Justificativa',
  requirements: 'Requisitos',
  specifications: 'Especificações',
}

export const trAISuggestions: Record<
  TRAISectionId,
  Record<TRAIAction, TRAISuggestion>
> = {
  object: {
    suggest: {
      title: 'Objeto sugerido',
      content:
      'Contratação de serviço especializado para planejamento, condução e registro de trilha formativa em NR-10, com execução presencial, materiais de apoio e acompanhamento da equipe técnica da unidade.',
    },
    rewrite: {
      title: 'Objeto reescrito',
      content:
      'Contratação de profissional especializado para ministrar capacitação intensiva em NR-10, contemplando preparação do conteúdo, execução das aulas e entrega dos registros necessários para comprovação da formação.',
    },
    expand: {
      title: 'Objeto expandido',
      content:
      'Contratação de serviço especializado para planejamento, ministração e documentação completa de turma intensiva em NR-10, incluindo alinhamento prévio com a equipe pedagógica, organização do plano de aula, condução das atividades teórico-práticas, controle de presença e consolidação do relatório final de execução.',
    },
  },
  justification: {
    suggest: {
      title: 'Justificativa sugerida',
      content:
      'A contratação é necessária para atender uma demanda imediata de formação técnica, preservando o calendário acadêmico da unidade e garantindo a qualidade da entrega mesmo com a indisponibilidade de capacidade interna no período planejado.',
    },
    rewrite: {
      title: 'Justificativa reescrita',
      content:
      'A necessidade da contratação decorre do aumento de demanda por formações técnicas e da limitação operacional da equipe interna para absorver a carga horária prevista sem comprometer cronograma, qualidade ou aderência normativa.',
    },
    expand: {
      title: 'Justificativa expandida',
      content:
      'A necessidade da contratação decorre do aumento de demanda por formações técnicas e da limitação operacional da equipe interna para absorver a carga horária prevista sem comprometer cronograma, qualidade ou aderência normativa. Ao viabilizar apoio especializado no período crítico, a unidade reduz risco de remarcações, protege a experiência dos participantes e assegura continuidade do planejamento institucional.',
    },
  },
  requirements: {
    suggest: {
      title: 'Requisitos sugeridos',
      content:
      'Comprovar experiência recente no tema, apresentar documentação fiscal regular, garantir disponibilidade nas datas previstas e entregar materiais alinhados ao escopo aprovado pela equipe técnica.',
    },
    rewrite: {
      title: 'Requisitos reescritos',
      content:
        'O fornecedor devera comprovar experiencia compatível com o objeto, manter regularidade documental e assegurar disponibilidade integral para execucao nas datas validadas pela unidade contratante.',
    },
    expand: {
      title: 'Requisitos expandidos',
      content:
      'O fornecedor deverá comprovar experiência compatível com o objeto, manter regularidade documental e assegurar disponibilidade integral para execução nas datas validadas pela unidade contratante. Também deverá atuar em alinhamento com as orientações pedagógicas e técnicas, apresentando materiais, evidências de execução e registros de entrega dentro dos prazos estipulados.',
    },
  },
  specifications: {
    suggest: {
    title: 'Especificações sugeridas',
      content:
      'O escopo deve contemplar preparação, execução e encerramento da entrega, com entregáveis objetivos, cronograma claro e parâmetros de aceite definidos pela área demandante.',
    },
    rewrite: {
    title: 'Especificações reescritas',
      content:
      'A execução deverá abranger todas as etapas da entrega, da preparação ao encerramento, com descrição clara das responsabilidades, entregáveis associados e critérios de aceite acompanhados pela equipe técnica.',
    },
    expand: {
    title: 'Especificações expandidas',
      content:
      'A execução deverá abranger todas as etapas da entrega, da preparação ao encerramento, com descrição clara das responsabilidades, entregáveis associados e critérios de aceite acompanhados pela equipe técnica. Recomenda-se explicitar marcos de validação, formato dos materiais gerados e prazos de resposta para ajustes ou complementações.',
    },
  },
}
