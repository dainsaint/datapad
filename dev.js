import getPort, { portNumbers } from "get-port";
import browserSync from "browser-sync";

const browserSyncPort = await getPort({ port: portNumbers(8080, 8100)});

const bs = browserSync({
  proxy: `localhost:${4000}`,
  port: browserSyncPort,
  ui: false,
  open: false,
  ghostMode: false,
  files: ['./app/**/*']
})