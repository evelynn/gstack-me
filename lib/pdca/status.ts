/**
 * PDCA Status Manager
 * Tracks feature progress through Plan->Design->Do->Check->Act->Report phases.
 * State persisted in .gstack/pdca-status.json
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export type PdcaPhase = 'plan' | 'design' | 'do' | 'check' | 'act' | 'report' | 'done';

export interface PdcaFeature {
  phase: PdcaPhase;
  matchRate?: number;
  iterations: number;
  documents: Record<string, string>;
  timestamps: { started: string; lastUpdated: string };
}

export interface PdcaStatus {
  version: string;
  features: Record<string, PdcaFeature>;
  pipeline?: { level: 'Starter' | 'Dynamic' | 'Enterprise'; currentPhase: number };
}

const PHASES: PdcaPhase[] = ['plan', 'design', 'do', 'check', 'act', 'report', 'done'];
const STATUS_FILE = '.gstack/pdca-status.json';

export function loadStatus(root: string): PdcaStatus {
  const p = join(root, STATUS_FILE);
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf-8')) : { version: '1.0', features: {} };
}

export function saveStatus(root: string, status: PdcaStatus): void {
  const dir = join(root, '.gstack');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(root, STATUS_FILE), JSON.stringify(status, null, 2));
}

export function advancePhase(f: PdcaFeature): PdcaPhase {
  const i = PHASES.indexOf(f.phase);
  return i < PHASES.length - 1 ? PHASES[i + 1] : 'done';
}

export function shouldAutoIterate(f: PdcaFeature): boolean {
  return f.phase === 'check' && f.matchRate !== undefined && f.matchRate < 90;
}

export function detectLevel(root: string): 'Starter' | 'Dynamic' | 'Enterprise' {
  if (existsSync(join(root, 'kubernetes')) || existsSync(join(root, 'terraform'))) return 'Enterprise';
  if (existsSync(join(root, 'package.json')) && existsSync(join(root, 'src'))) return 'Dynamic';
  return 'Starter';
}
