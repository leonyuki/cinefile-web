import { client } from "../libs/client";

export default async function Home() {
  const data = await client.getList({ endpoint: "news" });

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">CinéFile News</h1>
      
      <ul className="space-y-4">
        {data.contents.map((news: any) => (
          <li key={news.id} className="p-4 border rounded-md shadow-sm">
            {news.title}
          </li>
        ))}
      </ul>
    </main>
  );
}