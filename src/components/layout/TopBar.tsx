import NavPopover from "@/components/composed/NavPopover";
import { GITHUB_PROFILE_URL } from "@/lib/github";

export default function TopBar() {
  return (
    <div className="flex h-8 shrink-0 items-center justify-between mx-3 mt-1 text-xs text-neutral-300">
      <NavPopover githubUrl={GITHUB_PROFILE_URL} />
    </div>
  );
}
