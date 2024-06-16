<script lang="ts">
  import { page } from '$app/stores';
  import { error } from '@sveltejs/kit';

  import type { PageData } from './$types';

  import StatCard from '$lib/StatCard.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Drawer from '$lib/components/ui/drawer';

  import { ChevronRight, PersonStanding, HelpingHand, Trophy, ArrowRight } from 'lucide-svelte';
  import ResultTable from '$lib/ResultTable.svelte';

  import { getResultNamesByCondition } from '$lib/utils';
  import MilestoneProse from '$lib/MilestoneProse.svelte';

  export let data: PageData;

  const runId = Number.parseInt($page.params.slug);

  const currentRun = data.runs.find((r) => r.RunId == runId);
  if (!currentRun) {
    throw error(404, `Run #${runId} not found. Only the 100 most recent runs are available.`);
  }

  const previousRun = data.runs.find((r) => r.RunId == runId - 1);
  const differences = previousRun
    ? {
        participants: currentRun.NumberRunners - previousRun.NumberRunners,
        volunteers: currentRun.NumberOfVolunteers - previousRun.NumberOfVolunteers
      }
    : { participants: 0, volunteers: 0 };

  const milestones = {
    half: getResultNamesByCondition(data.results, (r) => r.JuniorRunTotal == 11, false),
    full: getResultNamesByCondition(data.results, (r) => r.JuniorRunTotal == 21, false),
    ultra: getResultNamesByCondition(data.results, (r) => r.JuniorRunTotal == 50, false),
    hundred: getResultNamesByCondition(data.results, (r) => r.JuniorRunTotal == 100, false)
  };
</script>

<div class="mb-1 flex items-center space-x-1 text-sm text-muted-foreground sm:mb-4">
  <a href="/" class="overflow-hidden text-ellipsis whitespace-nowrap"> Home </a>
  <ChevronRight class="h-4 w-4" />
  <div class="font-medium text-foreground">Event #{runId}</div>
</div>

<div class="grid grid-cols-1 gap-2 sm:flex sm:gap-3">
  <StatCard
    class="max-w-full grow sm:max-w-fit"
    title="Participants"
    stat={currentRun.NumberRunners}
    difference={differences.participants}
  >
    <PersonStanding slot="icon" class="h-4 w-4 text-muted-foreground" />
  </StatCard>
  <StatCard
    class="max-w-full grow sm:max-w-fit"
    title="Volunteers"
    stat={currentRun.NumberOfVolunteers}
    difference={differences.volunteers}
  >
    <HelpingHand slot="icon" class="h-4 w-4 text-muted-foreground" />
  </StatCard>
  <Card.Root class="max-w-full grow sm:max-w-fit">
    <Card.Header
      class="flex flex-row items-center justify-between space-y-0 p-4 pb-1 sm:p-6 sm:pb-2"
    >
      <Card.Title class="sm:text-md mr-4 text-sm font-medium">Milestones</Card.Title>
      <Trophy class="h-4 w-4 text-muted-foreground" />
    </Card.Header>
    <Card.Content class="flex flex-col gap-1 p-4 pt-0 sm:p-6 sm:pt-0">
      <div class="text-3xl font-bold">
        {milestones.full.length +
          milestones.half.length +
          milestones.hundred.length +
          milestones.ultra.length}
      </div>
      <div class="hidden sm:flex">
        <Dialog.Root>
          <Dialog.Trigger>
            <button class="group flex items-center gap-0.5 text-xs hover:underline sm:text-sm">
              Details
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Content class="max-w-md">
            <Dialog.Header>
              <Dialog.Title class="text-xl">Milestones</Dialog.Title>
            </Dialog.Header>
            <MilestoneProse {milestones} />
          </Dialog.Content>
        </Dialog.Root>
      </div>
      <div class="flex sm:hidden">
        <Drawer.Root>
          <Drawer.Trigger>
            <button class="group flex items-center gap-0.5 text-xs hover:underline sm:text-sm">
              Details
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Drawer.Trigger>
          <Drawer.Content>
            <div class="mx-auto w-full max-w-md">
              <Drawer.Header>
                <Drawer.Title class="text-left text-xl">Milestones</Drawer.Title>
              </Drawer.Header>
              <MilestoneProse {milestones} drawer={true} />
            </div>
          </Drawer.Content>
        </Drawer.Root>
      </div>
    </Card.Content>
  </Card.Root>
</div>

<Button class="max-w-fit px-8" href={`${runId}/report`}>Generate run report</Button>

<ResultTable results={data.results} volunteers={data.volunteers} />
