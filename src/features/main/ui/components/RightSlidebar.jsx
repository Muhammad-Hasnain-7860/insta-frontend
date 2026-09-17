import PeopleToFollow from './PeopleToFollow'

export default function RightSidebar() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-[100px]">
        <PeopleToFollow />
      </div>
    </aside>
  );
}