const esbuild = require('esbuild');


esbuild.build({
  entryPoints: ['server/server.jsx'],
  outfile: 'build/server.js',
  platform: 'node',
  watch: true,
}).catch(() => process.exit(1));