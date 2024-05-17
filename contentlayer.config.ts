import fs from "fs";
import path from "path";

import {
  defineDocumentType,
  makeSource,
  ComputedFields,
} from "contentlayer/source-files"; // eslint-disable-line
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";

const getSlug = (doc: any) => doc._raw.sourceFileName.replace(/\.mdx$/, "");

const blogComputedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => getSlug(doc),
  },
  image: {
    type: "string",
    resolve: (doc) => {
      const imagePath = path.join(
        process.cwd(),
        "public",
        "blog",
        `${getSlug(doc)}/image.png`,
      );
      return fs.existsSync(imagePath)
        ? `/blog/${getSlug(doc)}/image.png`
        : null;
    },
  },
  og: {
    type: "string",
    resolve: (doc) => `/blog/${getSlug(doc)}/image.png`,
  },
};

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    date: { type: "string", required: true },
    updatedAt: { type: "string", required: false },
    tags: { type: "json", required: false },
  },
  computedFields: blogComputedFields,
}));

const projectComputedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => getSlug(doc),
  },
  image: {
    type: "string",
    resolve: (doc) => `/projects/${getSlug(doc)}/image.png`,
  },
};

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `project/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    longSummary: { type: "string", required: false },
    date: { type: "string", required: true },
    url: { type: "string", required: false },
    tags: { type: "json", required: false },
  },
  computedFields: projectComputedFields,
}));

const craftComputedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => getSlug(doc),
  },
};

export const Craft = defineDocumentType(() => ({
  name: "Craft",
  filePathPattern: `craft/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    date: { type: "string", required: true },
  },
  computedFields: craftComputedFields,
}));


export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog, Project, Craft],
  mdx: {
    rehypePlugins: [rehypePrism, rehypeSlug],
  },
});
