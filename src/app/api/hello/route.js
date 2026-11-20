export async function GET() {
  return Response.json({
    message: "这是从服务器发来的",
    time: new Date().toLocaleTimeString(),
  });
}