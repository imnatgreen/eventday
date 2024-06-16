<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import type { PageServerData } from './$types';

  export let data: PageServerData;
</script>

<div class="max-w-2xl rounded-md border bg-white">
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head class="">Username</Table.Head>
        <Table.Head>Enabled</Table.Head>
        <Table.Head>Role</Table.Head>
        <Table.Head>Reset pass</Table.Head>
        <Table.Head />
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data.users as user}
        <Table.Row>
          <Table.Cell class="font-medium">
            <form id={user.id} method="POST">
              <input type="hidden" name="id" value={user.id} />
            </form>
            {user.username}
          </Table.Cell>
          <Table.Cell>
            <button form={user.id} formaction="?/toggleEnabled">
              {user.is_enabled ? 'Yes' : 'No'}
            </button>
          </Table.Cell>
          <Table.Cell>
            <button form={user.id} formaction="?/toggleAdmin">
              {user.is_admin ? 'Admin' : 'User'}
            </button>
          </Table.Cell>
          <Table.Cell>
            <button form={user.id} formaction="?/toggleResetNextLogin">
              {user.reset_next_login ? 'Yes' : 'No'}
            </button>
          </Table.Cell>
          <Table.Cell>
            <button form={user.id} class="rounded-md bg-red-100 p-1" formaction="?/delete">
              Delete
            </button>
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
