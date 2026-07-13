import type { Dispatch, SetStateAction } from "react";

interface Props {
  userList: string[];
  userSearch: string;
  setUserSearch: Dispatch<SetStateAction<string>>;
  onlineCount: number;
  totalUsers: number;
  onLogout: () => void;
  // mobile drawer control
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({
  userList,
  userSearch,
  setUserSearch,
  onlineCount,
  totalUsers,
  onLogout,
  isOpen = false,
  onClose,
}: Props) => {
  return (
    <>
      {/* Desktop / tablet sidebar */}
      <div className="hidden md:flex md:h-full h-auto w-full max-w-[150px] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-4 text-slate-100 shadow-sm">
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

      {/* Mobile drawer (slide-in) */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900 p-4 text-slate-100 shadow-lg transition-transform duration-200 ease-in-out rounded-r-2xl border-r border-slate-700 flex flex-col h-full ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-semibold tracking-[0.24em] text-slate-400">ChitChat</h2>
            <p className="mt-2 text-xl font-thin">Users</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="ml-2 rounded-md bg-slate-800 p-2 text-slate-200 hover:bg-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
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
            onClick={() => {
              onLogout();
              onClose && onClose();
            }}
            className="w-full rounded-2xl bg-rose-600/90 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500"
          >
            Logout
          </button>
        </div>
      </div>

      {/* backdrop for mobile when open */}
      {isOpen && <div className="md:hidden fixed inset-0 z-30 bg-black/50" onClick={onClose} />}

    </>
  );
};

export default Sidebar;
