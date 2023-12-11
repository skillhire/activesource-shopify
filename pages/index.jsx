import { useEffect } from "react";
import { Layout } from "components";
import { useHome } from "hooks";
import SectionHowItWorks from "sections/home/SectionHowItWorks";
import SectionHeroPrimary from "sections/home/SectionHeroPrimary";
import SectionFeaturedCollection from "sections/home/SectionFeaturedCollection";
import SectionEnterpriseSolutions from "sections/home/SectionEnterpriseSolutions";

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
    <Layout
      metaTitle={metaFields.title}
      metaDescription={metaFields.description}
    >
      <SectionHeroPrimary home={home} />
      <SectionFeaturedCollection featuredCollection={featuredCollection} />
      <SectionHowItWorks />
      <SectionEnterpriseSolutions />
    </Layout>
  );
};

export default Home;
