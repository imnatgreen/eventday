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

<div class="mb-1 sm:mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
  <a href="/" class="overflow-hidden text-ellipsis whitespace-nowrap"> Home </a>
  <ChevronRight class="h-4 w-4" />
  <div class="font-medium text-foreground">Event #{runId}</div>
</div>

<div class="grid grid-cols-1 sm:flex gap-2 sm:gap-3">
  <StatCard
    class="grow max-w-full sm:max-w-fit"
    title="Participants"
    stat={currentRun.NumberRunners}
    difference={differences.participants}
  >
    <PersonStanding slot="icon" class="h-4 w-4 text-muted-foreground" />
  </StatCard>
  <StatCard
    class="grow max-w-full sm:max-w-fit"
    title="Volunteers"
    stat={currentRun.NumberOfVolunteers}
    difference={differences.volunteers}
  >
    <HelpingHand slot="icon" class="h-4 w-4 text-muted-foreground" />
  </StatCard>
  <Card.Root class="grow max-w-full sm:max-w-fit">
    <Card.Header
      class="p-4 sm:p-6 pb-1 sm:pb-2 flex flex-row items-center justify-between space-y-0"
    >
      <Card.Title class="text-sm sm:text-md font-medium mr-4">Milestones</Card.Title>
      <Trophy class="h-4 w-4 text-muted-foreground" />
    </Card.Header>
    <Card.Content class="p-4 sm:p-6 pt-0 sm:pt-0 flex flex-col gap-1">
      <div class="text-3xl font-bold">4</div>
      <Dialog.Root>
        <Dialog.Trigger>
          <button
            class="hidden group text-xs sm:text-sm hover:underline sm:flex items-center gap-0.5"
          >
            Details
            <ArrowRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </Dialog.Trigger>
        <Dialog.Content class="max-w-md">
          <Dialog.Header>
            <Dialog.Title class="text-xl">Milestones</Dialog.Title>
          </Dialog.Header>
          <section class="prose prose-headings:mt-6">
            {#if milestones.half.length + milestones.full.length + milestones.ultra.length + milestones.hundred.length == 0}
              <p>No milestones were reached this week.</p>
            {/if}
            {#if milestones.half.length > 0}
              <h4>Half marathon (11 runs)</h4>
              <ul>
                {#each milestones.half as name}
                  <li>{name}</li>
                {/each}
              </ul>
            {/if}
            {#if milestones.full.length > 0}
              <h4>Marathon (21 runs)</h4>
              <ul>
                {#each milestones.full as name}
                  <li>{name}</li>
                {/each}
              </ul>
            {/if}
            {#if milestones.ultra.length > 0}
              <h4>Ultra marathon (50 runs)</h4>
              <ul>
                {#each milestones.ultra as name}
                  <li>{name}</li>
                {/each}
              </ul>
            {/if}
            {#if milestones.hundred.length > 0}
              <h4>100 junior parkruns</h4>
              <ul>
                {#each milestones.hundred as name}
                  <li>{name}</li>
                {/each}
              </ul>
            {/if}
          </section>
        </Dialog.Content>
      </Dialog.Root>
      <Drawer.Root>
        <Drawer.Trigger>
          <button
            class="group text-xs sm:text-sm hover:underline flex sm:hidden items-center gap-0.5"
          >
            Details
            <ArrowRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </Drawer.Trigger>
        <Drawer.Content>
          <div class="mx-auto w-full max-w-md">
            <Drawer.Header>
              <Drawer.Title class="text-xl text-left">Milestones</Drawer.Title>
            </Drawer.Header>
            <section class="prose prose-headings:mt-6 mx-4 mb-12 w-full max-w-sm text-left">
              {#if milestones.half.length + milestones.full.length + milestones.ultra.length + milestones.hundred.length == 0}
                <p>No milestones were reached this week.</p>
              {/if}
              {#if milestones.half.length > 0}
                <h4>Half marathon (11 runs)</h4>
                <ul>
                  {#each milestones.half as name}
                    <li>{name}</li>
                  {/each}
                </ul>
              {/if}
              {#if milestones.full.length > 0}
                <h4>Marathon (21 runs)</h4>
                <ul>
                  {#each milestones.full as name}
                    <li>{name}</li>
                  {/each}
                </ul>
              {/if}
              {#if milestones.ultra.length > 0}
                <h4>Ultra marathon (50 runs)</h4>
                <ul>
                  {#each milestones.ultra as name}
                    <li>{name}</li>
                  {/each}
                </ul>
              {/if}
              {#if milestones.hundred.length > 0}
                <h4>100 junior parkruns</h4>
                <ul>
                  {#each milestones.hundred as name}
                    <li>{name}</li>
                  {/each}
                </ul>
              {/if}
            </section>
          </div>
        </Drawer.Content>
      </Drawer.Root>
    </Card.Content>
  </Card.Root>
</div>

<section class="prose">
  {#if milestones.half.length + milestones.full.length + milestones.ultra.length + milestones.hundred.length == 0}
    <p>No milestones were reached this week.</p>
  {/if}
  {#if milestones.half.length > 0}
    <h3>Half marathon (11 runs)</h3>
    <ul>
      {#each milestones.half as name}
        <li>{name}</li>
      {/each}
    </ul>
  {/if}
  {#if milestones.full.length > 0}
    <h3>Marathon (21 runs)</h3>
    <ul>
      {#each milestones.full as name}
        <li>{name}</li>
      {/each}
    </ul>
  {/if}
  {#if milestones.ultra.length > 0}
    <h3>Ultra marathon (50 runs)</h3>
    <ul>
      {#each milestones.ultra as name}
        <li>{name}</li>
      {/each}
    </ul>
  {/if}
  {#if milestones.hundred.length > 0}
    <h3>100 junior parkruns</h3>
    <ul>
      {#each milestones.hundred as name}
        <li>{name}</li>
      {/each}
    </ul>
  {/if}
</section>

<Button class="max-w-fit px-8" href={`${runId}/report`}>Generate run report</Button>

<ResultTable results={data.results} volunteers={data.volunteers} />
