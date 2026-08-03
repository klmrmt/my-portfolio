import BrainApp from "./BrainApp";
import { brainAuthIsConfigured, hasValidBrainSession } from "./auth";

export const dynamic = "force-dynamic";

type BrainPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function BrainPage({ searchParams }: BrainPageProps) {
  const isUnlocked = await hasValidBrainSession();
  if (isUnlocked) return <BrainApp />;

  const { error } = await searchParams;
  const isConfigured = brainAuthIsConfigured();

  return (
    <main className="brain-gate">
      <section className="brain-gate-card" aria-labelledby="brain-gate-title">
        <div className="brain-gate-mark" aria-hidden="true">
          M
        </div>
        <p className="brain-gate-kicker">Private workspace</p>
        <h1 id="brain-gate-title">Welcome back, Kyle.</h1>
        <p className="brain-gate-copy">
          Your career plans, routines, and everyday tasks live behind this lock.
        </p>

        {!isConfigured ? (
          <div className="brain-gate-message" role="status">
            This private space is waiting for its password to be configured.
          </div>
        ) : (
          <form className="brain-gate-form" action="/brain/api" method="post">
            <input type="hidden" name="intent" value="unlock" />
            <label htmlFor="brain-password">Password</label>
            <input
              id="brain-password"
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              required
            />
            {error === "password" && (
              <p className="brain-gate-error" role="alert">
                That password didn’t work. Try again.
              </p>
            )}
            {error === "configuration" && (
              <p className="brain-gate-error" role="alert">
                The private space is not configured yet.
              </p>
            )}
            <label className="remember-device">
              <input type="checkbox" name="remember" defaultChecked />
              <span>
                <strong>Remember this device</strong>
                <small>Stay unlocked for 30 days.</small>
              </span>
            </label>
            <button type="submit" className="brain-unlock-button">
              Unlock my brain <span aria-hidden="true">→</span>
            </button>
          </form>
        )}

        <p className="brain-gate-note">Protected with an encrypted device session.</p>
      </section>
    </main>
  );
}

