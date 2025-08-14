export default {
  async fetch(request, env, ctx) {
    const { method, url } = request;
    const { pathname } = new URL(url);

    // In-memory dummy data
    const data = {
      1: { id: 1, name: "Alice" },
      2: { id: 2, name: "Bob" }
    };

    const sendJSON = (obj, status = 200) => new Response(JSON.stringify(obj), {
      status,
      headers: { "Content-Type": "application/json" }
    });

    if (pathname.startsWith("/api/users")) {
      const idMatch = pathname.match(/^\/api\/users\/(\d+)$/);
      const id = idMatch ? idMatch[1] : null;

      switch (method) {
        case "GET":
          return id
            ? data[id]
              ? sendJSON(data[id])
              : sendJSON({ error: "Not found" }, 404)
            : sendJSON(Object.values(data));
        case "POST":
          const body = await request.json();
          data[3] = { id: 3, ...body };
          return sendJSON(data[3], 201);
        case "PUT":
          if (!id || !data[id]) return sendJSON({ error: "Not found" }, 404);
          const update = await request.json();
          data[id] = { ...data[id], ...update };
          return sendJSON(data[id]);
        case "DELETE":
          if (!id || !data[id]) return sendJSON({ error: "Not found" }, 404);
          delete data[id];
          return sendJSON({ deleted: true });
        default:
          return sendJSON({ error: "Method not allowed" }, 405);
      }
    }

    return new Response("Not Found", { status: 404 });
  }
}

