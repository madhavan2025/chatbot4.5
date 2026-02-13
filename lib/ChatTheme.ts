import clientPromise from "@/lib/mongodb";

export async function getChatTheme() {
  const client = await clientPromise;
  const db = client.db(); // uses DB from connection string

  const theme = await db.collection("chatThemes").findOne({
    name: "default",
  });

  return theme;
}
