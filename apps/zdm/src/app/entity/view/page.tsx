import { Menu } from '@/components/molecules/Menu/Menu';

const mainOptions = [
  {
    label: 'overview',
  },
  {
    label: 'connections',
  },
];

const extraOptions = [
  {
    label: 'assets',
  },
  {
    label: 'attributes',
  },
  {
    label: 'reminders',
  },
];

export default function EntityView() {
  return (
    <div>
      <div>
        <h1>Entity Name</h1>
      </div>
      <div>
        <span className="badge">tag</span>
      </div>
      <div>
        <span>location</span>
      </div>
      <div className="flex gap-2 justify-end">
        <button className="btn btn-secondary">Edit</button>
        <button className="btn btn-secondary">New Post</button>
      </div>
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <Menu options={mainOptions} />
          <Menu options={extraOptions} />
        </div>
        <div>middle bar</div>
        <div>right bar</div>
      </div>
    </div>
  );
}
