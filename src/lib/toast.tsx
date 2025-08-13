import React, { useEffect, useState } from 'react';

type Position = 'top-center' | 'bottom-center';
type ToastType = 'default' | 'success' | 'error';

type ToastOptions = {
  id?: string;
  duration?: number; // ms
  position?: Position;
  className?: string;
};

type ToastItem = {
  id: string;
  type: ToastType;
  position: Position;
  className?: string;
  content: React.ReactNode;
  timeout?: ReturnType<typeof setTimeout>;
};

type RenderCtx = { id: string; dismiss: (id?: string) => void };

// Simple store
let toasts: ToastItem[] = [];
const subs = new Set<(items: ToastItem[]) => void>();

function emit() {
  const snapshot = [...toasts];
  subs.forEach((fn) => fn(snapshot));
}

function subscribe(fn: (items: ToastItem[]) => void) {
  subs.add(fn);
  fn([...toasts]);
  return () => { subs.delete(fn); };
}

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

function _add(content: React.ReactNode | ((t: RenderCtx) => React.ReactNode), type: ToastType, opts: ToastOptions = {}) {
  const id = opts.id ?? makeId();
  const position: Position = opts.position ?? 'bottom-center';

  const renderCtx: RenderCtx = { id, dismiss };
  const node = typeof content === 'function' ? content(renderCtx) : content;

  // Avoid duplicates by id
  const existingIdx = toasts.findIndex(t => t.id === id);
  if (existingIdx !== -1) {
    toasts[existingIdx].content = node;
    toasts[existingIdx].type = type;
    toasts[existingIdx].className = opts.className;
    emit();
    return id;
  }

  const item: ToastItem = {
    id,
    type,
    position,
    className: opts.className,
    content: node,
  };

  toasts.push(item);
  emit();

  const duration = opts.duration ?? 4000;
  if (duration > 0) {
    item.timeout = setTimeout(() => dismiss(id), duration);
  }

  return id;
}

export function dismiss(id?: string) {
  if (!id) {
    toasts.forEach(t => t.timeout && clearTimeout(t.timeout));
    toasts = [];
    emit();
    return;
  }
  const idx = toasts.findIndex(t => t.id === id);
  if (idx !== -1) {
    const [t] = toasts.splice(idx, 1);
    if (t?.timeout) clearTimeout(t.timeout);
    emit();
  }
}

function show(content: React.ReactNode | ((t: RenderCtx) => React.ReactNode), opts?: ToastOptions) {
  return _add(content, 'default', opts);
}

function success(message: string | React.ReactNode, opts?: ToastOptions) {
  return _add(<span>{message}</span>, 'success', opts);
}

function error(message: string | React.ReactNode, opts?: ToastOptions) {
  return _add(<span>{message}</span>, 'error', opts);
}

export const toast = Object.assign(show, { success, error, dismiss, custom: show });

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);
  useEffect(() => subscribe(setItems), []);

  const top = items.filter(t => t.position === 'top-center');
  const bottom = items.filter(t => t.position === 'bottom-center');

  return (
    <>
      <div className="grl-toaster grl-toaster--top">
        {top.map(t => (
          <div key={t.id} className={[
            'grl-toast',
            t.type === 'success' ? 'grl-toast--success' : '',
            t.type === 'error' ? 'grl-toast--error' : '',
            t.className || ''
          ].filter(Boolean).join(' ')} role="status" aria-live="polite">
            <button className="grl-toast__close" aria-label="Cerrar" onClick={() => dismiss(t.id)}>
              ×
            </button>
            <div className="grl-toast__content">{t.content}</div>
          </div>
        ))}
      </div>
      <div className="grl-toaster grl-toaster--bottom">
        {bottom.map(t => (
          <div key={t.id} className={[
            'grl-toast',
            t.type === 'success' ? 'grl-toast--success' : '',
            t.type === 'error' ? 'grl-toast--error' : '',
            t.className || ''
          ].filter(Boolean).join(' ')} role="status" aria-live="polite">
            <button className="grl-toast__close" aria-label="Cerrar" onClick={() => dismiss(t.id)}>
              ×
            </button>
            <div className="grl-toast__content">{t.content}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default toast;
