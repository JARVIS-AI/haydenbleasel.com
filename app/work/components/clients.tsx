import { Section } from '@/components/section';
import { env } from '@/lib/env';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { Pump } from 'basehub/react-pump';
import Image from 'next/image';

export const Clients = () => (
  <Pump
    queries={[
      {
        __typename: true,
        work: {
          clients: {
            items: {
              _title: true,
              url: true,
            },
          },
        },
      },
    ]}
  >
    {async ([data]) => {
      'use server';

      if (!data.work.clients.items.length) {
        return null;
      }

      return (
        <Section className={cn('flex flex-col gap-8 px-4 py-8', 'sm:px-8')}>
          <ViewAnimation
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            className="px-4"
          >
            <p className="text-center text-muted-foreground text-sm">
              I've also worked with the following clients
            </p>
          </ViewAnimation>
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {data.work.clients.items
              .sort((a, b) => a._title.localeCompare(b._title))
              .map((client, index) => (
                <ViewAnimation
                  initial={{ opacity: 0, translateY: -8 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  delay={index * 0.1}
                  className={cn(
                    'inline-flex rounded-full border bg-background px-3 py-1.5 text-xs shadow-sm',
                    'sm:text-sm'
                  )}
                  key={client._title}
                >
                  {client.url ? (
                    <div className="flex items-center gap-1.5">
                      {client.url && (
                        <Image
                          src={`https://img.logo.dev/${new URL(client.url).hostname}?token=${env.NEXT_PUBLIC_LOGO_DEV_TOKEN}`}
                          alt=""
                          width={16}
                          height={16}
                        />
                      )}
                      {client._title}
                    </div>
                  ) : (
                    client._title
                  )}
                </ViewAnimation>
              ))}
          </div>
        </Section>
      );
    }}
  </Pump>
);
