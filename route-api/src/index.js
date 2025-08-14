export default {
  async fetch(request) {
    const { method, url } = request;
    const { pathname } = new URL(url);

    if (pathname === "/api/route" && method === "POST") {
      try {
        const body = await request.json();
        const { start, ziel } = body;

        if (!start || !ziel) {
          return new Response(
            JSON.stringify({ error: "Bitte Start und Ziel angeben." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ startort: start, zielort: ziel }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: "Ungültiges JSON." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    return new Response("Not Found", { status: 404 });
  },
};

