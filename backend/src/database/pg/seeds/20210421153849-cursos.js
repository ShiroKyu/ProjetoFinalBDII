module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'cursos',
      [
        {
          nome:
            'Análise e Desenvolvimento de Sistemas - Cajazeiras (CAMPUS CAJAZEIRAS)',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome:
            'Técnico em Mineração Integrado - Campina Grande (CAMPUS CAMPINA GRANDE)',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Engenharia Civil - Cajazeiras (CAMPUS CAJAZEIRAS)',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Técnico em Informática - Cajazeiras (CAMPUS CAJAZEIRAS)',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Licenciatura em Matemática - Cajazeiras (CAMPUS CAJAZEIRAS)',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cursos', null, {});
  },
};
