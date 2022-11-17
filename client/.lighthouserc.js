module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn build && yarn start', // 서버를 키는 명령어를 통해서도 실행 가능
      url: ['http://localhost:3000/main'],
      numberOfRuns: 5,
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
    assert: {
      assertions: {
        'first-contentful-paint': ['warn', { minScore: 0.75 }],
        'largest-contentful-paint': ['warn', { minScore: 0.75 }],
      },
    },
  },
};
