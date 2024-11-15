import browserSync from "browser-sync";

export default class ClientDev {
  constructor(port) {
    const bs = browserSync.create();
    bs.init({
      server: "./client",
      port: port,
      open: false,
      ui: false,
      ghostMode: false
    });

    bs.watch("./client/**/*", async (event, file) => {
      bs.reload(file)
    });
  }
}
