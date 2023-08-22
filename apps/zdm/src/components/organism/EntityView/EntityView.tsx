import { component$ } from '@builder.io/qwik';
import ListGroupItem from '~/components/atom/ListGroupItem/ListGroupItem';

export default component$(() => {
  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col-3 min-h-[200px] min-w-[200px]">
            <figure class="figure">
              <img
                src="https://th.kanka.io/UFt-ZaQ-polimHUVt-tR0G7s9hw=/400x400/smart/src/locations/zMjz8IwIxvuQTGg7AbOM72kHofp0IEFuiMb95iQM.png"
                width="200"
                height="200"
                alt="entity view"
              />
            </figure>
          </div>
          <div class="col-9">
            <div>
              <span>entity parent name</span>
              <h1>Entity Name</h1>
              <span>description</span>
            </div>
            <div class="flex justify-content-end">
              <button class="btn btn-primary">edit</button>
              <button class="btn btn-secondary">new post</button>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-3">
            <div class="list-group max-w-[200px]">
              <ListGroupItem>Overview</ListGroupItem>
              <ListGroupItem>Connections</ListGroupItem>
            </div>
            <div class="list-group max-w-[200px]">
              <ListGroupItem>Assets</ListGroupItem>
              <ListGroupItem>Attributes</ListGroupItem>
              <ListGroupItem>Reminders</ListGroupItem>
            </div>
            <div class="list-group max-w-[200px]">
              <ListGroupItem>Mentions</ListGroupItem>
            </div>
          </div>
          <div class="col-7">posts</div>
          <div class="col-2">pins</div>
        </div>
      </div>
    </div>
  );
});
