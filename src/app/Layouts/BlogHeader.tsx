import Image from "next/image";
import Link from "next/link";

interface BlogHeaderProps {
  title: string;
  author: string | undefined;
  role?: string;
  category: string;
  date: string;
  imageSrc: string;
  altText?: string;
  accentColor?: string; // Optional: customize author color
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  author = "",
  role = "",
  category = "",
  date = "",
  imageSrc,
  altText = "Blog featured image",
  accentColor = "text-purple-400",
}) => {
  return (
    <div className="blogContainer flex flex-col items-center justify-center w-full">
      <div className="blogCard w-full max-w-5xl">

        {/* Blog Title */}
        <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-white leading-snug">
          {title}
        </h1>

        {/* Author + Category */}
        <p className="text-sm text-gray-400">
          By{" "}
          <span className={`font-medium ${accentColor}`}>
            {author}
          </span>

          {role && ` | ${role} | `}

          {/* Category clickable */}
          <Link
            style={{textDecoration:'none'}}
            href={`/blog?category=${encodeURIComponent(category)}`}
            className="font-bold text-blue-500 hover:text-blue-400 transition"
          >
            {category}
          </Link>

          <span className="font-semibold">
            {date && ` | ${date}`}
          </span>
        </p>

        {/* Featured Image */}
        <div className="w-full rounded-xl overflow-hidden mt-4">
          <Image
            src={imageSrc}
            alt={altText}
            className="object-cover w-full h-full"
            width={1200}
            height={600}
            priority
          />
        </div>

      </div>
    </div>
  );
};
