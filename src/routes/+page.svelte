<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as Command from '$lib/components/ui/command';
  import * as Popover from '$lib/components/ui/popover';
  import { CalendarClock } from 'lucide-svelte';
  import ConditionalWrapper from '$lib/ConditionalWrapper.svelte';

  import type { LayoutServerData } from './$types';
  import { tick } from 'svelte';

  export let data: LayoutServerData;

  let eventSelectorOpen = false;
  let currentEventSearch = '';
  const closeAndFocusTrigger = (triggerId: string) => {
    eventSelectorOpen = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  };
</script>

<section class="flex flex-col gap-4">
  <h2 class="text-2xl font-normal">Events</h2>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-3 gap-y-3">
    {#each data.runs.slice(0, 6) as run, index}
      <ConditionalWrapper a condition={index != 5} href={`/event/${run.RunId}`}>
        <ConditionalWrapper condition={index == 5} class="relative">
          <Card.Root
            class="hover:shadow-md hover:-translate-y-1 hover:bg-gray-50 transition duration-300 ease-in-out"
          >
            <Card.Header>
              <Card.Title class="text-2xl">#{run.RunId}</Card.Title>
              <Card.Description>{run.EventDate}</Card.Description>
            </Card.Header>
          </Card.Root>
          {#if index == 5}
            <div
              class="absolute w-full h-full top-0 left-0 z-20 flex items-center justify-center max-w-full p-4"
            >
              <Popover.Root bind:open={eventSelectorOpen} let:ids>
                <Popover.Trigger asChild let:builder>
                  <Button
                    builders={[builder]}
                    aria-expanded={eventSelectorOpen}
                    role="combobox"
                    variant="outline"
                    size="sm"
                    class="font-normal shadow-md pointer-events-auto hover:shadow-lg hover:-translate-y-[0.125rem] transition duration-300 ease-in-out"
                  >
                    <span class="inline sm:hidden md:inline xl:hidden">More</span>
                    <span class="hidden sm:inline md:hidden xl:inline">Go back further</span>
                    <CalendarClock class="ml-2 -mr-1 h-4 w-4 shrink-0 opacity-95" />
                  </Button>
                </Popover.Trigger>
                <Popover.Content class="w-[200px] p-0">
                  <Command.Root class="max-h-[min(15rem,80vh)]" shouldFilter={false}>
                    <Command.Input
                      autofocus
                      placeholder="Search events..."
                      bind:value={currentEventSearch}
                    />
                    <Command.Empty>No events found.</Command.Empty>
                    <Command.Group class="overflow-auto overscroll-contain">
                      {#each data.runs.slice(5).filter((r) => {
                        return `${r.RunId} ${r.EventDate}`.includes(currentEventSearch) || currentEventSearch == '';
                      }) as run}
                        <Command.Item
                          value={`${run.RunId} ${run.EventDate}`}
                          onSelect={() => {
                            closeAndFocusTrigger(ids.trigger);
                          }}
                          class="p-0"
                        >
                          <a class="px-2 py-1.5 w-full" href={`/event/${run.RunId}`}
                            >#{run.RunId} – {run.EventDate}</a
                          >
                        </Command.Item>
                      {/each}
                    </Command.Group>
                  </Command.Root>
                </Popover.Content>
              </Popover.Root>
            </div>
            <div
              class="progressive-bg-blur-right absolute w-[calc(100%+1rem)] h-[calc(100%+1rem)] -top-2 -left-2 z-10 p-2"
            />
          {/if}
        </ConditionalWrapper>
      </ConditionalWrapper>
    {/each}
  </div>
</section>

<section class="flex flex-col gap-4 pt-6">
  <h2 class="text-2xl font-normal">Tools</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3">
    <a href={`/tokens`}>
      <Card.Root
        class="hover:shadow-md hover:-translate-y-1 hover:bg-gray-50 transition duration-300 ease-in-out"
      >
        <Card.Header>
          <Card.Title class="text-2xl">Tokens</Card.Title>
          <Card.Description>Create emergency finish tokens on the go.</Card.Description>
        </Card.Header>
      </Card.Root>
    </a>
  </div>
</section>

<style>
  .progressive-bg-blur-right {
    backdrop-filter: blur(3px);
    background: rgba(255, 255, 255, 1);
    mask: linear-gradient(
      to left,
      hsl(0, 0%, 0%) 70%,
      hsla(0, 0%, 0%, 0.738) 75.7%,
      hsla(0, 0%, 0%, 0.541) 80.2%,
      hsla(0, 0%, 0%, 0.382) 84.1%,
      hsla(0, 0%, 0%, 0.278) 86.95%,
      hsla(0, 0%, 0%, 0.194) 89.5%
    );
  }
</style>
