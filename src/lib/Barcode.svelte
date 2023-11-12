<script lang="ts">
  import { onMount } from 'svelte';
  import JsBarcode from 'jsbarcode';

  import type { BaseOptions as BarcodeOptions } from 'jsbarcode';

  let barcode: Element;
  let rendered = false;
  export let value: string;
  export let options: BarcodeOptions = {};

  onMount(() => {
    rendered = true;
  });

  $: if (rendered) JsBarcode(barcode, value, options);
  
</script>

<svg bind:this={barcode}></svg>