import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div>
      <ul>
        {posts && posts.nodes && (
          <ul>
            {posts.nodes.map((post) => (
              <li key={post.slug}>
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://nutrapetsystemstest.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query HomePageQuery {
          posts {
            nodes {
              slug
              title
            }
          }
        }
      `,
    }),
  });

  const json = await res.json();

  return {
    props: {
      posts: json.data.posts,
    },
  };
}
