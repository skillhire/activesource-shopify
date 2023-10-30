import React, { useEffect } from "react";
import { Layout, Article as ArticlePage } from "components";
import { useArticles } from "hooks";
import { useRouter } from "next/router";

const Article = () => {
  const router = useRouter();
  const { handle: blogHandle, article_handle: articleHandle } = router.query;

  const { article, error, fetchArticle } = useArticles();

  useEffect(() => {
    if (blogHandle && articleHandle) {
      fetchArticle(blogHandle, articleHandle);
    }
  }, [blogHandle, articleHandle]);

  return (
    <Layout>
      <ArticlePage html article={article} />
    </Layout>
  );
};

export default Article;
