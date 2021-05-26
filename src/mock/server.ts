import { createServer, Model, Response } from "miragejs";
import { ISource } from "../state/reducers/sourcesReducer";
import sourcesMockData from "./sources.json";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    models: {
      source: Model.extend<Partial<ISource>>({})
    },

    seeds(server) {
      server.db.loadData({
        sources: sourcesMockData
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/sources/:id", (schema, request) => {
        const id = request.params.id;
        const source = schema.find("source", id);

        if (!source) return new Response(404);

        return source;
      });

      this.passthrough('https://unpkg.com/**');
    }
  });
}
