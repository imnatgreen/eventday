<script lang="ts">
  import { cn } from '$lib/utils';
  import type { ParkrunRunReport, ParkrunRunReportMilestones } from './server/parkrun';

  let className: string | undefined = undefined;
  export { className as class };

  export let report: ParkrunRunReport;

  const listFormatter = new Intl.ListFormat('en', { style: 'long' });

  const milestoneCount = (m: ParkrunRunReportMilestones) => {
    return m.half.length + m.full.length + m.ultra.length + m[100].length + m[250].length;
  };
  const milestoneText = (m: ParkrunRunReportMilestones) => {
    return `${
      m.half.length > 0 ? '🔵 Half marathon (11 runs) — ' + listFormatter.format(m.half) : ''
    }
${m.full.length > 0 ? '🟢 Marathon (21 runs) — ' + listFormatter.format(m.full) : ''}
${m.ultra.length > 0 ? '🟠 Ultra marathon (50 runs) — ' + listFormatter.format(m.ultra) : ''}
${m[100].length > 0 ? '⚫️ 100 junior parkruns — ' + listFormatter.format(m[100]) : ''}
${m[250].length > 0 ? '🟡 250 junior parkruns — ' + listFormatter.format(m[250]) : ''}`.replace(
      /^\s*[\r\n]/gm,
      ''
    );
  };

  export let content: HTMLElement | undefined = undefined;
</script>

<div
  class={cn(
    'h-fit min-h-[80px] w-full select-all rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    className
  )}
>
  {#await report}
    <p>Loading...</p>
  {:then data}
    <div class="[&>p]:mb-4" bind:this={content}>
      <p>Burnley junior parkrun #{data.id}</p>

      <p>
        {data.participants} children joined us this morning to run, jog, skip, hop or walk our 2km course
        at Towneley Park.
      </p>

      {#if data.firstTimers.length > 0}
        <p>
          {data.firstTimers.length}
          {data.firstTimers.length > 1 ? 'children' : 'child'} joined us for the first time this morning.
          A warm welcome to {listFormatter.format(data.firstTimers)} 👋 We hope to see you again next
          week!
        </p>
      {/if}

      {#if data.newPBs.length > 0}
        <p>
          {data.newPBs.length}
          {data.newPBs.length > 1 ? 'children' : 'child'} achieved a new PB today 🌟
          <br />
          Congratulations to {listFormatter.format(data.newPBs)}.
        </p>
      {/if}
      {#if milestoneCount(data.milestones) > 0}
        <p>
          {milestoneCount(data.milestones)}
          {milestoneCount(data.milestones) > 1
            ? 'children reached milestones'
            : 'child reached a milestone'} this morning, well done!
          <br />
          <span class="whitespace-pre-wrap">{milestoneText(data.milestones)}</span>
        </p>
        <p>
          We'll call {milestoneCount(data.milestones) > 1 ? 'these' : 'this'} out next week and you'll
          get a wristband. We only call these out once, so if you think you've missed a milestone band,
          let us know and we can call it out the next time you come.
        </p>
      {/if}
      <p>
        If you have a milestone coming up, let us know. We have vests to celebrate the 50th & 100th
        runs & also a birthday one.
      </p>

      <p>
        As always, today's event wouldn't have been possible without our fabulous volunteers. A
        massive thanks to {listFormatter.format(data.volunteers)}.
      </p>

      <p>
        📢 Do you know someone who'd love junior parkrun? Tell your friends, spread the word about
        us. 👬👫👭
      </p>

      <p>Link to the results: https://www.parkrun.org.uk/burnley-juniors/results/{data.id}/</p>

      <p>#loveparkrun #parkrunfamily</p>
    </div>
  {/await}
</div>
