import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Card from "@/components/composed/Card";
import { PostImage } from "@/components/primitives/PostImage";
import { Body, Display, DisplayBody, Eyebrow, Heading } from "@/components/primitives/Typography";
import { getAllPosts, formatPostDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notas, reflexiones y cosas nuevas que aprendo por el camino.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex w-full flex-col divide-y divide-soft">
      <section id="blog-hero" className="w-full grid grid-cols-6 gap-px bg-soft">
        <div className="col-span-6 lg:col-span-4 bg-background p-6 sm:p-10">
          <Display>Blog</Display>

          <DisplayBody className="py-5">
            Notas, reflexiones y cosas nuevas que aprendo por el camino.
          </DisplayBody>
        </div>

        <div className="hidden lg:flex lg:col-span-2 flex-col justify-end gap-2 bg-background p-6 sm:p-10">
          <Eyebrow>Entradas publicadas</Eyebrow>
          <p className="font-display text-7xl font-bold leading-none tracking-[-0.02em] text-text-primary">
            {String(posts.length).padStart(2, "0")}
          </p>
        </div>
      </section>

      <section id="posts" className="flex flex-col gap-px bg-soft border-b border-soft">
        <div className="w-full bg-background p-6 sm:p-10">
          <Eyebrow>Últimas entradas</Eyebrow>
        </div>

        <div className="flex flex-col gap-px bg-soft">
          {/* Show all the posts from fs */}
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group grid grid-cols-12 gap-px bg-soft">
              <div className="hidden lg:flex lg:col-span-3 items-center justify-center bg-background p-6 transition-colors group-hover:bg-surface-overlay">
                <PostImage slug={post.slug} />
              </div>

              <Card className="col-span-12 lg:col-span-9 transition-colors group-hover:bg-surface-overlay">
                <Eyebrow>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </Eyebrow>

                <Heading className="font-bold pt-2">{post.title}</Heading>

                <Body className="max-w-5xl pt-2">{post.excerpt}</Body>

                <span className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-interactive">
                  Leer entrada
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
