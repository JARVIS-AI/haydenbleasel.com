import { Prose } from '@/components/prose';
import { Button } from '@/components/ui/button';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';

export const Apps = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      queries={[
        {
          __typename: true,
          projects: {
            apps: {
              items: {
                _title: true,
                description: true,
                image: {
                  width: true,
                  height: true,
                  url: true,
                  alt: true,
                },
                url: true,
              },
            },
          },
        },
      ]}
      draft={isEnabled}
    >
      {async ([data]) => {
        'use server';

        return data.projects.apps.items.map((app) => (
          <div key={app._title} className="grid grid-cols-2 divide-x">
            <div className="p-8">
              <h3 className="font-semibold text-lg">{app._title}</h3>
              <Prose className="prose-sm">
                <p>{app.description}</p>
              </Prose>
              <Button asChild variant="outline">
                <a href={app.url} target="_blank" rel="noreferrer noopener">
                  View App
                </a>
              </Button>
            </div>
            <div>
              <div className="aspect-video w-full bg-muted-foreground" />
            </div>
          </div>
        ));
      }}
    </Pump>
  );
};
