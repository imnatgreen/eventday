<script lang="ts">
  import { readable } from 'svelte/store';
  import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
  import { addSortBy } from 'svelte-headless-table/plugins';
  import * as Table from '$lib/components/ui/table';
  import { Button } from '$lib/components/ui/button';
  import ResultTableBadgeCell from '$lib/ResultTableBadgeCell.svelte';

  import { ArrowUpDown } from 'lucide-svelte';

  import type { ParkrunResult, ParkrunVolunteer } from '$lib/server/parkrun';
  import { titleCase } from '$lib/utils';

  export let results: ParkrunResult[];
  export let volunteers: ParkrunVolunteer[];

  const table = createTable(readable(results), {
    sort: addSortBy({
      initialSortKeys: [{ id: 'Time', order: 'asc' }]
    })
  });

  const columns = table.createColumns([
    table.column({
      header: '#',
      accessor: 'FinishPosition',
      plugins: {
        sort: {
          disable: true
        }
      }
    }),
    table.column({
      header: 'Time',
      accessor: (r) => r.RunTime.replace(/^00:/, ''),
      cell: ({ value, row }) => {
        if (row.isData()) {
          return createRender(ResultTableBadgeCell, {
            value,
            labels: row.original.GenuinePB ? [{ type: 'pb' }] : []
          });
        }
        return value;
      }
    }),
    table.column({
      header: 'Name',
      accessor: (r) => titleCase(`${r.FirstName} ${r.LastName}`),
      cell: ({ value, row }) => {
        if (row.isData()) {
          return createRender(ResultTableBadgeCell, {
            value: row.original.AthleteID == 2214 ? '' : value,
            labels: [
              ...(row.original.FirstTimer ? [{ type: 'firsttime' }] : []),
              ...(row.original.AthleteID == 2214 ? [{ type: 'unknown' }] : []),
              ...(row.original.JuniorClubMembership != 0
                ? [{ type: 'milestone', value: row.original.JuniorClubMembership.toString() }]
                : []),
              ...(row.original.JuniorRunTotal > 0
                ? [{ type: 'runs', value: row.original.JuniorRunTotal.toString() }]
                : []),
              ...(volunteers.find((v) => v.AthleteID == row.original.AthleteID)
                ? [{ type: 'volunteer' }]
                : [])
            ]
          });
        }
        return value;
      }
    }),
    table.column({
      header: 'Club',
      accessor: (r) => (r.ClubName != 'Unattached' ? r.ClubName : ''),
      plugins: {
        sort: {
          disable: true
        }
      }
    }),
    table.column({
      header: 'Age Category',
      accessor: (r) =>
        r.AthleteID == 2214
          ? ''
          : `${r.AgeCategory} (${r.AgeGrading.toLocaleString(undefined, {
              style: 'percent',
              minimumFractionDigits: 2
            })})`,
      plugins: {
        sort: {
          disable: true
        }
      }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-md border">
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                <Table.Head {...attrs}>
                  {#if !props.sort.disabled}
                    <button class="flex space-x-2 items-center" on:click={props.sort.toggle}>
                      <Render of={cell.render()} />
                      <ArrowUpDown class={'ml-2 h-4 w-4'} />
                    </button>
                  {:else}
                    <Render of={cell.render()} />
                  {/if}
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row {...rowAttrs}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell
                  class={`whitespace-nowrap ${
                    cell.id == 'Time' ? 'tabular-nums font-semibold' : ''
                  }`}
                  {...attrs}
                >
                  <Render of={cell.render()} />
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
