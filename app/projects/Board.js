'use client';

import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

// The board's one control: show every project, or one category. The cards are rendered on the server first, so the
// page works without JavaScript; this only narrows them.
export default function Board({ projects, categories }) {
  const [on, setOn] = useState('All');
  const shown = on === 'All' ? projects : projects.filter((p) => p.category === on);
  return (
    <>
      <div className="st-filter" role="group" aria-label="Show projects by category">
        {['All', ...categories].map((c) => (
          <button key={c} type="button" className={`st-chip${on === c ? ' on' : ''}`} aria-pressed={on === c} onClick={() => setOn(c)}>
            {c}
          </button>
        ))}
      </div>
      <section className="st-cards">
        {shown.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </section>
    </>
  );
}
