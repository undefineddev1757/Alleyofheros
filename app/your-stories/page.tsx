import Header from "../components/Header";
import Footer from "../components/Footer";
import YourStoriesBanner from "./YourStoriesBanner";
import StoriesExample from "./StoriesExample";
import FormStoryBlock from "./FormStoryBlock";

export default function YourStoriesPage() {
  return (
    <main>
      <Header />
      
      <YourStoriesBanner />
      
      <StoriesExample />
      
      <FormStoryBlock />
      
      <Footer />
    </main>
  );
}
