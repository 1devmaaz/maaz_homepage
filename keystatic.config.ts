import { collection, config, fields } from "@keystatic/core";

// NODE_ENV is inlined at build time in both server and client bundles,
// so this stays consistent everywhere (a server-only env var would be
// undefined in the browser and silently fall back to local mode).
export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : {
          kind: "github",
          repo: "maazshakeel/maaz_homepage",
        },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        date: fields.date({ label: "Published date" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        cover: fields.image({
          label: "Cover image",
          directory: "public/blog",
          publicPath: "/blog/",
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/blog",
              publicPath: "/blog/",
            },
          },
        }),
      },
    }),
  },
});
