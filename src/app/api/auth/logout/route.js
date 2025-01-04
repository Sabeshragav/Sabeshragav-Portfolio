export async function GET(req) {
  try {
    return new Response("Logged Out", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `token=; HttpOnly; Path=/; Max-Age=0;`,
      },
    });
  } catch (error) {
    return Response.json(error.message, {
      status: 500,
    });
  }
}
