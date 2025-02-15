import { Section } from '@/components/section';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import Marquee from 'react-fast-marquee';

export const Logos = () => (
  <Pump
    queries={[
      {
        __typename: true,
        projects: {
          logos: {
            items: {
              _title: true,
              image: {
                url: true,
              },
            },
          },
        },
      },
    ]}
  >
    {async ([data]) => {
      'use server';

      if (!data.projects.logos.items.length) {
        return null;
      }

      return (
        <Section className={cn('flex flex-col gap-8 py-8', 'sm:py-16')}>
          <ViewAnimation
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            className="px-4"
          >
            <p className="text-center text-muted-foreground text-sm">
              My projects have been used by the world&apos;s most innovative
              companies
            </p>
          </ViewAnimation>

          <div className="relative">
            <Marquee autoFill>
              {data.projects.logos.items.map((logo, index) => (
                <ViewAnimation
                  initial={{ opacity: 0, filter: 'blur(0px)' }}
                  animate={{ opacity: 1 }}
                  key={logo.image.url}
                  delay={0.4 + index * 0.1}
                >
                  <BaseHubImage
                    src={logo.image.url}
                    alt=""
                    width={80}
                    height={40}
                    className="mx-12 h-10 w-20 object-contain opacity-50 invert dark:invert-0"
                  />
                </ViewAnimation>
              ))}
            </Marquee>
            <div className="absolute top-0 bottom-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-backdrop to-transparent" />
            <div className="absolute top-0 right-0 bottom-0 z-10 h-full w-24 bg-gradient-to-l from-backdrop to-transparent" />
          </div>
        </Section>
      );
    }}
  </Pump>
);
