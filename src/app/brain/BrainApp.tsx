"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

type SpaceId = "career" | "life" | "tasks";
type ViewId = "today" | SpaceId;
type ApplicationStage = "saved" | "applied" | "interview" | "offer";

type FocusItem = {
  id: string;
  number: string;
  title: string;
  meta: string;
  space: SpaceId;
  completed: boolean;
};

type Task = {
  id: string;
  title: string;
  space: SpaceId;
  completed: boolean;
  timing: string;
};

type Routine = {
  id: string;
  title: string;
  area: string;
  cadence: string;
  progress: string;
  completed: boolean;
};

type Application = {
  id: string;
  company: string;
  role: string;
  stage: ApplicationStage;
  note: string;
};

type Project = {
  id: string;
  title: string;
  nextAction: string;
  completed: number;
  total: number;
};

const initialFocus: FocusItem[] = [
  {
    id: "focus-resume",
    number: "01",
    title: "Rewrite my résumé opening",
    meta: "Career · 10:00 AM · 45 min",
    space: "career",
    completed: false,
  },
  {
    id: "focus-walk",
    number: "02",
    title: "Walk outside for 30 minutes",
    meta: "Life · Anytime · Fresh air",
    space: "life",
    completed: false,
  },
  {
    id: "focus-dentist",
    number: "03",
    title: "Schedule the dentist appointment",
    meta: "Tasks · Due today · 5 min",
    space: "tasks",
    completed: false,
  },
];

const initialTasks: Task[] = [
  {
    id: "task-groceries",
    title: "Order groceries",
    space: "tasks",
    completed: false,
    timing: "Today",
  },
  {
    id: "task-bed",
    title: "Make the bed",
    space: "life",
    completed: true,
    timing: "Daily",
  },
  {
    id: "task-target-roles",
    title: "Review target roles",
    space: "career",
    completed: false,
    timing: "Today",
  },
  {
    id: "task-phone-plans",
    title: "Compare phone plans",
    space: "tasks",
    completed: false,
    timing: "Yesterday",
  },
  {
    id: "task-library",
    title: "Return the library books",
    space: "tasks",
    completed: false,
    timing: "4:30 PM",
  },
];

const initialRoutines: Routine[] = [
  {
    id: "routine-walk",
    title: "30-minute walk",
    area: "Health",
    cadence: "Daily",
    progress: "4 / 7",
    completed: false,
  },
  {
    id: "routine-read",
    title: "Read 20 minutes",
    area: "Personal growth",
    cadence: "4× weekly",
    progress: "2 / 4",
    completed: false,
  },
  {
    id: "routine-reset",
    title: "Ten-minute home reset",
    area: "Home",
    cadence: "Daily",
    progress: "5 / 7",
    completed: true,
  },
];

const initialApplications: Application[] = [
  {
    id: "app-northstar",
    company: "Northstar Labs",
    role: "Target role",
    stage: "saved",
    note: "Remote",
  },
  {
    id: "app-lumen",
    company: "Lumen Studio",
    role: "Target role",
    stage: "applied",
    note: "Applied Jul 30",
  },
  {
    id: "app-paper",
    company: "Paper & Co.",
    role: "Target role",
    stage: "interview",
    note: "First call · Tuesday",
  },
];

const initialProjects: Project[] = [
  {
    id: "project-trip",
    title: "Plan fall trip",
    nextAction: "Book the hotel",
    completed: 3,
    total: 8,
  },
  {
    id: "project-bedroom",
    title: "Refresh the bedroom",
    nextAction: "Choose paint",
    completed: 2,
    total: 6,
  },
  {
    id: "project-admin",
    title: "Personal admin",
    nextAction: "File receipts",
    completed: 5,
    total: 7,
  },
];

const navItems: Array<{
  id: ViewId;
  label: string;
  symbol: string;
}> = [
  { id: "today", label: "Today", symbol: "☼" },
  { id: "career", label: "Career", symbol: "↗" },
  { id: "life", label: "Life", symbol: "♡" },
  { id: "tasks", label: "Tasks", symbol: "✓" },
];

const applicationStages: Array<{
  id: ApplicationStage;
  label: string;
}> = [
  { id: "saved", label: "Saved" },
  { id: "applied", label: "Applied" },
  { id: "interview", label: "Interview" },
  { id: "offer", label: "Offer" },
];

const careerSteps = ["Prepare", "Search", "Apply", "Interview"];

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function useStoredState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) setValue(JSON.parse(stored) as T);
    } catch {
      // If local storage is unavailable, the app still works for this session.
    } finally {
      setHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Keep the in-memory state if storage is unavailable.
    }
  }, [hydrated, key, value]);

  return [value, setValue] as const;
}

function Check({ checked }: { checked: boolean }) {
  return <span className="check-mark" aria-hidden="true">{checked ? "✓" : ""}</span>;
}

export default function BrainApp() {
  const [view, setView] = useState<ViewId>("today");
  const [focus, setFocus] = useStoredState("morrow-focus", initialFocus);
  const [tasks, setTasks] = useStoredState("morrow-tasks", initialTasks);
  const [routines, setRoutines] = useStoredState(
    "morrow-routines",
    initialRoutines,
  );
  const [applications, setApplications] = useStoredState(
    "morrow-applications",
    initialApplications,
  );
  const [projects, setProjects] = useStoredState(
    "morrow-projects",
    initialProjects,
  );
  const [showCapture, setShowCapture] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showRoutineForm, setShowRoutineForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [careerStep, setCareerStep] = useState(0);
  const [dateLabel, setDateLabel] = useState("Sunday, August 2");
  const [shortDate, setShortDate] = useState({ day: "02", month: "August" });
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const now = new Date();
    setDateLabel(
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(now),
    );
    setShortDate({
      day: String(now.getDate()).padStart(2, "0"),
      month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(now),
    });
    const hour = now.getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening");
  }, []);

  const focusDone = focus.filter((item) => item.completed).length;
  const todayTasks = tasks.filter((task) =>
    ["task-groceries", "task-bed", "task-target-roles"].includes(task.id) ||
    task.id.startsWith("captured-"),
  );
  const completedCount =
    focusDone +
    todayTasks.filter((task) => task.completed).length +
    routines.filter((routine) => routine.completed).length;
  const trackableCount = focus.length + todayTasks.length + routines.length;
  const momentum = Math.round((completedCount / Math.max(trackableCount, 1)) * 100);

  const applicationsByStage = useMemo(
    () =>
      applicationStages.reduce<Record<ApplicationStage, Application[]>>(
        (grouped, stage) => {
          grouped[stage.id] = applications.filter(
            (application) => application.stage === stage.id,
          );
          return grouped;
        },
        { saved: [], applied: [], interview: [], offer: [] },
      ),
    [applications],
  );

  function toggleFocus(id: string) {
    setFocus((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function toggleTask(id: string) {
    setTasks((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function toggleRoutine(id: string) {
    setRoutines((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const space = String(form.get("space") ?? "tasks") as SpaceId;
    if (!title) return;
    setTasks((items) => [
      ...items,
      {
        id: makeId("captured"),
        title,
        space,
        completed: false,
        timing: "Today",
      },
    ]);
    event.currentTarget.reset();
    setShowCapture(false);
  }

  function addApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const company = String(form.get("company") ?? "").trim();
    const role = String(form.get("role") ?? "").trim();
    const stage = String(form.get("stage") ?? "saved") as ApplicationStage;
    if (!company || !role) return;
    setApplications((items) => [
      ...items,
      {
        id: makeId("application"),
        company,
        role,
        stage,
        note: stage === "applied" ? "Applied today" : "Added today",
      },
    ]);
    event.currentTarget.reset();
    setShowApplicationForm(false);
  }

  function addRoutine(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const area = String(form.get("area") ?? "Health");
    const cadence = String(form.get("cadence") ?? "Daily");
    if (!title) return;
    setRoutines((items) => [
      ...items,
      {
        id: makeId("routine"),
        title,
        area,
        cadence,
        progress: "0 / 1",
        completed: false,
      },
    ]);
    event.currentTarget.reset();
    setShowRoutineForm(false);
  }

  function addProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const nextAction = String(form.get("nextAction") ?? "").trim();
    if (!title || !nextAction) return;
    setProjects((items) => [
      ...items,
      {
        id: makeId("project"),
        title,
        nextAction,
        completed: 0,
        total: 1,
      },
    ]);
    event.currentTarget.reset();
    setShowProjectForm(false);
  }

  return (
    <div className="site-shell">
      <div className="app-window">
        <div className="titlebar">
          <div className="traffic-lights" aria-hidden="true">
            <span className="traffic-red" />
            <span className="traffic-yellow" />
            <span className="traffic-green" />
          </div>
          <div className="window-title">☁ Morrow · My workspace</div>
          <div className="sync-status">
            <span /> Saved on this device
            <form action="/brain/api" method="post">
              <input type="hidden" name="intent" value="lock" />
              <button type="submit" className="brain-lock-button">Lock</button>
            </form>
          </div>
        </div>

        <div className="app-body">
          <aside className="sidebar">
            <div className="brand">
              <span className="brand-mark" aria-hidden="true">M</span>
              <span>Morrow</span>
            </div>

            <nav className="main-nav" aria-label="Main spaces">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="nav-button"
                  aria-current={view === item.id ? "page" : undefined}
                  onClick={() => setView(item.id)}
                >
                  <span className={`nav-symbol ${item.id}`}>{item.symbol}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="sidebar-divider" />
            <button type="button" className="sidebar-link" onClick={() => setView("tasks")}>
              <span aria-hidden="true">▱</span> Inbox
            </button>
            <button type="button" className="sidebar-link" onClick={() => setView("today")}>
              <span aria-hidden="true">□</span> Upcoming
            </button>

            <div className="week-card">
              <strong>Small wins count.</strong>
              <span>{focusDone} of 3 focus items complete today.</span>
            </div>
          </aside>

          <main className="workspace">
            {view === "today" && (
              <div className="screen-layout">
                <section className="primary-pane" aria-labelledby="today-heading">
                  <header className="page-header">
                    <div>
                      <p className="kicker">{greeting}, Kyle · {dateLabel}</p>
                      <h1 id="today-heading">Make today count.</h1>
                      <p className="subtitle">Three meaningful things, a few quick wins, and room to breathe.</p>
                    </div>
                    <button type="button" className="primary-action" onClick={() => setShowCapture((open) => !open)}>
                      <span aria-hidden="true">＋</span> Add something
                    </button>
                  </header>

                  {showCapture && (
                    <form className="inline-form" onSubmit={addTask}>
                      <label className="sr-only" htmlFor="capture-title">New item</label>
                      <input id="capture-title" name="title" placeholder="What’s on your mind?" autoFocus />
                      <label className="sr-only" htmlFor="capture-space">Space</label>
                      <select id="capture-space" name="space" defaultValue="tasks">
                        <option value="tasks">Tasks</option>
                        <option value="career">Career</option>
                        <option value="life">Life</option>
                      </select>
                      <button className="primary-action" type="submit">Add</button>
                    </form>
                  )}

                  <div className="section-heading">
                    <h2>Your top 3</h2>
                    <span>{focusDone} of 3 done</span>
                  </div>
                  <div className="focus-list">
                    {focus.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`focus-card ${item.space} ${item.completed ? "is-done" : ""}`}
                        aria-pressed={item.completed}
                        onClick={() => toggleFocus(item.id)}
                      >
                        <span className="focus-number">{item.number}</span>
                        <span className="focus-copy">
                          <span className="focus-title">{item.title}</span>
                          <span className="focus-meta">{item.meta}</span>
                        </span>
                        <Check checked={item.completed} />
                      </button>
                    ))}
                  </div>

                  <section className="surface-panel quick-panel">
                    <div className="section-heading">
                      <h2>Quick wins</h2>
                      <span>{todayTasks.length} items</span>
                    </div>
                    <div className="row-list">
                      {todayTasks.map((task) => (
                        <label key={task.id} className={`check-row ${task.completed ? "is-done" : ""}`}>
                          <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                          <span className="row-title">{task.title}</span>
                          <span className={`space-dot ${task.space}`} aria-label={task.space} />
                        </label>
                      ))}
                    </div>
                  </section>
                </section>

                <aside className="context-pane" aria-label="Today details">
                  <section className="context-card calendar-card">
                    <div className="calendar-top">
                      <div><strong>{shortDate.day}</strong><span>Sunday · {shortDate.month}</span></div>
                      <span className="calendar-icon" aria-hidden="true">□</span>
                    </div>
                    <div className="week-strip" aria-label="This week">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                        <span key={`${day}-${index}`} className={index < 3 ? "done" : index === 6 ? "current" : ""}>{day}</span>
                      ))}
                    </div>
                  </section>

                  <section className="context-card momentum-card">
                    <span className="context-label">Today’s momentum</span>
                    <strong>{momentum}<small>%</small></strong>
                    <div className="momentum-bars" aria-label={`${momentum} percent complete`}>
                      {[34, 52, 76, 43, 83, 60, Math.max(momentum, 8)].map((height, index) => (
                        <span key={index} style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </section>

                  <section className="context-card">
                    <div className="section-heading">
                      <h2>Habits</h2>
                      <span>{routines.filter((item) => !item.completed).length} left</span>
                    </div>
                    <div className="routine-mini-list">
                      {routines.slice(0, 3).map((routine) => (
                        <button key={routine.id} type="button" className="routine-mini" onClick={() => toggleRoutine(routine.id)}>
                          <span className="routine-symbol" aria-hidden="true">{routine.completed ? "✓" : "○"}</span>
                          <span>{routine.title}</span>
                          <small>{routine.progress}</small>
                        </button>
                      ))}
                    </div>
                  </section>
                </aside>
              </div>
            )}

            {view === "career" && (
              <div className="screen-layout">
                <section className="primary-pane" aria-labelledby="career-heading">
                  <header className="page-header">
                    <div>
                      <p className="kicker">Career space</p>
                      <h1 id="career-heading">Build the next chapter.</h1>
                      <p className="subtitle">A guided path from getting ready to landing the right role.</p>
                    </div>
                    <button type="button" className="secondary-action" onClick={() => setShowApplicationForm((open) => !open)}>＋ Add application</button>
                  </header>

                  {showApplicationForm && (
                    <form className="inline-form application-form" onSubmit={addApplication}>
                      <label className="sr-only" htmlFor="app-company">Company</label>
                      <input id="app-company" name="company" placeholder="Company" autoFocus />
                      <label className="sr-only" htmlFor="app-role">Role</label>
                      <input id="app-role" name="role" placeholder="Role" />
                      <label className="sr-only" htmlFor="app-stage">Stage</label>
                      <select id="app-stage" name="stage" defaultValue="saved">
                        {applicationStages.map((stage) => <option key={stage.id} value={stage.id}>{stage.label}</option>)}
                      </select>
                      <button type="submit" className="primary-action">Add</button>
                    </form>
                  )}

                  <div className="stage-track" role="tablist" aria-label="Job hunt stages">
                    {careerSteps.map((step, index) => (
                      <button key={step} type="button" role="tab" aria-selected={careerStep === index} onClick={() => setCareerStep(index)}>
                        <span>0{index + 1}</span>{step}
                      </button>
                    ))}
                  </div>

                  <div className="section-heading"><h2>Readiness</h2><span>42% ready</span></div>
                  <div className="readiness-list">
                    {[
                      ["Define the target", "Role, strengths, non-negotiables", 80],
                      ["Tell the story", "Résumé, LinkedIn, portfolio", 45],
                      ["Practice interviews", "Stories, questions, mock sessions", 20],
                    ].map(([title, note, progress]) => (
                      <div className="readiness-row" key={String(title)}>
                        <div><h3>{title}</h3><span>{note}</span></div>
                        <div className="meter" aria-label={`${progress} percent complete`}><span style={{ width: `${progress}%` }} /></div>
                      </div>
                    ))}
                  </div>

                  <div className="section-heading board-heading"><h2>Application board</h2><span>{applications.length} tracked</span></div>
                  <div className="application-board">
                    {applicationStages.map((stage) => (
                      <section className="board-column" key={stage.id}>
                        <div className="board-label"><span>{stage.label}</span><span>{applicationsByStage[stage.id].length}</span></div>
                        {applicationsByStage[stage.id].map((application) => (
                          <article className="application-card" key={application.id}>
                            <button type="button" className="remove-button" aria-label={`Remove ${application.company}`} onClick={() => setApplications((items) => items.filter((item) => item.id !== application.id))}>×</button>
                            <h3>{application.company}</h3>
                            <span>{application.role}</span>
                            <small>{application.note}</small>
                          </article>
                        ))}
                        {applicationsByStage[stage.id].length === 0 && <p className="empty-column">Nothing here yet</p>}
                      </section>
                    ))}
                  </div>
                </section>

                <aside className="context-pane">
                  <section className="message-card career-message">
                    <span aria-hidden="true">✦</span>
                    <h2>Recommended next</h2>
                    <p>Choose a target role and list five non-negotiables before editing your résumé.</p>
                    <button type="button" onClick={() => setCareerStep(0)}>Start preparing</button>
                  </section>
                </aside>
              </div>
            )}

            {view === "life" && (
              <div className="screen-layout">
                <section className="primary-pane" aria-labelledby="life-heading">
                  <header className="page-header">
                    <div>
                      <p className="kicker">Life space</p>
                      <h1 id="life-heading">Keep life in rhythm.</h1>
                      <p className="subtitle">Organize what deserves steady attention, not constant pressure.</p>
                    </div>
                    <button type="button" className="secondary-action" onClick={() => setShowRoutineForm((open) => !open)}>＋ New routine</button>
                  </header>

                  {showRoutineForm && (
                    <form className="inline-form application-form" onSubmit={addRoutine}>
                      <label className="sr-only" htmlFor="routine-title">Routine</label>
                      <input id="routine-title" name="title" placeholder="Routine name" autoFocus />
                      <label className="sr-only" htmlFor="routine-area">Area</label>
                      <select id="routine-area" name="area" defaultValue="Health"><option>Health</option><option>Home</option><option>Personal growth</option></select>
                      <label className="sr-only" htmlFor="routine-cadence">Cadence</label>
                      <select id="routine-cadence" name="cadence" defaultValue="Daily"><option>Daily</option><option>Weekdays</option><option>Weekly</option></select>
                      <button type="submit" className="primary-action">Add</button>
                    </form>
                  )}

                  <div className="section-heading"><h2>Your areas</h2><span>Customize anytime</span></div>
                  <div className="area-grid">
                    <article className="area-card health"><span className="area-symbol">♡</span><h2>Health</h2><p>Movement, sleep, appointments, and energy.</p><div><span>{routines.filter((item) => item.area === "Health").length} routines</span><strong>On track</strong></div></article>
                    <article className="area-card home"><span className="area-symbol">⌂</span><h2>Home</h2><p>Errands, upkeep, and household projects.</p><div><span>{routines.filter((item) => item.area === "Home").length} routines</span><strong>This week</strong></div></article>
                    <article className="area-card growth"><span className="area-symbol">↟</span><h2>Personal growth</h2><p>Reading, learning, reflection, and creative goals.</p><div><span>{routines.filter((item) => item.area === "Personal growth").length} routines</span><strong>56%</strong></div></article>
                  </div>

                  <section className="surface-panel rhythm-panel">
                    <div className="section-heading"><h2>Today’s rhythm</h2><span>Flexible, never punitive</span></div>
                    <div className="row-list">
                      {routines.map((routine) => (
                        <label className={`check-row ${routine.completed ? "is-done" : ""}`} key={routine.id}>
                          <input type="checkbox" checked={routine.completed} onChange={() => toggleRoutine(routine.id)} />
                          <span className="row-title"><strong>{routine.title}</strong><small>{routine.area} · {routine.cadence}</small></span>
                          <span className="routine-progress">{routine.progress}</span>
                        </label>
                      ))}
                    </div>
                  </section>
                </section>

                <aside className="context-pane">
                  <section className="message-card life-message"><span aria-hidden="true">♡</span><h2>Steady beats perfect.</h2><p>Routines bend around real life. Missed days never become failure states.</p></section>
                </aside>
              </div>
            )}

            {view === "tasks" && (
              <div className="screen-layout">
                <section className="primary-pane" aria-labelledby="tasks-heading">
                  <header className="page-header">
                    <div><p className="kicker">Tasks space</p><h1 id="tasks-heading">Clear the mental clutter.</h1><p className="subtitle">Capture first. Organize only when the next step becomes clearer.</p></div>
                    <button type="button" className="secondary-action" onClick={() => setShowProjectForm((open) => !open)}>＋ New project</button>
                  </header>

                  {showProjectForm && (
                    <form className="inline-form project-form" onSubmit={addProject}>
                      <label className="sr-only" htmlFor="project-title">Project</label>
                      <input id="project-title" name="title" placeholder="Project name" autoFocus />
                      <label className="sr-only" htmlFor="project-next">Next action</label>
                      <input id="project-next" name="nextAction" placeholder="Next action" />
                      <button type="submit" className="primary-action">Add</button>
                    </form>
                  )}

                  <div className="section-heading"><h2>Inbox</h2><span>{tasks.filter((task) => task.space === "tasks" && !task.completed).length} open</span></div>
                  <section className="surface-panel inbox-panel">
                    <div className="row-list">
                      {tasks.filter((task) => task.space === "tasks").map((task) => (
                        <label className={`check-row ${task.completed ? "is-done" : ""}`} key={task.id}>
                          <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                          <span className="row-title">{task.title}</span>
                          <span className="task-timing">{task.timing}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <div className="section-heading project-heading"><h2>Projects</h2><span>{projects.length} active</span></div>
                  <div className="project-list">
                    {projects.map((project, index) => (
                      <article className="project-row" key={project.id}>
                        <span className="project-symbol" aria-hidden="true">{["✈", "✦", "▣"][index % 3]}</span>
                        <div><h3>{project.title}</h3><span>Next: {project.nextAction}</span></div>
                        <span>{project.completed} / {project.total}</span>
                        <button type="button" aria-label={`Remove ${project.title}`} onClick={() => setProjects((items) => items.filter((item) => item.id !== project.id))}>×</button>
                      </article>
                    ))}
                  </div>
                </section>

                <aside className="context-pane">
                  <section className="message-card tasks-message"><span aria-hidden="true">↯</span><h2>Fast capture</h2><p>Nothing needs a project or due date until you decide it does.</p><button type="button" onClick={() => { setView("today"); setShowCapture(true); }}>Capture something</button></section>
                </aside>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
