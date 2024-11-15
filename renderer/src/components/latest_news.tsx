import Image from "next/image";
import Link from "next/link";
import React from "react";

const LatestNews = () => {
  const news = [
    { id: 1, image: "/news/news1.png", url: "/" },
    { id: 2, image: "/news/news2.png", url: "/" },
    { id: 3, image: "/news/news1.png", url: "/" },
  ];
  return (
    <div className="py-4 text-white h-full">
      <h2 className="text-xl mb-4 font-semibold">Latest News</h2>
      <div className="grid gap-4 h-full overflow-auto">
        {news.map((item) => (
          <Link
            href={item.url}
            className="hover:opacity-90"
            key={item.id}
          >
            <Image
              src={item.image}
              width={400}
              height={300}
              alt={`News ${item.id}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
