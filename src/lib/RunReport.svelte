<script lang="ts">
  import { cn } from "$lib/utils";

  let className: string | undefined = undefined;
  export { className as class };

  export let report: ParkrunRunReport;

  const listFormatter = new Intl.ListFormat('en', { style: 'long' });

  const milestoneText = (m: ParkrunRunReportMilestones) => {
    return `${m.half.length > 0 ? '🔵 Half marathon (11 runs) — '+listFormatter.format(m.half) : ''}
${m.full.length > 0 ? '🟢 Full marathon (21 runs) — '+listFormatter.format(m.full) : ''}
${m.ultra.length > 0 ? '🟠 Ultra marathon (50 runs) — '+listFormatter.format(m.ultra) : ''}
${m.hundred.length > 0 ? '⚫️ 100 junior parkruns — '+listFormatter.format(m.hundred) : ''}`.replace(/^\s*[\r\n]/gm, '');
  }

  export let content: HTMLElement | undefined = undefined;
</script>

<div class={cn("select-all h-fit min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>
{#await report}
<p>Loading...</p>
{:then data} 
<div bind:this={content}>
  <p>Burnley junior parkrun #{data.id}</p>
  <br>
  <p>{data.participants} incredible children joined us this morning to run, jog, skip, hop or walk our 2km course at Towneley Park.</p>
  <br>
  <p>{data.firstTimers.length} children joined us for the first time this morning. A warm welcome to {listFormatter.format(data.firstTimers)} 👋 We hope to see you again next week!</p> 
  <br>
  <p>{data.newPBs.length} children achieved a new PB today 🌟</p>
  <p>Congratulations to {listFormatter.format(data.newPBs)}.</p>
  <br>
  <p>4 children reached milestones this morning, well done!</p>  
  <p class="whitespace-pre-wrap">{milestoneText(data.milestones)}</p>
  <p>We'll call these out next week and you'll get a wristband. We only call these out once, so if you think you've missed a milestone band, let us know and we can call it out the next time you come.</p>
  <br>
  <p>If you have a milestone coming up, let us know. We have vests to celebrate the 50th & 100th runs & also a birthday one.</p>
  <br>
  <p>As always, today's event wouldn't have been possible without our fabulous volunteers. A massive thanks to {listFormatter.format(data.volunteers)}.</p>
  <br>
  <p>📢 Do you know someone who'd love junior parkrun? Tell your friends, spread the word about us. 👬👫👭</p>
  <br>
  <p>Link to the results: https://www.parkrun.org.uk/burnley-juniors/results/{data.id}/</p>
  <br>
  <p>#loveparkrun #parkrunfamily</p>
</div>
{/await}
</div>