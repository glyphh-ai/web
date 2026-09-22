/**
 * The desktop's panel icons — lifted verbatim from the app (src/renderer/
 * code-workbench.ts VIEW_META, 2026-09-22) so the site draws the tools with
 * the exact glyphs the app does. Regenerate from the app when they change.
 */

export const PANEL_ICONS = {
  files: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z\"/></svg>",
  terminal: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"4 17 10 11 4 5\"/><line x1=\"12\" y1=\"19\" x2=\"20\" y2=\"19\"/></svg>",
  diff: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"21\"/><polyline points=\"8 7 4 11 8 15\"/><polyline points=\"16 9 20 13 16 17\"/></svg>",
  preview: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9.5\" style=\"fill:#0ea5e9;stroke:none\"/><path d=\"M2.8 12h18.4\" style=\"fill:none;stroke:#ffffff;stroke-width:1.7\"/><path d=\"M12 2.7c3.3 2.5 3.3 16.1 0 18.6M12 2.7c-3.3 2.5-3.3 16.1 0 18.6\" style=\"fill:none;stroke:#e0f2fe;stroke-width:1.5\"/><path d=\"M4.3 7.6c2.3-1.2 13.1-1.2 15.4 0M4.3 16.4c2.3 1.2 13.1 1.2 15.4 0\" style=\"fill:none;stroke:#bae6fd;stroke-width:1.5\"/></svg>",
  monaco: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/></svg>",
  plan: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 11l3 3L22 4\"/><path d=\"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11\"/></svg>",
  tasks: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/><polyline points=\"9 15 11 17 15 13\"/></svg>",
  thread: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/><line x1=\"8\" y1=\"9\" x2=\"16\" y2=\"9\"/><line x1=\"8\" y1=\"13\" x2=\"13\" y2=\"13\"/></svg>",
  gpoint: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3.5\" width=\"20\" height=\"13\" rx=\"2.5\" style=\"fill:#af5fff;stroke:none\"/><path d=\"M11 16.5h2v2.2h3.2a.9.9 0 1 1 0 1.8H7.8a.9.9 0 1 1 0-1.8H11z\" style=\"fill:#6d28d9;stroke:none\"/><path d=\"M10 7.2 15.4 10 10 12.8z\" style=\"fill:#ffffff;stroke:none\"/></svg>",
  gdrive: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6.1 4.6A2.5 2.5 0 0 1 8.4 3h7.2a2.5 2.5 0 0 1 2.3 1.6L21.5 12h-19z\" style=\"fill:#2dd4bf;stroke:none\"/><path d=\"M2.5 12h19v5.5A2.5 2.5 0 0 1 19 20H5a2.5 2.5 0 0 1-2.5-2.5z\" style=\"fill:#0f766e;stroke:none\"/><circle cx=\"6.8\" cy=\"16\" r=\"1.25\" style=\"fill:#ffffff;stroke:none\"/><circle cx=\"10.6\" cy=\"16\" r=\"1.25\" style=\"fill:#5eead4;stroke:none\"/></svg>",
  gdesign: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2.5a9.5 9.5 0 1 0 0 19h1.2a2 2 0 0 0 1.5-3.3 1.6 1.6 0 0 1 1.2-2.7h2.1A3.5 3.5 0 0 0 21.5 12 9.6 9.6 0 0 0 12 2.5z\" style=\"fill:#ec4899;stroke:none\"/><circle cx=\"8\" cy=\"9\" r=\"1.5\" style=\"fill:#ffffff;stroke:none\"/><circle cx=\"12.5\" cy=\"6.8\" r=\"1.5\" style=\"fill:#f9a8d4;stroke:none\"/><circle cx=\"16.4\" cy=\"9.4\" r=\"1.5\" style=\"fill:#ffffff;stroke:none\"/><circle cx=\"7.2\" cy=\"13.8\" r=\"1.5\" style=\"fill:#f9a8d4;stroke:none\"/></svg>",
  gimage: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2.5\" y=\"3.5\" width=\"19\" height=\"17\" rx=\"2.5\" style=\"fill:#f59e0b;stroke:none\"/><circle cx=\"8.6\" cy=\"9\" r=\"1.9\" style=\"fill:#ffffff;stroke:none\"/><path d=\"M2.5 17.5 8.5 12l4 3.6 3.6-3 5.4 4.9v3H5a2.5 2.5 0 0 1-2.5-2.5z\" style=\"fill:#b45309;stroke:none\"/></svg>",
  gvideo: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2.5\" y=\"5\" width=\"19\" height=\"15\" rx=\"2.5\" style=\"fill:#ef4444;stroke:none\"/><path d=\"M2.5 8.6h19M6.9 5l2 3.6M12 5l2 3.6M17.1 5l2 3.6\" style=\"stroke:#991b1b;stroke-width:1.6\"/><path d=\"M10.2 11.6l5 2.9-5 2.9z\" style=\"fill:#ffffff;stroke:none\"/></svg>",
  gsound: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2.5\" y=\"2.5\" width=\"19\" height=\"19\" rx=\"4\" style=\"fill:#38bdf8;stroke:none\"/><path d=\"M6 12v0M9 8.5v7M12 6v12M15 9v6M18 11v2\" style=\"stroke:#ffffff;stroke-width:1.9;stroke-linecap:round\"/></svg>",
};

export function PanelIcon({ name, size = 28, className = "" }) {
  const svg = PANEL_ICONS[name];
  if (!svg) return null;
  return (
    <span
      className={`panel-icon ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
