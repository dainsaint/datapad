import fs from "fs/promises";
import path from "path";

export async function loadRoutes( app, dir = path.resolve("_remix/folders"), baseRoute = "/" ) {
  const routes = await traverseRoutes(app, dir, baseRoute);
  
  const staticRoutes = routes.filter( route => !route.isDynamic );
  const dynamicRoutes = routes.filter( route => route.isDynamic );

  for( const { routePath, handlerPath } of staticRoutes ) {
    await registerRoute(app, routePath, handlerPath)
  }

  for (const { routePath, handlerPath } of dynamicRoutes) {
    await registerRoute(app, routePath, handlerPath);
  }
}


async function traverseRoutes( app, dir = path.resolve("_remix/folders"), baseRoute = "/" ) {

  const files = await fs.readdir(dir);
  const result = [];

  for( const file of files ) {
    const handlerPath = path.join(dir, file);
    const stat = await fs.stat(handlerPath);

    if( stat.isDirectory() ) {
      const dirRoutes = await traverseRoutes(app, handlerPath, `${baseRoute}/${file}`)
      result.push( ...dirRoutes );
    } else if( file.endsWith(".js") ){
      const routePath = getRoutePath(file, baseRoute);
      const isDynamic = routePath.includes(":");
      result.push({ routePath, handlerPath, isDynamic });
    }
  }

  return result;
}


function getRoutePath(file, baseRoute) {
  const route = file.replace(/\.js$/, "").replace(/index$/, "");

  const routePath = `${baseRoute}/${route}`
    .replace(/\[([^\]]+)]/g, ":$1")
    .replace(/\/+/g, "/")
    .replace(/\/$/g, "");
  
  return routePath
}


async function registerRoute(app, routePath, handlerPath) {
  const handlers = await import(handlerPath);
  const verbs = ["get", "post", "put", "patch", "delete"];

  Object.entries(handlers).forEach( ([method, handler]) => {
    if( verbs.includes(method) && typeof handler === "function" ) {
      console.log( method.toUpperCase(), routePath );
      app[method]( routePath, async(res, req, next) => {
        const result = await handler(res, req, next);
        if( result !== undefined && handlers.default) {
          const Component = handlers.default;
          const rendered = Component(result);
          res.send(rendered);
        }
      })
    }
  })

  if( handlers.default ) {
    app.get(routePath, async (req, res, next) => {
      const Component = handlers.default;
      const rendered = Component({});
      res.send(rendered)
    })
  }
}