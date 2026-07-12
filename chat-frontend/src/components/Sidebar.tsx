import type { Dispatch, SetStateAction } from "react";

interface Props {
  userList: string[];
  userSearch: string;
  setUserSearch: Dispatch<SetStateAction<string>>;
  onlineCount: number;
  totalUsers: number;
  onLogout: () => void;
}

const Sidebar = ({
  userList,
  userSearch,
  setUserSearch,
  onlineCount,
  totalUsers,
  onLogout,
}: Props) => {
  return (
    <div className="hidden md:flex h-full w-full max-w-[150px] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-4 text-slate-100 shadow-sm">
      <div className="mb-4 shrink-0 border-b border-slate-700 pb-4">
        <h2 className="text-xs font-semibold tracking-[0.24em] text-slate-400">ChitChat</h2>
        <p className="mt-2 text-xl font-thin">Users</p>
        <span className="mt-2 inline-flex rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-300">
          {onlineCount}/{totalUsers}
        </span>
      </div>

      <div className="mb-4 shrink-0">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
          Search
        </label>
        <input
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          placeholder="Search username"
          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {userList.length === 0 ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-400">
            No users found.
          </div>
        ) : (
          <div className="space-y-2">
            {userList.map((username) => (
              <div
                key={username}
                className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-100"
              >
                {username}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 shrink-0 border-t border-slate-700 pt-3">
        <button
          type="button"
          onClick={onLogout}
          className="w-full rounded-2xl bg-rose-600/90 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
