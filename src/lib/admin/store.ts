"use client";

import { useSyncExternalStore } from "react";
import { seeds } from "./seeds";
import type { AdminRecord, CollectionKey, Singletons } from "./types";

/**
 * Données de la démo d'administration, enregistrées dans le navigateur (localStorage).
 * Le site public y écrit aussi (signalements, réservations, messages) et lit le bandeau « À savoir ».
 */
const PREFIX = "syz-admin-v1:";
const EVENT = "syz-admin-change";

const cache = new Map<string, unknown>();

function read<T>(key: string, fallback: T): T {
  if (cache.has(key)) return cache.get(key) as T;
  let value = fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw) value = JSON.parse(raw) as T;
  } catch {
    // Stockage indisponible (navigation privée…) : on garde les données de démo.
  }
  cache.set(key, value);
  return value;
}

function write(key: string, value: unknown) {
  cache.set(key, value);
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Les modifications restent en mémoire pour la session.
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key?.startsWith(PREFIX)) {
      cache.delete(e.key.slice(PREFIX.length));
      callback();
    }
  };
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

function useStored<T>(key: string, fallback: T) {
  return useSyncExternalStore(
    subscribe,
    () => read(key, fallback),
    () => fallback,
  );
}

const newId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()));
const today = () => new Date().toISOString().slice(0, 10);

/* ---------- Collections ---------- */

export function getCollection(key: CollectionKey) {
  return read<AdminRecord[]>(key, seeds.collections[key]);
}

export function addRecord(key: CollectionKey, data: Omit<AdminRecord, "id" | "createdAt">) {
  const record: AdminRecord = { ...data, id: newId(), createdAt: today() };
  write(key, [record, ...getCollection(key)]);
  return record;
}

export function updateRecord(key: CollectionKey, id: string, data: Partial<AdminRecord>) {
  write(
    key,
    getCollection(key).map((r) => (r.id === id ? { ...r, ...data } : r)),
  );
}

export function removeRecord(key: CollectionKey, id: string) {
  write(
    key,
    getCollection(key).filter((r) => r.id !== id),
  );
}

export function useCollection(key: CollectionKey) {
  return useStored<AdminRecord[]>(key, seeds.collections[key]);
}

/* ---------- Réglages uniques (bandeau, coordonnées) ---------- */

export function useSingleton<K extends keyof Singletons>(key: K) {
  return useStored<Singletons[K]>(key, seeds.singletons[key]);
}

export function saveSingleton<K extends keyof Singletons>(key: K, value: Singletons[K]) {
  write(key, value);
}

/* ---------- Session de démonstration ---------- */

export type Session = { name: string; email: string } | null;

export function useSession() {
  return useSyncExternalStore(
    subscribe,
    () => read<Session>("session", null),
    () => undefined,
  );
}

export function signIn(email: string) {
  write("session", { name: "Compte de démonstration", email });
}

export function signOut() {
  write("session", null);
}

/** Remet toutes les données de démo dans leur état initial (la session est conservée). */
export function resetDemo() {
  for (const key of [...Object.keys(seeds.collections), ...Object.keys(seeds.singletons)]) {
    try {
      window.localStorage.removeItem(PREFIX + key);
    } catch {
      // ignoré
    }
    cache.delete(key);
  }
  window.dispatchEvent(new Event(EVENT));
}
