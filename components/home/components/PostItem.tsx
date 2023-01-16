import PublishedTime from "components/post/components/PublishedTime";
import Image from "next/image";
import Link from "next/link";
import { iFrontMatter } from "schema/post";

interface iProps {
  post: iFrontMatter & { id: string };
}

function PostItem({ post }: iProps) {
  return (
    <div className="pt-4 pb-8">
      <Link href={`/blog/${post.id}`}>
        <div className="w-7/8 flex flex-wrap">
          <div className="w-full md:w-4/5 pr-0 md:pr-8 order-1 flex flex-wrap justify-between">
            <PublishedTime date={post.date}></PublishedTime>
            <div className="w-full min-h-[115px]">
              <h3
                title={post.title}
                className="mt-0 break-all ellipsis line-clamp-2 md:line-clamp-1"
              >
                {post.title}
              </h3>
              <p
                title={post.excerpt}
                className="w-full mb-0 text-[var(--text-color)] break-all ellipsis line-clamp-3"
              >
                {post.excerpt}
              </p>
            </div>
          </div>
          {post.cover_image && (
            <div className="relative w-full md:w-1/5 h-[140px] mb-2 md:mb-0 order-none md:order-2">
              <Image
                className="object-cover object-center"
                alt={post.title}
                src={post.cover_image}
                sizes="(min-width: 1280px) 480px, (min-width: 1024px) 400px, 240px"
                fill
              ></Image>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default PostItem;
