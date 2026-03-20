'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from './Pagination';

interface WPPost {
  id: number;
  title: { rendered: string };
  date: string;
  link: string;
  slug: string;
  yoast_head_json?: {
    og_image?: Array<{ url: string }>;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export default function BlogListNew() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(9);

  const fetchBlogs = async (pageNumber: number, perPageCount: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://blogadmin.webartsol.com/wp-json/wp/v2/posts?_embed&per_page=${perPageCount}&page=${pageNumber}`
      );

      const total = response.headers.get('x-wp-totalpages');
      const data = await response.json();

      setPosts(data);
      setTotalPages(total ? parseInt(total) : 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page, perPage);
  }, [page, perPage]);

  return (
    <div className="text-white px-6 md:px-12 py-12 min-h-screen">
      {loading ? (
        <div className="text-center text-gray-400 py-20">
          Loading blogs...
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {posts.map((post) => {
            const imageUrl =
              post.yoast_head_json?.og_image?.[0]?.url ||
              post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
              '/assets/blog/default.jpg';

            const date = new Date(post.date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            });

            return (
              <Link
                key={post.id}
                href={`/blog-new/${post.slug}`}
                className="bg-black/40 border border-gray-800 rounded-2xl p-4 hover:border-gray-600 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative rounded-xl h-56 w-full overflow-hidden bg-gradient-to-br from-[#f4d7ff] to-[#ffe5d0]">
                  <Image
                    src={imageUrl}
                    alt={post.title.rendered}
                    fill
                    className="object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="mt-4 text-center">
                  <span className="text-xs bg-black/60 px-4 py-1.5 rounded-full text-gray-300 border border-gray-700">
                    Blog
                  </span>

                  <h4
                    className="mt-3 text-base font-medium line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: post.title.rendered,
                    }}
                  />

                  <p className="text-xs text-gray-400 mt-2">{date}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && (
        <Pagination
          page={page}
          totalPages={totalPages}
          perPage={perPage}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
}