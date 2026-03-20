// import Navbar from "@/app/Layouts/Navbar";
// import MainFooter from "@/app/Layouts/MainFooter";
// import Image from "next/image";
// import { BlogHeader } from "@/app/Layouts/BlogHeader";
// import AuthorBio from "@/app/Layouts/BioAbeerSehrawat";

// interface WPPost {
//   id: number;
//   title: { rendered: string };
//   content: { rendered: string };
//   date: string;
//   yoast_head_json?: {
//     og_image?: Array<{ url: string }>;
//     author: string;
//   };
//   _embedded?:{
//     author?: Array<{description: string}>;
//   }
// }

// export default async function BlogPostPage({ params }: { params: { slug: string } }) {
//   const { slug } = await params; // ✅ Unwrap params (Next.js 15+ requirement)

//   const res = await fetch(`https://lsod.in/wp-json/wp/v2/posts?_embed`, {
//     next: { revalidate: 60 }, // optional caching
//   });
//   const data: WPPost[] = await res.json();
//   const post = data[0];

//   if (!post) {
//     return (
//       <div className="min-h-screen bg-shunya-labs text-gray-400 flex items-center justify-center">
//         Blog not found.
//       </div>
//     );
//   }

//   const imageUrl =
//     post.yoast_head_json?.og_image?.[0]?.url || "/assets/blog/default.jpg";

//   const date = new Date(post.date).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   return (
//     <div className="min-h-screen bg-shunya-labs text-gray-200">
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-3 md:px-10 pb-8 md:py-10">
//         <div className="bg-black/40 p-6 md:p-10 rounded-2xl shadow-lg border border-gray-800 mt-8">
//           <div className="blog-content space-y-8">
//             <BlogHeader
//               title={post.title.rendered}
//               author={post.yoast_head_json?.author}
//               role={post._embedded?.author?.[0]?.description || "Role"}
//               imageSrc={imageUrl}
//             />

//             <div
//               className="prose prose-invert max-w-none leading-relaxed text-gray-300"
//               dangerouslySetInnerHTML={{ __html: post.content.rendered }}
//             />

//             <div className="mt-16">
//               <AuthorBio />
//             </div>
//           </div>
//         </div>
//       </div>

//       <MainFooter />
//     </div>
//   );
// }
import Navbar from "@/app/Layouts/Navbar";
import MainFooter from "@/app/Layouts/MainFooter";
import Image from "next/image";
import { BlogHeader } from "@/app/Layouts/BlogHeader";
import AuthorBio from "@/app/Layouts/BioAbeerSehrawat";

interface WPPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  yoast_head_json?: {
    og_image?: Array<{ url: string }>;
    author?: string;
  };
  _embedded?: {
    author?: Array<{ name?: string; description?: string }>;
    ["wp:featuredmedia"]?: Array<{ source_url?: string }>;
  };
}

// ✅ Next 15: params is a Promise if you intend to await it
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `https://lsod.in/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`,
    { next: { revalidate: 60 } }
  );
  const data: WPPost[] = await res.json();
  const post = data[0];

  if (!post) {
    return (
      <div className="min-h-screen bg-shunya-labs text-gray-400 flex items-center justify-center">
        Blog not found.
      </div>
    );
  }

  const imageUrl =
    post.yoast_head_json?.og_image?.[0]?.url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/assets/blog/default.jpg";

  const author =
    post.yoast_head_json?.author ||
    post._embedded?.author?.[0]?.name ||
    "Unknown";

  const role = post._embedded?.author?.[0]?.description || "Author";

  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-shunya-labs text-gray-200 pt-20">
      <Navbar />

      <div className="max-w-5xl mx-auto px-3 md:px-10 pb-8 md:py-10">
        <div className="bg-black/40 p-6 md:p-10 rounded-2xl shadow-lg border border-gray-800 mt-8">
          <div className="blog-content space-y-8">
            <BlogHeader
              title={post.title.rendered}
              author={author}
              role={role}
              category=""
              date={date}
              imageSrc={imageUrl}
            />

            <div
              className="prose prose-invert max-w-none leading-relaxed text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            <div className="mt-16">
              <AuthorBio />
            </div>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  );
}
