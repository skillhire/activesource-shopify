import { useEffect } from "react";
import { Layout } from "components";
import { useHome } from "hooks";
import SectionHeroPrimary from "sections/home/SectionHeroPrimary";
import SectionFeaturedCollection from "sections/home/SectionFeaturedCollection";

const Home = () => {
  const { home, featuredCollection, fetchHome } = useHome();

  useEffect(() => {
    fetchHome();
  }, []);

  const metaFields = {
    title: "Active Source ",
    description: "Active Source Lab",
  };

  return (
    <Layout title={metaFields.title} metaDescription={metaFields.description}>
      <SectionHeroPrimary home={home} />
      <SectionFeaturedCollection featuredCollection={featuredCollection} />
    </Layout>
  );
};

export default Home;
