<script lang="ts">
  import Barcode from '$lib/Barcode.svelte';
  import { ChevronRight, Plus, Minus } from 'lucide-svelte';

  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';

  let tokenNumber: number;

  let paddedTokenNumber: string;
  $: if (tokenNumber) paddedTokenNumber = 'P' + tokenNumber.toString().padStart(4, '0');
</script>

<div class="mb-1 flex items-center space-x-1 text-sm text-muted-foreground sm:mb-4">
  <a href="/" class="overflow-hidden text-ellipsis whitespace-nowrap"> Home </a>
  <ChevronRight class="h-4 w-4" />
  <div class="font-medium text-foreground">Tokens</div>
</div>

<div class="flex max-w-[12rem] items-center space-x-2">
  <Input type="number" min={1} max={9999} placeholder="Token" bind:value={tokenNumber} />
  <Button
    class="w-10"
    variant="outline"
    on:click={() => {
      if (tokenNumber > 1) tokenNumber--;
      else tokenNumber = 1;
    }}><Minus class="h-5 w-5 shrink-0" /></Button
  >
  <Button
    class="w-10"
    variant="outline"
    on:click={() => {
      if (tokenNumber < 9999) tokenNumber++;
      else tokenNumber = 1;
    }}><Plus class="h-5 w-5 shrink-0" /></Button
  >
</div>

{#if tokenNumber}
  <div class="flex w-[180px] flex-col items-center">
    <Barcode
      value={paddedTokenNumber}
      options={{
        height: 85,
        text: ' '
      }}
    />
    <div class="text-md z-10 -mt-6 font-semibold">{paddedTokenNumber}</div>
  </div>
{/if}
