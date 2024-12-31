import fs from "fs/promises";
import path from "path";

const context = {
  routePath: "/"
};

export function linkTo(url) {
  if( url.startsWith("/") )
    return url;

  if( !url.startsWith('.') )
    url = "../" + url;

  return path.resolve(context.routePath, url);
}

export async function loadRoutes( app, dir = path.resolve("_remix/folders"), baseRoute = "/", parentLayout = (content) => content ) {
  const files = await fs.readdir(dir);
  files.reverse();

  const layoutFile = path.join(dir, "_layout.js");

  let currentLayout = parentLayout;

  try {
    await fs.access(layoutFile, fs.constants.F_OK);
    const imported = await import(layoutFile);
    const layout = imported.default;
    currentLayout = content => parentLayout(layout(content));
  } catch {}

  for( const file of files ) {
    const handlerPath = path.join(dir, file);
    const stat = await fs.stat(handlerPath);

    if( stat.isDirectory() ) {
      await loadRoutes(app, handlerPath, `${baseRoute}/${file}`, currentLayout)
    } else if( file.endsWith(".js") && !file.endsWith("_layout.js")){
      const route = file.replace(/\.js$/, "").replace(/index$/, "");

      const routePath = `${baseRoute}/${route}`
        .replace(/\./g, "/")
        .replace(/\[([^\]]+)]/g, ":$1")
        .replace(/\/+/g, "/")
        .replace(/(.)\/$/g, "$1");
  
      const handlers = await import(handlerPath);
      const verbs = ["get", "post", "put", "patch", "delete"];

      Object.entries(handlers).forEach(([method, handler]) => {
        if (verbs.includes(method) && typeof handler === "function") {
          console.log(method.toUpperCase(), routePath);
          app[method](routePath, async (req, res, next) => {
            const result = await handler(req, res, next);

            if (result !== undefined && handlers.default) {
              context.routePath = req.path;
              const Component = handlers.default;
              const rendered = currentLayout( Component(result) );
              res.send(rendered);
            }
          });
        }
      });

      if (handlers.default && !handlers.get) {
        console.log("GET", routePath);
        app.get(routePath, async (req, res, next) => {
          context.routePath = req.path;
          const Component = handlers.default;
          const rendered = currentLayout(Component({}));
          res.send(rendered);
        });
      }
    }
  }
}