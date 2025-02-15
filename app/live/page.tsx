import { basehub } from '@/lib/basehub';
import { Features } from './components/features';
import { Hero } from './components/hero';
import { Speaking } from './components/speaking';

export const generateMetadata = async () => {
  const { live } = await basehub.query({
    live: {
      metadata: {
        title: true,
        description: true,
      },
    },
  });

  return {
    title: live.metadata.title,
    description: live.metadata.description,
  };
};

const Live = () => (
  <>
    <Hero />
    <Features />
    <Speaking />
  </>
);

export default Live;
